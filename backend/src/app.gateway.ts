import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({ origins: ['localhost:5000', 'localhost:3000'] })
export class AppGateway {
    @WebSocketServer() server: Server

    @SubscribeMessage('msgServer')
    handleMessage(client: any, payload: any): void {
        this.server.emit('msgClient', payload)
    }
}
