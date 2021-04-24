import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { StartGameData } from 'src/dto/data/start-game.data'
import { SelectWordPayload } from 'src/dto/payload/select-word.payload'
import { Room } from 'src/models/room.model'
import { GameService } from 'src/services/game.service'
import { START_GAME, WORD_SELECT } from 'src/util/events'

@WebSocketGateway()
export class GameGateway {
    @WebSocketServer() server: Server

    constructor(private readonly gameService: GameService) {}

    @SubscribeMessage(START_GAME)
    startGameHandler(client: Socket): WsResponse<StartGameData> {
        const data: StartGameData = this.gameService.startGame(client.id)

        return {
            event: START_GAME,
            data
        }
    }

    @SubscribeMessage(WORD_SELECT)
    selectWordHandler(client: Socket, payload: SelectWordPayload): void {
        this.gameService.selectWord(client.id, payload)
    }
}
