import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2196f3'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1600
        }
    }
})
