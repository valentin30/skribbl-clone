import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Layout } from './components/Layout'
import { theme } from './config/theme'
import { UserContextProvider } from './context/User/UserContextProvider'
import './index.scss'
import 'fontsource-roboto'
import { SnackbarProvider } from 'notistack'
import reportWebVitals from './reportWebVitals'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <UserContextProvider>
                <SnackbarProvider
                    maxSnack={3}
                    autoHideDuration={4000}
                    action={key => (
                        <IconButton
                            className='snackbar__close-btn'
                            aria-label='close'
                            color='inherit'>
                            <Close />
                        </IconButton>
                    )}>
                    <Layout>
                        <App />
                    </Layout>
                </SnackbarProvider>
            </UserContextProvider>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
