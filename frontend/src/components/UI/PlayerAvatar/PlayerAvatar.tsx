import { Typography } from '@material-ui/core'
import { Brush } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import { User } from '../../../types/User/User'
import { Avatar } from '../Avatar'
import styles from './PlayerAvatar.module.scss'

interface Props {
    user: User
    drawing?: boolean
    selected?: boolean
    small?: boolean
}

export const PlayerAvatar: FunctionComponent<Props> = props => {
    const { small, user, selected, drawing } = props
    return (
        <div
            className={[
                small ? styles.Small : styles.root,
                selected ? styles.Selected : ''
            ].join(' ')}>
            <Avatar name={user.name} color={user.color} small={small} />
            <Typography variant='body1'>
                {user.name}
                {drawing && <Brush />}
            </Typography>
        </div>
    )
}
