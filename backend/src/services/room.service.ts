import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { CreateRoomData } from 'src/dto/data/create-room.data'
import { GetRoomData } from 'src/dto/data/get-room.data'
import { JoinRoomData } from 'src/dto/data/join-room.data'
import { PlayersData } from 'src/dto/data/players.data'
import { CreateRoomPayload } from 'src/dto/payload/create-room.payload'
import { JoinRoomPayload } from 'src/dto/payload/join-room.payload'
import { IUser } from 'src/interfaces/user.interface'
import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'
import {
    ALREADY_IN_GAME,
    CANT_DRAW,
    NOT_IN_ROOM,
    NO_ROOMS,
    ROOM_FULL,
    ROOM_NOT_FOUND
} from 'src/util/error-messages'
import { OWNER_LEFT } from 'src/util/events'
import { UserService } from './user.service'

@Injectable()
export class RoomService {
    private rooms: Room[] = []

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ) {}

    getAvailableRoom(userID: string): GetRoomData {
        this.isUserInOtherRoom(userID)

        const user: User = this.userService.findByID(userID)
        const room: Room | undefined = this.rooms
            .filter((room: Room) => !room.isPrivate)
            .find(room => room.players.length < room.capacity)

        if (room) {
            return new GetRoomData(room.id)
        }

        const newRoom: Room = new Room(user)
        this.rooms.push(newRoom)
        return new GetRoomData(newRoom.id)
    }

    getRoomByOwnerID(ownerID: string): Room {
        const room: Room | undefined = this.rooms.find((room: Room) => room.isUserOwner(ownerID))

        if (!room) {
            throw new WsException(NO_ROOMS)
        }

        return room
    }

    getRoomByCurrentPlayerID(userID: string): Room {
        const room: Room | undefined = this.rooms.find((room: Room) =>
            room.isUserCurrentPalyer(userID)
        )

        if (!room) {
            throw new WsException(CANT_DRAW)
        }

        return room
    }

    getRoomByPlayerID(userID: string): Room {
        const room: Room | undefined = this.rooms.find((room: Room) => room.isUserInRoom(userID))

        if (!room) {
            throw new WsException(NOT_IN_ROOM)
        }

        return room
    }

    getRoomPlayers(roomID: string): PlayersData {
        const room: Room = this.rooms.find((room: Room) => (room.id = roomID))

        if (!room) {
            throw new WsException(ROOM_NOT_FOUND)
        }

        const players: IUser[] = room.players.map((player: User) => player.toIUser())

        return new PlayersData(players)
    }

    create(client: Socket, { rounds, secondsPerRound }: CreateRoomPayload): CreateRoomData {
        this.isUserInOtherRoom(client.id)

        const owner: User = this.userService.findByID(client.id)
        const room: Room = new Room(owner, rounds, secondsPerRound, true)

        this.rooms.push(room)

        return new CreateRoomData(room.id)
    }

    joinRoom(user: User, { roomID }: JoinRoomPayload): JoinRoomData {
        const room: Room | undefined = this.rooms.find((room: Room) => room.id === roomID)

        if (!room) {
            throw new WsException(ROOM_NOT_FOUND)
        }

        this.isUserInOtherRoom(user.id, room)

        const response: JoinRoomData = new JoinRoomData(room.secondsPerRounds, room.rounds)

        if (room.isUserInRoom(user.id)) {
            room.sendJoinDataToUser(user)

            return response
        }

        if (room.capacity === room.players.length) {
            throw new WsException(ROOM_FULL)
        }

        room.addPlayer(user)

        return response
    }

    removeUserCascade(user: User): void {
        const index: number = this.rooms.findIndex((room: Room) => room.players.includes(user))

        if (index === -1) {
            return
        }

        const room: Room = this.rooms[index]

        room.removePlayer(user)

        if (room.owner.id !== user.id) {
            return
        }

        if (!room.players.length) {
            this.rooms.splice(index, 1)
            return
        }

        if (room.currentRound) {
            room.owner = room.players[0]
            return
        }

        room.players.forEach((player: User) => {
            player.socket.emit(OWNER_LEFT)
        })

        this.rooms.splice(index, 1)
    }

    isUserInOtherRoom(userID: string, room?: Room): void {
        const playerRooms: Room[] = this.rooms.filter((room: Room) => {
            return room.players.find((player: User) => player.id === userID)
        })

        if (playerRooms.length > 1) {
            throw new WsException(ALREADY_IN_GAME)
        }

        if (playerRooms.length && !playerRooms.includes(room)) {
            throw new WsException(ALREADY_IN_GAME)
        }
    }
}
