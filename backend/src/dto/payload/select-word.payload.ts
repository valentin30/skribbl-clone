import { IsString } from 'class-validator'

export class SelectWordPayload {
    @IsString()
    word: string
}
