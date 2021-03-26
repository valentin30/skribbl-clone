import { Button } from '@material-ui/core'
import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../../context/User/UserContext'
import { IUserContext } from '../../context/User/UserContextInterface'
import { io, Socket } from 'socket.io-client'

interface Props {}

// const socket = io('http://localhost:4000')

export const Game: FunctionComponent<Props> = props => {
    const { name } = useContext<IUserContext>(UserContext)

    const socketRef = useRef<Socket>()

    useEffect(() => {
        socketRef.current = io('http://localhost:4000')
        socketRef.current.onAny(console.log)
        socketRef.current.on('msgClient', (data: any) => {
            console.log(data)
        })

        socketRef.current.emit('msgServer', 'Valentin')

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
                    console.log(socketRef.current)

                    socketRef.current?.emit('msgServer', 'Valentin')
                }}>
                Send
            </Button>
        </>
    )
}
