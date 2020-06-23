"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const theme = styles_1.createMuiTheme({
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
exports.default = theme;
