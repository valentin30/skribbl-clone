import { CreateRoomPayload } from 'src/dto/payload/create-room.payload'
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
}
