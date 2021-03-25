import { Avatar as MAvatar } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './Avatar.module.css'

interface Props {
    name: string
    color: string
    className?: string
}

export const Avatar: FunctionComponent<Props> = props => {
    const { color, name, className } = props

    return (
        <MAvatar
            alt='avatar'
            className={[styles.Avatar, className].join(' ')}
            style={{ backgroundColor: color }}>
            {name ? name.slice(0, 1).toUpperCase() : null}
        </MAvatar>
    )
}
