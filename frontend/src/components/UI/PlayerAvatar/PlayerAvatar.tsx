import { Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { User } from '../../../types/User/User'
import { Avatar } from '../Avatar'
import styles from './PlayerAvatar.module.scss'

interface Props {
    user: User
    small?: boolean
}

export const PlayerAvatar: FunctionComponent<Props> = props => {
    const { small, user } = props
    return (
        <div className={small ? styles.small : styles.root}>
            <Avatar name={user.name} color={user.color} small={small} />
            <Typography variant='body1'>{user.name}</Typography>
        </div>
    )
}
