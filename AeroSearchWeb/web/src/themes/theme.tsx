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
            main: '#4caf50',            
            dark: '#388e3c',
            light: '#81c784'
        },        
    },
});

export default theme;