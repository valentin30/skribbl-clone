import { Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useDisabled } from '../../../../hooks/Room/useDisabled'
import { useRoom } from '../../../../hooks/Room/useRoom'
import styles from './Word.module.scss'

interface Props {}

export const Word: FunctionComponent<Props> = props => {
    const { disabled } = useDisabled()
    const {
        state: { word }
    } = useRoom()

    return (
        <Typography
            className={[styles.root, disabled ? styles.Spacer : ''].join(' ')}
            variant='button'>
            {word}
        </Typography>
    )
}
