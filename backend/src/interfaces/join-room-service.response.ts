import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'
import { IUser } from './user.interface'

export class JoinRoomServiceResponse {
    public roomID: string
    public players: IUser[]
    public hasStarted: boolean
    public shouldEmit: boolean = false

    constructor(room: Room) {
        this.roomID = room.id
        this.hasStarted = Boolean(room.currentRound)
        this.players = room.players.map((player: User) => player.toIUser())
    }
}
