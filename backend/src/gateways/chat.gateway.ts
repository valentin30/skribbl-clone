import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { BadRequestTransformationFilter } from 'src/filters/bad-request.filter'
import { RoomService } from 'src/services/room.service'
import { NEW_MESSAGE } from 'src/util/events'

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer() server: Server

    constructor(private readonly roomService: RoomService) {}

    @UsePipes(new ValidationPipe())
    @UseFilters(new BadRequestTransformationFilter())
    @SubscribeMessage(NEW_MESSAGE)
    chatHandler(client: Socket): void {}
}
