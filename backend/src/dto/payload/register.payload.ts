import { IsString } from 'class-validator'

export class RegisterPayload {
    @IsString()
    name: string

    @IsString()
    color: string
}
