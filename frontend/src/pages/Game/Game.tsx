import { Button } from '@material-ui/core'
import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router'
import { DrawingBoard } from '../../components/DrawingBoard'
import { useDisconnectOnLeave } from '../../hooks/useDisconnectOnLeave'
import { useLobbyPlayers } from '../../hooks/useLobbyPlayers'
import { useUser } from '../../hooks/useUser/useUser'
import { socket } from '../../Socket/Socket'
import { JoinRoomData } from '../../types/dto/data/JoinRoomData'
import { JoinRoomPayload } from '../../types/dto/payload/JoinRoomPayload'
import { JOIN_ROOM, USER_LEFT } from '../../utils/events'

interface Props {}

export const Game: FunctionComponent<Props> = props => {
    const { user } = useUser()

    const history = useHistory()

    const { search } = useLocation()

    const roomID = useMemo(() => {
        const params: URLSearchParams = new URLSearchParams(search)

        const roomID: string = params.get('id') ?? ''

        return roomID
    }, [search])

    useDisconnectOnLeave()

    const { players } = useLobbyPlayers(roomID)

    // useEffect(() => {
    //     socket.once(JOIN_ROOM, ({ hasStarted, players }: JoinRoomData) => {})

    //     socket.emit(JOIN_ROOM, new JoinRoomPayload(roomID as string))

    //     return () => {
    //         socket.off(JOIN_ROOM)
    //     }
    // }, [history, user, roomID])

    return (
        <>
            <Button
                style={{ marginTop: '6rem' }}
                variant='contained'
                color='primary'>
                Send
            </Button>
            <DrawingBoard />
            <pre>{JSON.stringify(players, null, 2)}</pre>
        </>
    )
}
