import { IsString } from 'class-validator'
import { IUser } from 'src/interfaces/user.interface'

export class MessagePayload {
    @IsString()
    content: string
}
