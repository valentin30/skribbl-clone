import { IsString } from 'class-validator'

export class JoinRoomPayload {
    @IsString()
    roomID: string
}
