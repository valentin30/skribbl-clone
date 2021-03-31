import { Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { DrawPayload } from 'src/dto/payload/draw.payload'
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

        room.startGame()

        return room
    }

    startRound(ownerID: string): void {
        const room: Room = this.roomService.getRoomByOwnerID(ownerID)
    }

    draw(userID: string, { drawing }: DrawPayload): void {
        const room: Room = this.roomService.getRoomByCurrentPlayerID(userID)

        room.emitDrawing(drawing)
    }
}
