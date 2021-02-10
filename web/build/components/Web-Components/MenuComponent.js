"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AppBar_1 = require("@material-ui/core/AppBar");
const Toolbar_1 = require("@material-ui/core/Toolbar");
const IconButton_1 = require("@material-ui/core/IconButton");
const Tooltip_1 = require("@material-ui/core/Tooltip");
const Typography_1 = require("@material-ui/core/Typography");
const MenuItem_1 = require("@material-ui/core/MenuItem");
const Button_1 = require("@material-ui/core/Button");
const Menu_1 = require("@material-ui/core/Menu");
const AccountCircle_1 = require("@material-ui/icons/AccountCircle");
const Language_1 = require("@material-ui/icons/Language");
const AttachMoney_1 = require("@material-ui/icons/AttachMoney");
const EuroSymbol_1 = require("@material-ui/icons/EuroSymbol");
const withStyles_1 = require("@material-ui/core/styles/withStyles");
const styles = () => ({
    typography: {
        flexGrow: 1
    }
});
class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElementLang: null,
            anchorElementCurrency: null,
            language: "Русский",
            currency: "RUB",
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
        this.handleChengeLanguageClick = this.handleChengeLanguageClick.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.handleChengeCurrencyClick = this.handleChengeCurrencyClick.bind(this);
    }
    ;
    handleChangeLanguage(event) {
        this.setState({ anchorElementLang: event.currentTarget });
    }
    ;
    handleChangeCurrency(event) {
        this.setState({ anchorElementCurrency: event.currentTarget });
    }
    ;
    handleClose(event) {
        this.setState({ anchorElementLang: null });
        this.setState({ anchorElementCurrency: null });
    }
    ;
    handleChengeLanguageClick(event) {
        this.setState({ language: event.target.textContent });
        this.setState({ anchorElementLang: null });
    }
    handleChengeCurrencyClick(event) {
        this.setState({ currency: event.target.textContent });
        this.setState({ anchorElementCurrency: null });
    }
    render() {
        const { classes } = this.props;
        return (React.createElement(AppBar_1.default, { position: "static", color: "primary" },
            React.createElement(Toolbar_1.default, { variant: "dense" },
                React.createElement(Typography_1.default, { variant: "h6", className: classes.typography }, "AeroSearch"),
                React.createElement(Tooltip_1.default, { title: "Currency" },
                    React.createElement(Button_1.default, { variant: "text", color: "inherit", onClick: this.handleChangeCurrency, startIcon: this.state.currency == 'USD' ? React.createElement(AttachMoney_1.default, null) : this.state.currency == 'EUR' ? React.createElement(EuroSymbol_1.default, null) : null }, this.state.currency)),
                React.createElement(Menu_1.default, { id: "lock-menu", anchorEl: this.state.anchorElementCurrency, keepMounted: true, open: Boolean(this.state.anchorElementCurrency), onClose: this.handleClose },
                    React.createElement(MenuItem_1.default, { value: 'RUB', onClick: this.handleChengeCurrencyClick }, "RUB"),
                    React.createElement(MenuItem_1.default, { value: 'USD', onClick: this.handleChengeCurrencyClick }, "USD"),
                    React.createElement(MenuItem_1.default, { value: 'EUR', onClick: this.handleChengeCurrencyClick }, "EUR")),
                React.createElement(Tooltip_1.default, { title: "Language" },
                    React.createElement(Button_1.default, { variant: "text", color: "inherit", startIcon: React.createElement(Language_1.default, null), onClick: this.handleChangeLanguage }, this.state.language)),
                React.createElement(Menu_1.default, { id: "lock-menu", anchorEl: this.state.anchorElementLang, keepMounted: true, open: Boolean(this.state.anchorElementLang), onClose: this.handleClose },
                    React.createElement(MenuItem_1.default, { value: 'Русский', onClick: this.handleChengeLanguageClick }, "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"),
                    React.createElement(MenuItem_1.default, { value: 'English', onClick: this.handleChengeLanguageClick }, "English")),
                React.createElement(IconButton_1.default, { edge: "end", color: "inherit" },
                    React.createElement(Tooltip_1.default, { title: "Login" },
                        React.createElement(AccountCircle_1.default, { fontSize: "inherit" }))))));
    }
}
;
exports.default = withStyles_1.default(styles)(MenuComponent);
