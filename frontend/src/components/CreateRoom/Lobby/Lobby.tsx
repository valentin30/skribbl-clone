import { Button } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useLobbyPlayers } from '../../../hooks/useLobbyPlayers'
import { useUser } from '../../../hooks/useUser/useUser'
import { User } from '../../../types/User/User'
import { AddPlayers } from './AddPlayers'
import styles from './Lobby.module.scss'
import { PlayerAvatar } from './PlayerAvatar'

interface Props {
    roomID: string
}

export const Lobby: FunctionComponent<Props> = props => {
    const { roomID } = props

    const { players } = useLobbyPlayers(roomID)

    return (
        <>
            <div className={styles.root}>
                {players.map((player: User) => (
                    <PlayerAvatar key={player.id} user={player} />
                ))}
            </div>
            <AddPlayers roomID={roomID} />
            <Button
                className={styles.Margin}
                variant='contained'
                color='primary'
                size='large'
                type='submit'
                fullWidth>
                Start Game
            </Button>
        </>
    )
}
