import React, { FunctionComponent } from 'react'
import { Container, Typography, useMediaQuery } from '@material-ui/core'
import { Brush } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ChildrenProps } from '../../types/props/ChildrenProps'
import styles from './Layout.module.scss'
import 'react-toastify/dist/ReactToastify.css'

export const Layout: FunctionComponent<ChildrenProps> = props => {
    const matches = useMediaQuery('(max-width:600px)')

    return (
        <>
            <div className={styles.root}>
                <Typography
                    className={styles.Logo}
                    component={Link}
                    to='/'
                    variant='h3'
                    color='textSecondary'>
                    <Brush /> DrawFull
                </Typography>
            </div>
            <Container maxWidth='lg'>{props.children}</Container>
            <ToastContainer
                autoClose={2000}
                position={matches ? 'bottom-left' : 'top-right'}
            />
        </>
    )
}
