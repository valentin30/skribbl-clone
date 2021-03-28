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
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <UserContextProvider>
                    <Layout>
                        <App />
                    </Layout>
                </UserContextProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
