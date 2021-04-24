import { Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { StartGameData } from 'src/dto/data/start-game.data'
import { SelectWordPayload } from 'src/dto/payload/select-word.payload'
import { Room } from 'src/models/room.model'
import { ROOM_NOT_FOUND, NOT_ALLOWED } from 'src/util/error-messages'
import { RoomService } from './room.service'
import { UserService } from './user.service'

@Injectable()
export class GameService {
    constructor(
        private readonly roomService: RoomService,
        private readonly userService: UserService
    ) {}

    startGame(ownerID: string): StartGameData {
        const room: Room = this.roomService.getRoomByOwnerID(ownerID)

        if (room.players.length < 3) {
            throw new WsException({
                status: 'info',
                message: `Hey, ${3 - room.players.length} more players need to join`
            })
        }

        room.startGame()

        return new StartGameData(room.id)
    }

    startRound(ownerID: string): void {
        const room: Room = this.roomService.getRoomByOwnerID(ownerID)
    }

    selectWord(userID: string, { word }: SelectWordPayload): void {
        const room: Room = this.roomService.getRoomByCurrentPlayerID(userID)

        if (!room) {
            throw new WsException(ROOM_NOT_FOUND)
        }

        if (room.seconds) {
            throw new WsException(NOT_ALLOWED)
        }

        room.startRound(word)
    }
}
