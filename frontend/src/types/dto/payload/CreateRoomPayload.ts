export interface ICreateRoomPayload {
    rounds: number
    secondsPerRound: number
}

export class CreateRoomPayload {
    private readonly rounds: number
    private readonly secondsPerRound: number

    constructor({ rounds, secondsPerRound }: ICreateRoomPayload) {
        this.rounds = rounds
        this.secondsPerRound = secondsPerRound
    }
}
