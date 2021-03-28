import { Socket } from 'socket.io'
import { IUser } from 'src/interfaces/user.interface'

export class User {
    constructor(
        public id: string,
        public name: string,
        public socket: Socket,
        public color: string
    ) {}

    toIUser(): IUser {
        return {
            id: this.id,
            name: this.name,
            color: this.color
        }
    }
}
