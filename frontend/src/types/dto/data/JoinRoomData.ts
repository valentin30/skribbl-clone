import { User } from '../../User/User'

export interface JoinRoomData {
    hasStarted: boolean
    players: User[]
    secondsPerRound: number
    rounds: number
    currentRound: number
    word: string
}
