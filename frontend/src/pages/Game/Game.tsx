import React, { FunctionComponent, useEffect, useState } from 'react'
import { Chat } from '../../components/Game/Chat'
import { DrawingBoard } from '../../components/Game/DrawingBoard'
import { Header } from '../../components/Game/Header'
import { ScoreBoard } from '../../components/Game/ScoreBoard'
import { useRoom } from '../../hooks/Room/useRoom'
import { useCurrentPlayerListener } from '../../hooks/Socket/useCurrentPlayerListenr'
import { useCurrentRoundListener } from '../../hooks/Socket/useCurrentRoundListener'
import { useCurrentWordListener } from '../../hooks/Socket/useCurrentWordListener'
import { useDisconnectOnLeave } from '../../hooks/Socket/useDisconnectOnLeave'
import { socket } from '../../Socket/Socket'
import { JoinRoomData } from '../../types/dto/data/JoinRoomData'
import { JOIN_ROOM } from '../../utils/events'
import styles from './Game.module.scss'

interface Props {}

export const Game: FunctionComponent<Props> = props => {
    const {
        methods: { setSecondsPerRound, setRounds, setCurrentRound, setWord }
    } = useRoom()

    useEffect(() => {
        socket.once(
            JOIN_ROOM,
            ({ secondsPerRound, currentRound, rounds, word }: JoinRoomData) => {
                setSecondsPerRound(secondsPerRound)
                setRounds(rounds)
                setCurrentRound(currentRound)
                setWord(word)
            }
        )

        return () => {
            socket.off(JOIN_ROOM)
        }
    }, [setSecondsPerRound, setRounds, setCurrentRound, setWord])

    useCurrentWordListener()
    useCurrentRoundListener()
    useCurrentPlayerListener()
    useDisconnectOnLeave()

    return (
        <>
            <div className={styles.root}>
                <Header />
                <ScoreBoard />
                <DrawingBoard />
                <Chat />
            </div>
        </>
    )
}
