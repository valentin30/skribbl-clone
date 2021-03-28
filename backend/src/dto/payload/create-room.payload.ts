import { IsPositive } from 'class-validator'

export class CreateRoomPayload {
    @IsPositive()
    rounds: number

    @IsPositive()
    secondsPerRound: number
}
