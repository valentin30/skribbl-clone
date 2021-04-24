import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { MessagePayload } from 'src/dto/payload/message.payload'
import { BadRequestTransformationFilter } from 'src/filters/bad-request.filter'
import { ChatService } from 'src/services/chat.service'
import { NEW_MESSAGE } from 'src/util/events'

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer() server: Server

    constructor(private readonly chatService: ChatService) {}

    @UsePipes(new ValidationPipe())
    @UseFilters(new BadRequestTransformationFilter())
    @SubscribeMessage(NEW_MESSAGE)
    chatHandler(client: Socket, payload: MessagePayload): void {
        this.chatService.newMessage(client.id, payload)
    }
}
