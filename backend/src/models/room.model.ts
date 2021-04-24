import { WsException } from '@nestjs/websockets'
import { CurrentPlayerData } from 'src/dto/data/current-player.data'
import { CurrentRoundData } from 'src/dto/data/current-round.data'
import { CurrentWordData } from 'src/dto/data/current-word.data'
import { DrawingData } from 'src/dto/data/drawing.data'
import { GuessedData } from 'src/dto/data/guessed.data'
import { MessageData } from 'src/dto/data/message.data'
import { NewUserData } from 'src/dto/data/new-user.data'
import { PickWordData } from 'src/dto/data/pick-word.data'
import { TimerData } from 'src/dto/data/timer.data'
import { UserLeftData } from 'src/dto/data/user-left.data'
import { IRoom } from 'src/interfaces/room.interface'
import { DEFAULT_DRAWING, LETTER, SECOND } from 'src/util/constants'
import { ALREADY_GUESSED, CANT_MESSAGE } from 'src/util/error-messages'
import {
    CURRENT_PLAYER,
    CURRENT_ROUND,
    CURRENT_WORD,
    DRAWING,
    GAME_END,
    GUESSED,
    NEW_MESSAGE,
    NEW_USER,
    TIMER,
    USER_LEFT,
    WORD_PICK
} from 'src/util/events'
import { v4 } from 'uuid'
import { User } from './user.model'
export class Room {
    public id: string = v4()
    public players: User[] = []
    public capacity: number = 5
    public currentRound: number = 0
    public currentPlayer: User | null = null
    public seconds: number = 0
    public word: string = ''
    public drawing: string = DEFAULT_DRAWING
    public roundWinners: User[] = []

    constructor(
        public owner: User,
        public rounds: number = 3,
        public secondsPerRounds: number = 30,
        public isPrivate: boolean = false,
        public dictionary: string[] = ['car', 'cat', 'dog', 'tree']
    ) {}

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
            .filter(({ id }: User) => !this.isUserCurrentPalyer(id))
            .forEach((player: User) => player.socket.emit(DRAWING, data))
    }

    addPlayer(user: User): void {
        this.players.push(user)
        this.newPlayerHandler(user)

        if (this.players.length < 3 || this.isPrivate) {
            return
        }

        this.startGame()
    }

    newPlayerHandler(user: User): void {
        const data: NewUserData = new NewUserData(user.toIUser())

        this.sendJoinDataToUser(user)

        this.players.forEach((player: User) => {
            player.socket.emit(NEW_USER, data)
        })
    }

    isUserInRoom(userID: string): boolean {
        const player: User | undefined = this.players.find((player: User) => player.id === userID)

        return Boolean(player)
    }

    isUserOwner(userID: string): boolean {
        return this.owner.id === userID
    }

    isUserCurrentPalyer(userID: string): boolean {
        return this.currentPlayer?.id === userID
    }

    sendJoinDataToUser(user: User) {
        if (this.currentPlayer?.id) {
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

        this.currentPlayer.socket.emit(WORD_PICK, new PickWordData(['dog', 'cat', 'parrot']))

        setTimeout(() => {
            if (this.word) {
                return
            }
            this.startRound('doggo')
        }, 10_000)
    }

    startRound(word: string): void {
        this.setWord(word)

        this.startTimer()
    }

    endRound(): void {
        this.setWord('')
        this.roundWinners = []
        this.emitDrawing(DEFAULT_DRAWING)

        if (this.rounds === this.currentRound) {
            this.players.forEach((player: User) => {
                player.socket.emit(GAME_END)
            })
            return
        }
        this.nextRound()
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
        this.seconds = this.secondsPerRounds
        const timer: NodeJS.Timeout = setInterval(() => {
            if (this.seconds <= 0) {
                clearInterval(timer)
                this.endRound()
                return
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

        if (this.isUserCurrentPalyer(userID)) {
            return this.word
        }

        const word: string = this.word.replace(LETTER, '_')

        return word
    }

    newMessage(userID: string, message: string): void {
        if (this.isUserCurrentPalyer(userID)) {
            throw new WsException(CANT_MESSAGE)
        }

        const user = this.players.find((player: User) => userID === player.id)

        if (this.roundWinners.includes(user)) {
            throw new WsException(ALREADY_GUESSED)
        }

        if (message.toLocaleLowerCase().trim() === this.word) {
            this.roundWinners.push(user)
            this.sendGuessedMessage(user)
            return
        }

        this.sendMessage(user, message)
    }

    sendGuessedMessage(sender: User) {
        const data: GuessedData = new GuessedData(sender.toIUser())

        this.players.forEach((player: User) => {
            player.socket.emit(GUESSED, data)
        })
    }

    sendMessage(sender: User, message: string) {
        const data: MessageData = new MessageData(sender.toIUser(), message)

        this.players.forEach((player: User) => {
            player.socket.emit(NEW_MESSAGE, data)
        })
    }
}
