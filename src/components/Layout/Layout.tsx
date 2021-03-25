import { Container, Typography } from '@material-ui/core'
import { Brush } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from './Layout.module.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
    children: React.ReactElement
}

export const Layout: FunctionComponent<Props> = props => {
    return (
        <>
            <div className={styles.Container}>
                <Typography
                    variant='h3'
                    component={Link}
                    to='/'
                    className={styles.Logo}
                    color='textSecondary'>
                    <Brush /> DrawFull
                </Typography>
            </div>
            <Container maxWidth='lg'>{props.children}</Container>
            <ToastContainer autoClose={2000} position='bottom-left' />
        </>
    )
}
