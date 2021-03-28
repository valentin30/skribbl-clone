import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { HelloData } from 'src/dto/data/hello.data'
import { HelloPayload } from 'src/dto/payload/hello.payload'
import { BadRequestTransformationFilter } from 'src/filters/bad-request.filter'
import { HELLO } from '../events'

@WebSocketGateway()
export class AppGateway {
    @UsePipes(new ValidationPipe())
    @UseFilters(new BadRequestTransformationFilter())
    @SubscribeMessage(HELLO)
    helloHandler(client: Socket, payload: HelloPayload): WsResponse<HelloData> {
        return {
            event: HELLO,
            data: {
                message: `Hello ${payload.name}`
            }
        }
    }
}
