import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { START_GAME } from 'src/events'
import { StartGameData } from 'src/dto/data/start-game.data'
import { Room } from 'src/models/room.model'
import { GameService } from 'src/services/game.service'

@WebSocketGateway()
export class GameGateway {
    @WebSocketServer() server: Server

    constructor(private readonly gameService: GameService) {}

    @SubscribeMessage(START_GAME)
    startGameHandler(client: Socket): WsResponse<StartGameData> {
        const room: Room = this.gameService.startGame(client.id)

        return {
            event: START_GAME,
            data: {
                roomID: room.id
            }
        }
    }
}
