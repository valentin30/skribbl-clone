import { CircularProgress, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useTimer } from '../../../../hooks/Room/useTimer'
import styles from './Timer.module.scss'

export const Timer: FunctionComponent = () => {
    const { seconds, secondsPerRound } = useTimer()

    const percent: number = secondsPerRound / 100

    return (
        <div className={styles.root}>
            <CircularProgress variant='determinate' value={seconds / percent} />
            <Typography variant='button' color='textSecondary'>
                {seconds}
            </Typography>
        </div>
    )
}
