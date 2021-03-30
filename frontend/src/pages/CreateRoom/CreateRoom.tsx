import { Step, StepLabel, Stepper } from '@material-ui/core'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { Lobby } from '../../components/CreateRoom/Lobby'
import { RoomConfig } from '../../components/CreateRoom/RoomConfig'
import { useCreateRoomListener } from '../../hooks/Socket/useGetRoomID'
import { useStartGameListener } from '../../hooks/Socket/useStartGameListener'
import { socket } from '../../Socket/Socket'
import { START_GAME } from '../../utils/events'
import styles from './CreateRoom.module.scss'

export const CreateRoom: FunctionComponent = () => {
    const { roomID } = useCreateRoomListener()

    const activeStep = useMemo<number>(() => (roomID ? 1 : 0), [roomID])

    const submitHandler = useCallback((event: React.FormEvent) => {
        event.preventDefault()

        socket.emit(START_GAME)
    }, [])

    useStartGameListener()

    return (
        <form className={styles.root} onSubmit={submitHandler}>
            <Stepper activeStep={activeStep} alternativeLabel>
                <Step>
                    <StepLabel>Room Settings</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Add Players</StepLabel>
                </Step>
            </Stepper>
            {!roomID ? <RoomConfig /> : <Lobby roomID={roomID} />}
        </form>
    )
}
