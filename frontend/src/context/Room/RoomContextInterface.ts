export interface IRoomContext {
    state: RoomState
    methods: RoomMethods
}

export interface RoomState {
    currentPlayerID: string
    secondsPerRound: number
    currentRound: number | null
    rounds: number
    word: string
}

export interface RoomMethods {
    setCurrentPlayerID: (userID: string) => void
    setSecondsPerRound: (secondsPerRound: number) => void
    setCurrentRound: (currentRound: number) => void
    setRounds: (rounds: number) => void
    setWord: (word: string) => void
}
