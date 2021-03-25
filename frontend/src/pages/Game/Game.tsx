import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import styles from './Game.module.css'
import SpringSocket from 'react-spring-websocket'
import { Button } from '@material-ui/core'
import { useLocation } from 'react-router'

interface Props {}

export const Game: FunctionComponent<Props> = props => {
    const { search } = useLocation()

    console.log(search)
    const params: URLSearchParams = new URLSearchParams(search)

    const id = params.get('id')

    const socket = useMemo(() => {
        return new SpringSocket(
            'http://localhost:8080/ws',
            [`/topic/${id}`],
            m => {
                console.log(m)
                const data = JSON.parse(m.body)
                console.log('hello')
                console.log(data)
            }
        )
    }, [id])

    useEffect(() => {}, [])

    return (
        <>
            <Button
                style={{ marginTop: '10rem' }}
                variant='contained'
                color='primary'
                onClick={() => {
                    socket.send('/app/register', {
                        roomId: id,
                        name: 'Valentin',
                        isPrivate: false
                    })
                    socket.onMessage((m: any) => {
                        const data = JSON.parse(m)
                        console.log('hello')
                        console.log(data)
                    })
                }}>
                Send
            </Button>
        </>
    )
}
