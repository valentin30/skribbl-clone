import { IUser } from 'src/interfaces/user.interface'
import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'

export class JoinRoomData {
    public hasStarted: boolean
    public players: IUser[]
    public secondsPerRound: number
    public rounds: number
    public currentRound: number
    public word: string

    constructor(room: Room) {
        this.hasStarted = Boolean(room.currentRound)
        this.players = room.players.map((player: User) => player.toIUser())
        this.secondsPerRound = room.secondsPerRounds
        this.currentRound = room.currentRound
        this.rounds = room.rounds
    }
}
