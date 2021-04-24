import { Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { MessagePayload } from 'src/dto/payload/message.payload'
import { Room } from 'src/models/room.model'
import { RoomService } from './room.service'
import { CANT_MESSAGE, OUT_OF_TIME } from '../util/error-messages'

@Injectable()
export class ChatService {
    constructor(private readonly roomService: RoomService) {}

    newMessage(userID: string, { content }: MessagePayload): void {
        const room: Room = this.roomService.getRoomByPlayerID(userID)

        if (!room.seconds) {
            throw new WsException(OUT_OF_TIME)
        }

        room.newMessage(userID, content)
    }
}
