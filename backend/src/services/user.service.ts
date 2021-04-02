import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { RegisterPayload } from 'src/dto/payload/register.payload'
import { User } from 'src/models/user.model'
import { NOT_REGISTERED } from 'src/util/error-messages'
import { RoomService } from './room.service'

@Injectable()
export class UserService {
    private users: User[] = []

    constructor(
        @Inject(forwardRef(() => RoomService))
        private readonly roomService: RoomService
    ) {}

    findByID(id: string): User {
        const user: User = this.users.find((user: User) => user.id === id)

        if (!user) {
            throw new WsException(NOT_REGISTERED)
        }

        return user
    }

    removeByID(userID: string): User {
        const userIndex: number = this.users.findIndex((user: User) => user.id === userID)

        if (userIndex === -1) {
            throw new WsException(NOT_REGISTERED)
        }

        return this.users.splice(userIndex, 1)[0]
    }

    register(client: Socket, { color, name }: RegisterPayload): User {
        const user: User = new User(client.id, name, client, color)

        this.users.push(user)

        return user
    }

    disconnect(client: Socket): void {
        try {
            const user: User = this.findByID(client.id)
            this.roomService.removeUserCascade(user)
        } catch (error) {
            console.log('NO USER')
        }
    }
}
