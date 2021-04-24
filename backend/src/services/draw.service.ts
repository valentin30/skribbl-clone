import { Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { DrawingData } from 'src/dto/data/drawing.data'
import { DrawPayload } from 'src/dto/payload/draw.payload'
import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'
import { DRAWING } from 'src/util/events'
import { OUT_OF_TIME } from 'src/util/error-messages'

import { RoomService } from './room.service'

@Injectable()
export class DrawService {
    constructor(private readonly roomService: RoomService) {}

    draw(userID: string, { drawing }: DrawPayload): void {
        const room: Room = this.roomService.getRoomByCurrentPlayerID(userID)

        if (!room.seconds) {
            throw new WsException(OUT_OF_TIME)
        }

        room.drawing = drawing

        const data: DrawingData = new DrawingData(room.drawing)

        room.players
            .filter((player: User) => player.id !== room.currentPlayer.id)
            .forEach((player: User) => player.socket.emit(DRAWING, data))
    }
}
