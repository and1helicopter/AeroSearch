"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AppBar_1 = require("@material-ui/core/AppBar");
const Toolbar_1 = require("@material-ui/core/Toolbar");
const FormControl_1 = require("@material-ui/core/FormControl");
const Select_1 = require("@material-ui/core/Select");
const styles_1 = require("@material-ui/core/styles");
const MenuItem_1 = require("@material-ui/core/MenuItem");
const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({
    app: {
        backgroundColor: "#2196f3"
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        position: "absolute",
        right: "2%",
        minWidth: 120
    },
    select: {
        color: "white",
        flexGrow: 1,
    },
}));
function MainLayout() {
    const classes = useStyles();
    const [lang, setLang] = React.useState('');
    const langChange = (event) => {
        setLang(event.target.value);
    };
    return (React.createElement("div", { className: classes.root },
        React.createElement(AppBar_1.default, { className: classes.app, position: "static" },
            React.createElement(Toolbar_1.default, null,
                React.createElement(FormControl_1.default, { className: classes.formControl },
                    React.createElement(Select_1.default, { className: classes.select, onChange: langChange, defaultValue: 'Русский', variant: "standard" },
                        React.createElement(MenuItem_1.default, { value: 'Русский' }, "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"),
                        React.createElement(MenuItem_1.default, { value: 'English' }, "English")))))));
}
exports.default = MainLayout;
