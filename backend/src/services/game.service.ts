import { Injectable } from '@nestjs/common'
import { WebSocketServer, WsException } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { CurrentPlayerData } from 'src/dto/data/current-player.data'
import { CURRENT_PLAYER } from 'src/events'
import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'
import { RoomService } from './room.service'
import { UserService } from './user.service'

@Injectable()
export class GameService {
    constructor(
        private readonly roomService: RoomService,
        private readonly userService: UserService
    ) {}

    startGame(ownerID: string): Room {
        const room: Room = this.roomService.getRoomByOwnerID(ownerID)

        if (room.players.length < 3) {
            throw new WsException({
                status: 'info',
                message: `Hey, ${3 - room.players.length} more players need to join`
            })
        }

        const data: CurrentPlayerData = room.startGame()

        room.currentPlayer.socket.emit(CURRENT_PLAYER, data)
        data.word = data.word.replace(/([A-z])/g, '_')

        room.players
            .filter((player: User) => player.id !== room.currentPlayer.id)
            .forEach((player: User) => player.socket.emit(CURRENT_PLAYER, data))

        return room
    }

    startRound(ownerID: string) {
        const room: Room = this.roomService.getRoomByOwnerID(ownerID)
    }
}
