import { Typography, Divider as HR } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './Divider.module.scss'

interface Props {}

export const Divider: FunctionComponent<Props> = props => {
    return (
        <Typography
            variant='button'
            color='textSecondary'
            className={styles.root}>
            <HR />
            OR
            <HR />
        </Typography>
    )
}
