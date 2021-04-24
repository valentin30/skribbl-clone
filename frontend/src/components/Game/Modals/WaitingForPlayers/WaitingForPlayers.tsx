import { Backdrop, Card, CardContent } from '@material-ui/core'
import { PeopleAlt } from '@material-ui/icons'
import React, { FunctionComponent, useCallback } from 'react'
import { useHistory } from 'react-router'
import { useGetRoomIDFromURL } from '../../../../hooks/Room/useGetRoomID'
import { useRoom } from '../../../../hooks/Room/useRoom'
import { useLobbyPlayers } from '../../../../hooks/Socket/useLobbyPlayers'
import { User } from '../../../../types/User/User'
import { PrimaryButton } from '../../../UI/Button/PrimaryButton'
import { CardHeader } from '../../../UI/CardHeader'
import { Divider } from '../../../UI/Divider'
import { PlayerAvatar } from '../../../UI/PlayerAvatar'
import styles from './WaitingForPlayers.module.scss'

interface Props {}

export const WaitingForPlayers: FunctionComponent<Props> = props => {
    const history = useHistory()
    const {
        state: { currentRound }
    } = useRoom()

    const { roomID } = useGetRoomIDFromURL()
    const { players } = useLobbyPlayers(roomID)

    const returnToHomeHandler = useCallback(() => {
        history.replace('/')
    }, [history])

    return (
        <Backdrop className={styles.Backdrop} open={currentRound === 0}>
            <Card className={styles.root} variant='outlined'>
                <CardContent>
                    <CardHeader>
                        <PeopleAlt />
                        Waiting for players to join.
                    </CardHeader>
                    <div className={styles.Players}>
                        {players.map((player: User) => (
                            <PlayerAvatar key={player.id} user={player} />
                        ))}
                    </div>

                    <Divider />

                    <PrimaryButton
                        className={styles.Button}
                        onClick={returnToHomeHandler}>
                        Return to home
                    </PrimaryButton>
                </CardContent>
            </Card>
        </Backdrop>
    )
}
