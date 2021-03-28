import { IUser } from './user.interface'

export interface IRoom {
    id: string
    players: IUser[]
    currentRound: number
    currentPlayer: IUser
    owner: IUser
    rounds: number
    secondsPerRounds: number
    dictionary: string[]
}
