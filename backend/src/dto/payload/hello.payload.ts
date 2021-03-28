import { IsString } from 'class-validator'

export class HelloPayload {
    @IsString()
    name: string
}
