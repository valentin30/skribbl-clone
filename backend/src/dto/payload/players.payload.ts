import { IsString } from 'class-validator'

export class PlayersPayload {
    @IsString()
    roomID: string
}
