import { Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { User } from '../../../../types/User/User'
import { Avatar } from '../../../UI/Avatar'
import styles from './PlayerAvatar.module.scss'

interface Props {
    user: User
}

export const PlayerAvatar: FunctionComponent<Props> = ({ user }) => (
    <div className={styles.root}>
        <Avatar name={user.name} color={user.color} />
        <Typography variant='body1'>{user.name}</Typography>
    </div>
)
