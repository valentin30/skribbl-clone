import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
    WsResponse
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateRoomData } from 'src/dto/data/create-room.data'
import { GetRoomData } from 'src/dto/data/get-room.data'
import { JoinRoomData } from 'src/dto/data/join-room.data'
import { NewUserData } from 'src/dto/data/new-user.data'
import { CreateRoomPayload } from 'src/dto/payload/create-room.payload'
import { JoinRoomPayload } from 'src/dto/payload/join-room.payload'
import { BadRequestTransformationFilter } from 'src/filters/bad-request.filter'
import { Room } from 'src/models/room.model'
import { User } from 'src/models/user.model'
import { RoomService } from 'src/services/room.service'
import { UserService } from 'src/services/user.service'
import { CREATE_ROOM, GET_ROOM, JOIN_ROOM, NEW_USER_ } from '../constants'

@WebSocketGateway()
export class RoomGateway {
    @WebSocketServer() server: Server

    constructor(
        private readonly roomService: RoomService,
        private readonly userService: UserService
    ) {}

    @SubscribeMessage(GET_ROOM)
    getRoomHandler(client: Socket): WsResponse<GetRoomData> {
        const { id }: Room = this.roomService.getAvailableRoom(client.id)

        return {
            event: GET_ROOM,
            data: {
                roomID: id
            }
        }
    }

    @UsePipes(new ValidationPipe())
    @UseFilters(new BadRequestTransformationFilter())
    @SubscribeMessage(CREATE_ROOM)
    createRoomHandler(client: Socket, payload: CreateRoomPayload): WsResponse<CreateRoomData> {
        const { id }: Room = this.roomService.create(client, payload)

        return {
            event: CREATE_ROOM,
            data: {
                roomID: id
            }
        }
    }

    @UsePipes(new ValidationPipe())
    @UseFilters(new BadRequestTransformationFilter())
    @SubscribeMessage(JOIN_ROOM)
    joinRoomHandler(client: Socket, payload: JoinRoomPayload): WsResponse<JoinRoomData> {
        const user: User = this.userService.findByID(client.id)
        const { id, color, name } = user

        const { id: roomID, currentRound, players }: Room = this.roomService.joinRoom(user, payload)

        const roomPlayersWithoutCurrent = players
            .slice(0, -1)
            .map((player: User) => player.toIUser())

        this.server.emit(NEW_USER_ + roomID, new NewUserData({ id, name, color }))

        return {
            event: JOIN_ROOM,
            data: {
                hasStarted: Boolean(currentRound),
                players: roomPlayersWithoutCurrent
            }
        }
    }
}
