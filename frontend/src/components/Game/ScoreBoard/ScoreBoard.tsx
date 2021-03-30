import { Card, CardContent } from '@material-ui/core'
import { PeopleAlt } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import { User } from '../../../types/User/User'
import { CardHeader } from '../../UI/CardHeader'
import { PlayerAvatar } from '../../UI/PlayerAvatar'
import styles from './ScoreBoard.module.scss'

interface Props {
    players: User[]
}

export const ScoreBoard: FunctionComponent<Props> = ({ players }) => {
    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <CardHeader>
                    <PeopleAlt />
                    Players
                </CardHeader>
                <div>
                    {players.map((user: User) => (
                        <PlayerAvatar key={user.id} user={user} small />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
