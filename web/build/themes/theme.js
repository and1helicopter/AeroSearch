"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMuiTheme_1 = require("@material-ui/core/styles/createMuiTheme");
const theme = createMuiTheme_1.default({
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
