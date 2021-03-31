import { Container, Typography } from '@material-ui/core'
import { Brush } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { ChildrenProps } from '../../types/props/ChildrenProps'
import styles from './Layout.module.scss'

export const Layout: FunctionComponent<ChildrenProps> = props => {
    return (
        <>
            <div className={styles.root}>
                <Typography
                    component={Link}
                    to='/'
                    variant='h3'
                    color='textSecondary'>
                    <Brush /> DrawFull
                </Typography>
            </div>
            <Container className={styles.Content} maxWidth='xl'>
                {props.children}
            </Container>
        </>
    )
}
