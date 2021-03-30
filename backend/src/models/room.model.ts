import { SECOND } from 'src/constants'
import { CurrentPlayerData } from 'src/dto/data/current-player.data'
import { CurrentRoundData } from 'src/dto/data/current-round.data'
import { CurrentWordData } from 'src/dto/data/current-word.data'
import { NewUserData } from 'src/dto/data/new-user.data'
import { UserLeftData } from 'src/dto/data/user-left.data'
import { CreateRoomPayload } from 'src/dto/payload/create-room.payload'
import {
    CURRENT_PLAYER,
    CURRENT_ROUND,
    CURRENT_WORD,
    NEW_USER,
    OWNER_LEFT,
    TIMER,
    USER_LEFT
} from 'src/events'
import { CreateRoomOptions } from 'src/interfaces/create-room-options.interface'
import { IRoom } from 'src/interfaces/room.interface'
import { v4 } from 'uuid'
import { User } from './user.model'

export class Room {
    public id: string = v4()
    public players: User[] = []
    public capacity: number = 5
    public currentRound: number = 0
    public currentPlayer: User | null
    public seconds: number
    public word: string = ''

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
    addPlayer(user: User): void {
        this.players.push(user)
        this.newPlayerHandler(user)
    }

    newPlayerHandler(user: User): void {
        const data: NewUserData = new NewUserData(user.toIUser())

        if (this.currentPlayer) {
            user.socket.emit(CURRENT_PLAYER, new CurrentPlayerData(this.currentPlayer.id))
        }

        this.players.forEach((player: User) => {
            player.socket.emit(NEW_USER, data)
        })
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

    startTimer(): void {
        const timer: NodeJS.Timeout = setInterval(() => {
            if (this.seconds === 1) {
                clearInterval(timer)
            }

            this.seconds--

            this.players.forEach((player: User) => {
                player.socket.emit(TIMER, this.seconds)
            })
        }, SECOND)
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

    getWord(userID: string): string {
        if (!this.currentPlayer) {
            return ''
        }

        if (userID === this.currentPlayer.id) {
            return this.word
        }

        const word: string = this.word.replace(/([A-z])/g, '_')

        return word
    }
}
