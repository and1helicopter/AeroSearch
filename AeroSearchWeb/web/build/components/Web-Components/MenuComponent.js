"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const styles_1 = require("@material-ui/core/styles");
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
        return (React.createElement(core_1.AppBar, { position: "static", color: "primary" },
            React.createElement(core_1.Toolbar, { variant: "dense" },
                React.createElement(core_1.Typography, { variant: "h6", className: classes.typography }, "AeroSearch"),
                React.createElement(core_1.Tooltip, { title: "Currency" },
                    React.createElement(core_1.Button, { variant: "text", color: "inherit", onClick: this.handleChangeCurrency, startIcon: this.state.currency == 'USD' ? React.createElement(icons_1.AttachMoney, null) : this.state.currency == 'EUR' ? React.createElement(icons_1.EuroSymbol, null) : null }, this.state.currency)),
                React.createElement(core_1.Menu, { id: "lock-menu", anchorEl: this.state.anchorElementCurrency, keepMounted: true, open: Boolean(this.state.anchorElementCurrency), onClose: this.handleClose },
                    React.createElement(core_1.MenuItem, { value: 'RUB', onClick: this.handleChengeCurrencyClick }, "RUB"),
                    React.createElement(core_1.MenuItem, { value: 'USD', onClick: this.handleChengeCurrencyClick }, "USD"),
                    React.createElement(core_1.MenuItem, { value: 'EUR', onClick: this.handleChengeCurrencyClick }, "EUR")),
                React.createElement(core_1.Tooltip, { title: "Language" },
                    React.createElement(core_1.Button, { variant: "text", color: "inherit", startIcon: React.createElement(icons_1.Language, null), onClick: this.handleChangeLanguage }, this.state.language)),
                React.createElement(core_1.Menu, { id: "lock-menu", anchorEl: this.state.anchorElementLang, keepMounted: true, open: Boolean(this.state.anchorElementLang), onClose: this.handleClose },
                    React.createElement(core_1.MenuItem, { value: 'Русский', onClick: this.handleChengeLanguageClick }, "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"),
                    React.createElement(core_1.MenuItem, { value: 'English', onClick: this.handleChengeLanguageClick }, "English")),
                React.createElement(core_1.IconButton, { edge: "end", color: "inherit" },
                    React.createElement(core_1.Tooltip, { title: "Login" },
                        React.createElement(icons_1.AccountCircle, { fontSize: "inherit" }))))));
    }
}
;
exports.default = styles_1.withStyles(styles)(MenuComponent);
