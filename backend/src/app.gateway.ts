import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class AppGateway {
    @WebSocketServer() server: Server

    @SubscribeMessage('msgServer')
    handleMessage(client: Socket, payload: string): void {
        this.server.emit('msgClient', payload)
    }
}
