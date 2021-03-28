import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { OWNER_LEFT, USER_LEFT } from 'src/constants'
import { UserLeftData } from 'src/dto/data/user-left.data'
import { CreateRoomPayload } from 'src/dto/payload/create-room.payload'
import { JoinRoomPayload } from 'src/dto/payload/join-room.payload'
import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'
import { UserService } from './user.service'

@Injectable()
export class RoomService {
    private rooms: Room[] = []

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ) {}

    getAvailableRoom(userID: string): Room {
        this.isUserInOtherRoom(userID)

        const user: User = this.userService.findByID(userID)
        const room: Room | undefined = this.rooms
            .filter((room: Room) => !room.isPrivate)
            .find(room => room.players.length < room.capacity)

        if (!room) {
            const room: Room = new Room(user)
            this.rooms.push(room)
            return room
        }

        return room
    }

    joinRoom(user: User, { roomID }: JoinRoomPayload): Room {
        const room: Room | undefined = this.rooms.find((room: Room) => room.id === roomID)

        if (!room) {
            throw new WsException('This room does not exists')
        }

        this.isUserInOtherRoom(user.id, room)

        if (room.capacity === room.players.length) {
            throw new WsException({ message: 'Sorry, room is already full' })
        }

        if (!room.players.includes(user)) {
            room.players.push(user)
        }

        return room
    }

    create(client: Socket, { rounds, secondsPerRound }: CreateRoomPayload): Room {
        this.isUserInOtherRoom(client.id)

        const owner: User = this.userService.findByID(client.id)

        const room: Room = new Room(owner, rounds, secondsPerRound, true)

        this.rooms.push(room)

        return room
    }

    removeUserCascade(user: User): void {
        const index: number = this.rooms.findIndex((room: Room) => room.players.includes(user))

        if (index === -1) {
            return
        }

        const room: Room = this.rooms[index]

        if (room.owner.id === user.id) {
            room.players.forEach((player: User) => {
                player.socket.emit(OWNER_LEFT)
            })

            this.rooms.splice(index, 1)
            return
        }

        const userIndex: number = room.players.findIndex((player: User) => player.id === user.id)

        if (userIndex > -1) {
            room.players.splice(userIndex, 1)
        }

        const data: UserLeftData = new UserLeftData(user.id)

        room.players.forEach((player: User) => {
            player.socket.emit(USER_LEFT, data)
        })
    }

    isUserInOtherRoom(userID: string, room?: Room): void {
        const playerRooms: Room[] = this.rooms.filter((room: Room) => {
            return room.players.find((player: User) => player.id === userID)
        })

        if (playerRooms.length > 1) {
            throw new WsException('You can not be in more than one room')
        }

        if (playerRooms.length && !playerRooms.includes(room)) {
            throw new WsException('You can not be in more than one room')
        }
    }

    getRoomByOwnerID(ownerID: string): Room {
        const room: Room | undefined = this.rooms.find((room: Room) => room.owner.id === ownerID)

        if (!room) {
            throw new WsException('You dont have any rooms')
        }

        return room
    }
}
