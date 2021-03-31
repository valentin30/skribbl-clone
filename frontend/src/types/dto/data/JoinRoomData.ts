import { User } from '../../User/User'

export interface JoinRoomData {
    players: User[]
    secondsPerRound: number
    rounds: number
}
