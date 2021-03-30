import { Avatar as MAvatar } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './Avatar.module.scss'

interface Props {
    name: string
    color: string
    className?: string
    small?: boolean
}

export const Avatar: FunctionComponent<Props> = props => {
    const { color, name, className, small } = props

    return (
        <MAvatar
            className={[small ? undefined : styles.root, className].join(' ')}
            style={{ backgroundColor: color }}
            alt='avatar'>
            {name ? name.slice(0, 1).toUpperCase() : null}
        </MAvatar>
    )
}
