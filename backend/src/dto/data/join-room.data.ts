import { IUser } from 'src/interfaces/user.interface'

export interface JoinRoomData {
    hasStarted: boolean
    players: IUser[]
}
