import { IUser } from 'src/interfaces/user.interface'

export class MessageData {
    public date: string

    constructor(public user: IUser, public content: string) {
        this.date = new Date(Date.now())
            .toTimeString()
            .split('')
            .splice(0, 5)
            .join('')
    }
}
