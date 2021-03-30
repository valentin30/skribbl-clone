import { Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useRoom } from '../../../../hooks/Room/useRoom'
import { useUser } from '../../../../hooks/useUser/useUser'
import styles from './Word.module.scss'

interface Props {}

export const Word: FunctionComponent<Props> = props => {
    const {
        state: { word, currentPlayerID }
    } = useRoom()

    const {
        user: { id }
    } = useUser()

    return (
        <Typography
            className={[
                styles.root,
                currentPlayerID !== id ? styles.Spacer : ''
            ].join(' ')}
            variant='button'>
            {word}
        </Typography>
    )
}
