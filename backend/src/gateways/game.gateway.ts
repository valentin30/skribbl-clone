import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { StartGameData } from 'src/dto/data/start-game.data'
import { DrawPayload } from 'src/dto/payload/draw.payload'
import { BadRequestTransformationFilter } from 'src/filters/bad-request.filter'
import { Room } from 'src/models/room.model'
import { GameService } from 'src/services/game.service'
import { DRAWING, START_GAME } from 'src/util/events'

@WebSocketGateway()
export class GameGateway {
    @WebSocketServer() server: Server

    constructor(private readonly gameService: GameService) {}

    @SubscribeMessage(START_GAME)
    startGameHandler(client: Socket): WsResponse<StartGameData> {
        const { id }: Room = this.gameService.startGame(client.id)

        return {
            event: START_GAME,
            data: {
                roomID: id
            }
        }
    }

    @UsePipes(new ValidationPipe())
    @UseFilters(new BadRequestTransformationFilter())
    @SubscribeMessage(DRAWING)
    drawingHandler(client: Socket, payload: DrawPayload): void {
        this.gameService.draw(client.id, payload)
    }
}
