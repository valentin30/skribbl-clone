export interface IRegisterPayload {
    name: string
    color: string
}

export class RegisterPayload {
    private readonly name: string
    private readonly color: string

    constructor({ color, name }: IRegisterPayload) {
        this.name = name
        this.color = color
    }
}
