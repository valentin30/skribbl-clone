import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { DrawPayload } from 'src/dto/payload/draw.payload'
import { BadRequestTransformationFilter } from 'src/filters/bad-request.filter'
import { DrawService } from 'src/services/draw.service'
import { DRAWING } from 'src/util/events'

@WebSocketGateway()
export class DrawGateway {
    @WebSocketServer() server: Server

    constructor(private readonly drawService: DrawService) {}

    @UsePipes(new ValidationPipe())
    @UseFilters(new BadRequestTransformationFilter())
    @SubscribeMessage(DRAWING)
    drawingHandler(client: Socket, payload: DrawPayload): void {
        this.drawService.draw(client.id, payload)
    }
}
