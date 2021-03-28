import { Injectable } from '@nestjs/common'
import { WebSocketServer, WsException } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { CurrentPlayerData } from 'src/dto/data/current-player.data'
import { CURRENT_PLAYER } from 'src/events'
import { Room } from 'src/models/room.model'
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

        const activeIndex: number = Math.floor(Math.random() * room.players.length)
        const wordIndex: number = Math.floor(Math.random() * room.dictionary.length)
        const word: string = room.dictionary[wordIndex]
        room.currentPlayer = room.players[activeIndex]
        room.currentRound = 1

        room.currentPlayer.socket.emit(CURRENT_PLAYER, new CurrentPlayerData(word))

        return room
    }

    startRound(ownerID: string, server: Server) {
        const room: Room = this.roomService.getRoomByOwnerID(ownerID)
    }
}
