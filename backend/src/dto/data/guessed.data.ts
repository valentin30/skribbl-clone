import { IUser } from 'src/interfaces/user.interface'

export class GuessedData {
    public date: string

    constructor(public user: IUser) {
        this.date = new Date(Date.now())
            .toTimeString()
            .split('')
            .splice(0, 5)
            .join('')
    }
}
