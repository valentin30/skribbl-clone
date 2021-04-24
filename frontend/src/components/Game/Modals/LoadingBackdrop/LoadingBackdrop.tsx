import { Backdrop, CircularProgress } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './LoadingBackdrop.module.scss'

interface Props {
    loading: boolean
}

export const LoadingBackdrop: FunctionComponent<Props> = props => {
    return (
        <Backdrop className={styles.Backdrop} open={props.loading}>
            <CircularProgress className={styles.Spinner} />
        </Backdrop>
    )
}
