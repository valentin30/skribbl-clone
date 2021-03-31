import { IUser } from 'src/interfaces/user.interface'

export class CurrentPlayersData {
    constructor(public players: IUser[]) {}
}
