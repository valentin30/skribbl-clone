import { CurrentPlayerData } from 'src/dto/data/current-player.data'
import { CurrentRoundData } from 'src/dto/data/current-round.data'
import { CurrentWordData } from 'src/dto/data/current-word.data'
import { DrawingData } from 'src/dto/data/drawing.data'
import { NewUserData } from 'src/dto/data/new-user.data'
import { TimerData } from 'src/dto/data/timer.data'
import { UserLeftData } from 'src/dto/data/user-left.data'
import { IRoom } from 'src/interfaces/room.interface'
import { DEFAULT_DRAWING, LETTER, SECOND } from 'src/util/constants'
import {
    CURRENT_PLAYER,
    CURRENT_ROUND,
    CURRENT_WORD,
    DRAWING,
    NEW_USER,
    TIMER,
    USER_LEFT
} from 'src/util/events'
import { v4 } from 'uuid'
import { User } from './user.model'

export class Room {
    public id: string = v4()
    public players: User[] = []
    public capacity: number = 5
    public currentRound: number = 0
    public currentPlayer: User | null = null
    public seconds: number
    public word: string = ''
    public drawing: string = DEFAULT_DRAWING

    constructor(
        public owner: User,
        public rounds: number = 3,
        public secondsPerRounds: number = 120,
        public isPrivate: boolean = false,
        public dictionary: string[] = ['car', 'cat', 'dog', 'tree']
    ) {
        this.seconds = secondsPerRounds
    }

    toIRoom(): IRoom {
        return {
            id: this.id,
            currentPlayer: this.currentPlayer,
            currentRound: this.currentRound,
            owner: this.owner,
            secondsPerRounds: this.secondsPerRounds,
            rounds: this.rounds,
            players: this.players.map((p: User) => p.toIUser()),
            dictionary: this.dictionary
        }
    }

    emitDrawing(drawing: string) {
        this.drawing = drawing

        const data: DrawingData = new DrawingData(drawing)

        this.players
            .filter((player: User) => player.id !== this.currentPlayer.id)
            .forEach((player: User) => player.socket.emit(DRAWING, data))
    }

    addPlayer(user: User): void {
        this.players.push(user)
        this.newPlayerHandler(user)
    }

    newPlayerHandler(user: User): void {
        const data: NewUserData = new NewUserData(user.toIUser())

        this.sendJoinDataToUser(user)

        this.players.forEach((player: User) => {
            player.socket.emit(NEW_USER, data)
        })
    }

    sendJoinDataToUser(user: User) {
        if (this.currentPlayer) {
            user.socket.emit(CURRENT_PLAYER, new CurrentPlayerData(this.currentPlayer.id))
        }

        user.socket.emit(DRAWING, new DrawingData(this.drawing))
        user.socket.emit(CURRENT_WORD, new CurrentWordData(this.getWord(user.id)))
        user.socket.emit(CURRENT_ROUND, new CurrentRoundData(this.currentRound))
    }

    removePlayer(user: User): void {
        const userIndex: number = this.players.findIndex((player: User) => player.id === user.id)

        if (userIndex === -1) {
            return
        }

        this.players.splice(userIndex, 1)

        const data: UserLeftData = new UserLeftData(user.id)

        this.players.forEach((player: User) => {
            player.socket.emit(USER_LEFT, data)
        })
    }

    startGame(): void {
        if (this.currentRound) {
            return
        }

        this.nextRound()

        // start round should be called when current player emits the chosen word
        this.startRound('doggo')
    }

    nextRound(): void {
        this.currentRound++
        this.setNewCurrentPlayer()

        const roundData: CurrentRoundData = new CurrentRoundData(this.currentRound)
        const playerData = new CurrentPlayerData(this.currentPlayer.id)

        this.players.forEach((player: User) => {
            player.socket.emit(CURRENT_PLAYER, playerData)
            player.socket.emit(CURRENT_ROUND, roundData)
        })
    }

    startRound(word: string): void {
        this.setWord(word)

        this.startTimer()
    }

    setNewCurrentPlayer(): void {
        const activeIndex: number = Math.floor(Math.random() * this.players.length)
        this.currentPlayer = this.players[activeIndex]
    }

    setWord(word: string): void {
        this.word = word

        this.players.forEach((player: User) => {
            player.socket.emit(CURRENT_WORD, new CurrentWordData(this.getWord(player.id)))
        })
    }

    startTimer(): void {
        const timer: NodeJS.Timeout = setInterval(() => {
            if (this.seconds === 1) {
                clearInterval(timer)
            }

            this.seconds--

            const timerData: TimerData = new TimerData(this.seconds)

            this.players.forEach((player: User) => {
                player.socket.emit(TIMER, timerData)
            })
        }, SECOND)
    }

    getWord(userID: string): string {
        if (!this.currentPlayer) {
            return ''
        }

        if (userID === this.currentPlayer.id) {
            return this.word
        }

        const word: string = this.word.replace(LETTER, '_')

        return word
    }
}
