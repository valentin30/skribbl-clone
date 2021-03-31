import { IsJSON } from 'class-validator'

export class DrawPayload {
    @IsJSON()
    drawing: string
}
