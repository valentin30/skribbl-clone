import { CurrentPlayerData } from 'src/dto/data/current-player.data'
import { NewUserData } from 'src/dto/data/new-user.data'
import { UserLeftData } from 'src/dto/data/user-left.data'
import { CreateRoomPayload } from 'src/dto/payload/create-room.payload'
import { NEW_USER, OWNER_LEFT, USER_LEFT } from 'src/events'
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

    constructor(
        public owner: User,
        public rounds: number = 3,
        public secondsPerRounds: number = 120,
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
    addPlayer(user: User) {
        this.players.push(user)
        this.newPlayerHandler(user)
    }

    newPlayerHandler(user: User) {
        const data: NewUserData = new NewUserData(user.toIUser())

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

    startGame(): CurrentPlayerData {
        if (this.currentRound) {
            return
        }

        this.currentRound = 1
        this.setNewCurrentPlayer()
        const word: string = this.getWord()

        return new CurrentPlayerData(this.currentPlayer.id, word)
    }

    setNewCurrentPlayer(): void {
        const activeIndex: number = Math.floor(Math.random() * this.players.length)
        this.currentPlayer = this.players[activeIndex]
    }

    getWord(): string {
        const wordIndex: number = Math.floor(Math.random() * this.dictionary.length)
        return this.dictionary[wordIndex]
    }
}
