import { IUser } from 'src/interfaces/user.interface'
import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'

export class JoinRoomData {
    public hasStarted: boolean
    public players: IUser[]

    constructor(room: Room) {
        this.hasStarted = Boolean(room.currentRound)
        this.players = room.players.map((player: User) => player.toIUser())
    }
}
