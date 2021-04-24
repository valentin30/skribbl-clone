import React, { FunctionComponent } from 'react'
import { Chat } from '../../components/Game/Chat'
import { DrawingBoard } from '../../components/Game/DrawingBoard'
import { Header } from '../../components/Game/Header'
import { EndGame } from '../../components/Game/Modals/EndGame'
import { LoadingBackdrop } from '../../components/Game/Modals/LoadingBackdrop'
import { WaitingForPlayers } from '../../components/Game/Modals/WaitingForPlayers'
import { WordPick } from '../../components/Game/Modals/WordPick'
import { ScoreBoard } from '../../components/Game/ScoreBoard'
import { useCurrentPlayerListener } from '../../hooks/Socket/useCurrentPlayerListenr'
import { useCurrentRoundListener } from '../../hooks/Socket/useCurrentRoundListener'
import { useCurrentWordListener } from '../../hooks/Socket/useCurrentWordListener'
import { useDisconnectOnLeave } from '../../hooks/Socket/useDisconnectOnLeave'
import { useJoinRoom } from '../../hooks/Socket/useJoinRoom'
import { useJoinRoomListener } from '../../hooks/Socket/useJoinRoomListener'
import { useToHomeOnLeave } from '../../hooks/useToHomeOnLeave'
import styles from './Game.module.scss'

export const Game: FunctionComponent = () => {
    useJoinRoom()

    const { loading } = useJoinRoomListener()

    useCurrentWordListener()
    useCurrentRoundListener()
    useCurrentPlayerListener()
    useDisconnectOnLeave()
    useToHomeOnLeave()

    return (
        <div className={styles.root}>
            <LoadingBackdrop loading={loading} />
            <WaitingForPlayers />
            <WordPick />
            <EndGame />
            <Header />
            <ScoreBoard />
            <DrawingBoard />
            <Chat />
        </div>
    )
}
