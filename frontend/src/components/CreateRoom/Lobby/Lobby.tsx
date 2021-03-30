import React, { FunctionComponent } from 'react'
import { useLobbyPlayers } from '../../../hooks/Socket/useLobbyPlayers'
import { User } from '../../../types/User/User'
import { PrimaryButton } from '../../UI/Button/PrimaryButton'
import { AddPlayers } from './AddPlayers'
import styles from './Lobby.module.scss'
import { PlayerAvatar } from '../../UI/PlayerAvatar'

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
            <PrimaryButton className={styles.Margin} type='submit'>
                Start Game
            </PrimaryButton>
        </>
    )
}
