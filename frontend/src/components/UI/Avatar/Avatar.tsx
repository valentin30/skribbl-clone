import { Avatar as MAvatar } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './Avatar.module.scss'

interface Props {
    name: string
    color: string
    className?: string
}

export const Avatar: FunctionComponent<Props> = props => {
    const { color, name, className } = props

    return (
        <MAvatar
            className={[styles.root, className].join(' ')}
            style={{ backgroundColor: color }}
            alt='avatar'>
            {name ? name.slice(0, 1).toUpperCase() : null}
        </MAvatar>
    )
}
