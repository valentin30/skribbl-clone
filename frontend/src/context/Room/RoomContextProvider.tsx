import React, { FunctionComponent, useState } from 'react'
import { RoomContext } from './RoomContext'

export const RoomContextProvider: FunctionComponent = props => {
    const [currentPlayerID, setCurrentPlayerID] = useState<string>('')
    const [secondsPerRound, setSecondsPerRound] = useState<number>(0)
    const [currentRound, setCurrentRound] = useState<number | null>(null)
    const [rounds, setRounds] = useState<number>(0)
    const [word, setWord] = useState<string>('')

    return (
        <RoomContext.Provider
            value={{
                state: {
                    currentPlayerID,
                    secondsPerRound,
                    currentRound,
                    rounds,
                    word
                },
                methods: {
                    setCurrentPlayerID,
                    setSecondsPerRound,
                    setCurrentRound,
                    setRounds,
                    setWord
                }
            }}>
            {props.children}
        </RoomContext.Provider>
    )
}
