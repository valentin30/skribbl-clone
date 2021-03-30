import {
    Backdrop,
    Card,
    CardContent,
    CircularProgress,
    Typography
} from '@material-ui/core'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import { DrawingBoard } from '../../components/DrawingBoard'
import { Chat } from '../../components/Game/Chat'
import { ScoreBoard } from '../../components/Game/ScoreBoard'
import { useDisconnectOnLeave } from '../../hooks/Socket/useDisconnectOnLeave'
import { useLobbyPlayers } from '../../hooks/Socket/useLobbyPlayers'
import { socket } from '../../Socket/Socket'
import { JoinRoomData } from '../../types/dto/data/JoinRoomData'
import { JOIN_ROOM } from '../../utils/events'
import styles from './Game.module.scss'
interface Props {}

export const Game: FunctionComponent<Props> = props => {
    const { search } = useLocation()
    const [hasStarted, setHasStarted] = useState<boolean>(false)

    const [timer, setTimer] = useState<number>(110)

    const roomID = useMemo(() => {
        const params: URLSearchParams = new URLSearchParams(search)

        const roomID: string = params.get('id') ?? ''

        return roomID
    }, [search])

    useDisconnectOnLeave()

    const { players } = useLobbyPlayers(roomID)

    useEffect(() => {
        socket.once(JOIN_ROOM, ({ hasStarted }: JoinRoomData) => {
            setHasStarted(hasStarted)
        })

        return () => {
            socket.off(JOIN_ROOM)
        }
    }, [])

    useEffect(() => {
        const timeout: NodeJS.Timeout = setInterval(() => {
            setTimer(timer => {
                if (timer === 1) {
                    clearInterval(timeout)
                }
                return timer - 1
            })
        }, 1000)

        return () => {
            clearInterval(timeout)
        }
    }, [])

    return (
        <>
            <div className={styles.root}>
                <Card className={styles.Word} variant='outlined'>
                    <CardContent>
                        <div className={styles.Timer}>
                            <CircularProgress
                                variant='static'
                                value={timer / 1.1}
                            />
                            <Typography variant='button' color='textSecondary'>
                                {timer}
                            </Typography>
                        </div>
                        <Typography variant='button' color='textSecondary'>
                            Round {1} of {3}
                        </Typography>
                        <Typography
                            className={styles.Text}
                            style={{ letterSpacing: '4px' }}
                            variant='button'>
                            h_____
                        </Typography>
                    </CardContent>
                </Card>
                <ScoreBoard players={players} />
                <DrawingBoard />
                <Chat />
            </div>
        </>
    )
}
