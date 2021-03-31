import { IUser } from 'src/interfaces/user.interface'
import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'

export class JoinRoomData {
    public players: IUser[]
    public secondsPerRound: number
    public rounds: number

    constructor(room: Room) {
        this.players = room.players.map((player: User) => player.toIUser())
        this.secondsPerRound = room.secondsPerRounds
        this.rounds = room.rounds
    }
}
