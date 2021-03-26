import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import styles from './Game.module.css'
import SpringSocket from 'react-spring-websocket'
import { Button } from '@material-ui/core'
import { useLocation } from 'react-router'
import { UserContext } from '../../context/User/UserContext'
import { IUserContext } from '../../context/User/UserContextInterface'

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

    const { name } = useContext<IUserContext>(UserContext)

    useEffect(() => {}, [])

    return (
        <>
            <Button
                style={{ marginTop: '10rem' }}
                variant='contained'
                color='primary'
                onClick={async () => {
                    const response = await fetch(
                        'http://localhost:8080/room/register',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                roomId: id,
                                name,
                                isPrivate: false
                            })
                        }
                    )

                    console.log(response.status)
                }}>
                Send
            </Button>
        </>
    )
}
