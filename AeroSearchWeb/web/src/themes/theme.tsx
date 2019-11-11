import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 16,
    },
    palette: {
        primary: {
            main: '#2979ff',            
            dark: '#1c54b2',
            light: '#5393ff'
        },
        secondary: {
            main: '#f50057',            
            dark: '#ab003c',
            light: '#f73378'
        },        
    },
});

export default theme;