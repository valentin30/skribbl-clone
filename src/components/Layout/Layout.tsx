import { Container, Typography } from '@material-ui/core'
import { Brush } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import styles from './Layout.module.css'

interface Props {
    children: React.ReactElement
}

export const Layout: FunctionComponent<Props> = props => {
    return (
        <>
            <Typography
                variant='h3'
                className={styles.Logo}
                color='textSecondary'>
                <Brush /> DrawFull
            </Typography>
            <Container maxWidth='lg'>{props.children}</Container>
        </>
    )
}
