"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const ContentLayout_1 = require("./ContentLayout");
const styles_1 = require("@material-ui/core/styles");
const theme_1 = require("../themes/theme");
const styles = {};
const mapStateToProps = (store) => ({ app: store.app });
class App extends React.Component {
    render() {
        return (React.createElement(styles_1.MuiThemeProvider, { theme: theme_1.default },
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", null,
                    React.createElement(react_router_dom_1.Route, { component: ContentLayout_1.default })))));
    }
}
exports.default = styles_1.withStyles(styles)(App);
