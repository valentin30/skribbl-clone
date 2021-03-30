import { Card, CardContent } from '@material-ui/core'
import { PeopleAlt } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import { useGetRoomIDFromURL } from '../../../hooks/Room/useGetRoomID'
import { useRoom } from '../../../hooks/Room/useRoom'
import { useLobbyPlayers } from '../../../hooks/Socket/useLobbyPlayers'
import { useUser } from '../../../hooks/useUser/useUser'
import { User } from '../../../types/User/User'
import { CardHeader } from '../../UI/CardHeader'
import { PlayerAvatar } from '../../UI/PlayerAvatar'
import styles from './ScoreBoard.module.scss'

export const ScoreBoard: FunctionComponent = () => {
    const { roomID } = useGetRoomIDFromURL()

    const { players } = useLobbyPlayers(roomID)

    const {
        user: { id }
    } = useUser()

    const {
        state: { currentPlayerID }
    } = useRoom()

    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <CardHeader>
                    <PeopleAlt />
                    Players
                </CardHeader>
            </CardContent>
            <div>
                {players.map((user: User) => (
                    <PlayerAvatar
                        key={user.id}
                        user={user}
                        selected={id === user.id}
                        drawing={currentPlayerID === user.id}
                        small
                    />
                ))}
            </div>
        </Card>
    )
}
