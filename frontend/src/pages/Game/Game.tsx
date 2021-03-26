import { Button } from '@material-ui/core'
import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../../context/User/UserContext'
import { IUserContext } from '../../context/User/UserContextInterface'
import io from 'socket.io-client'

interface Props {}

const socket = io('ws://localhost:4000')

export const Game: FunctionComponent<Props> = props => {
    const { name } = useContext<IUserContext>(UserContext)

    const socketRef = useRef<SocketIOClient.Socket>()

    useEffect(() => {
        // socketRef.current = io('http://localhost:4000')
        socket.on('connect', () => {
            console.log('conn')
        })
        socket.on('msgClient', (data: any) => {
            console.log(data)
        })

        socket.emit('msgServer', 'Valentin')

        // return () => {
        //     socketRef.current?.disconnect()
        // }
    }, [])

    return (
        <>
            <Button
                style={{ marginTop: '10rem' }}
                variant='contained'
                color='primary'
                onClick={async () => {
                    console.log(socket)

                    socket.emit('msgServer', 'Valentin')
                }}>
                Send
            </Button>
        </>
    )
}
