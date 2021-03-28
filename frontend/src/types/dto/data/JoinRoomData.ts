import { User } from '../../User/User'

export interface JoinRoomData {
    hasStarted: boolean
    players: User[]
}
