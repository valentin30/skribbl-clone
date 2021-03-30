import { Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useRoom } from '../../../../hooks/Room/useRoom'
import styles from './Rounds.module.scss'

interface Props {}

export const Rounds: FunctionComponent<Props> = props => {
    const {
        state: { currentRound, rounds }
    } = useRoom()

    return (
        <Typography
            className={styles.root}
            variant='button'
            color='textSecondary'>
            Round {currentRound} of {rounds}
        </Typography>
    )
}
