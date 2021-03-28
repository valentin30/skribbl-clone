import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { BadRequestTransformationFilter } from 'src/filters/bad-request.filter'
import { User } from 'src/models/user.model'
import { UserService } from 'src/services/user.service'
import { OWNER_LEFT, REGISTER, USER_LEFT } from '../events'
import { RegisterData } from '../dto/data/register.data'
import { RegisterPayload } from '../dto/payload/register.payload'

@WebSocketGateway()
export class UserGateway implements OnGatewayDisconnect, OnGatewayConnection {
    @WebSocketServer() server: Server

    constructor(private readonly userService: UserService) {}

    @UsePipes(new ValidationPipe())
    @UseFilters(new BadRequestTransformationFilter())
    @SubscribeMessage(REGISTER)
    registerHandler(client: Socket, payload: RegisterPayload): WsResponse<RegisterData> {
        const { id }: User = this.userService.register(client, payload)

        return {
            event: REGISTER,
            data: {
                userID: id
            }
        }
    }

    @SubscribeMessage(USER_LEFT)
    disconnectHandler(client: Socket): void {
        this.userService.disconnect(client)
    }

    handleDisconnect(client: Socket) {
        this.userService.disconnect(client)
    }
    handleConnection(client: Socket, ...args: any[]) {
        console.log('connect')
    }
}
