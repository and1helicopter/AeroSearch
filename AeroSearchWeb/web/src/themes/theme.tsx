import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    // typography: {
    //     fontFamily: [
    //         '-apple-system',
    //         'BlinkMacSystemFont',
    //         '"Segoe UI"',
    //         'Roboto',
    //         '"Helvetica Neue"',
    //         'Arial',
    //         'sans-serif',
    //         '"Apple Color Emoji"',
    //         '"Segoe UI Emoji"',
    //         '"Segoe UI Symbol"',
    //     ].join(','),
    //     fontSize: 16,
    // },
    palette: {
        primary: {
            main: '#1976d2',            
            dark: '#115293',
            light: '#4791db'
        },
        secondary: {
            main: '#dc004e',            
            dark: '#9a0036',
            light: '#e33371'
        },        
    },
});

export default theme;