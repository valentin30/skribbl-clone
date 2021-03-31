import React, { FunctionComponent } from 'react'
import { Chat } from '../../components/Game/Chat'
import { DrawingBoard } from '../../components/Game/DrawingBoard'
import { Header } from '../../components/Game/Header'
import { ScoreBoard } from '../../components/Game/ScoreBoard'
import { useCurrentPlayerListener } from '../../hooks/Socket/useCurrentPlayerListenr'
import { useCurrentRoundListener } from '../../hooks/Socket/useCurrentRoundListener'
import { useCurrentWordListener } from '../../hooks/Socket/useCurrentWordListener'
import { useDisconnectOnLeave } from '../../hooks/Socket/useDisconnectOnLeave'
import { useJoinRoomListener } from '../../hooks/Socket/useJoinRoomListener'
import styles from './Game.module.scss'

interface Props {}

export const Game: FunctionComponent<Props> = props => {
    useJoinRoomListener()
    useCurrentWordListener()
    useCurrentRoundListener()
    useCurrentPlayerListener()
    useDisconnectOnLeave()

    return (
        <div className={styles.root}>
            <Header />
            <ScoreBoard />
            <DrawingBoard />
            <Chat />
        </div>
    )
}
