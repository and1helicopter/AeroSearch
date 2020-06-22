"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/core/styles");
const icons_1 = require("@material-ui/icons");
const styles = () => ({
    autocomplete: {
        width: 300,
        marginLeft: 8,
        marginRight: 8,
    },
    slider: {
        "margin-left": 16,
        "margin-right": 16,
    },
    formControl: {
        width: "100%"
    },
    formHelperText: {
        paddingLeft: "5%",
        margin: 4
    }
});
class ParamsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            anchorElementMenu: null,
            adult: 1,
            child: 0,
            infant: 0,
            class: "Econom"
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAdultChange = this.handleAdultChange.bind(this);
        this.handleChildChange = this.handleChildChange.bind(this);
        this.handleInfantChange = this.handleInfantChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
    }
    handleClick(event) {
        this.setState({ anchorElementMenu: event.currentTarget });
    }
    ;
    handleClose() {
        this.setState({ anchorElementMenu: null });
    }
    ;
    handleAdultChange(event) {
        if (event != undefined) {
            if (event == "-" && this.state.adult > 1) {
                let adult = this.state.adult - 1;
                this.setState({ adult: adult });
            }
            if (event == "+" && this.state.adult + this.state.child + this.state.infant < 9) {
                let adult = this.state.adult + 1;
                this.setState({ adult: adult });
            }
        }
    }
    ;
    handleChildChange(event) {
        if (event != undefined) {
            if (event == "-" && this.state.child > 0) {
                let child = this.state.child - 1;
                this.setState({ child: child });
            }
            if (event == "+" && this.state.adult + this.state.child + this.state.infant < 9) {
                let child = this.state.child + 1;
                this.setState({ child: child });
            }
        }
    }
    ;
    handleInfantChange(event) {
        if (event != undefined) {
            if (event == "-" && this.state.infant > 0) {
                let infant = this.state.infant - 1;
                this.setState({ infant: infant });
            }
            if (event == "+" && this.state.adult + this.state.child + this.state.infant < 9) {
                let infant = this.state.infant + 1;
                this.setState({ infant: infant });
            }
        }
    }
    ;
    handleClassChange(event) {
        this.setState({ class: event.target.value });
    }
    ;
    render() {
        const { classes } = this.props;
        return (React.createElement("div", null,
            React.createElement(core_1.Button, { variant: "outlined", color: "secondary", onClick: this.handleClick },
                "Passenger ",
                this.state.adult + this.state.child + this.state.infant,
                ": ",
                this.state.class),
            React.createElement(core_1.Menu, { id: "lock-menu", anchorEl: this.state.anchorElementMenu, keepMounted: true, open: Boolean(this.state.anchorElementMenu), onClose: this.handleClose },
                React.createElement(core_1.MenuItem, { button: false },
                    `Adult:`,
                    React.createElement(core_1.IconButton, { disabled: this.state.adult == 1, onClick: () => this.handleAdultChange("-"), color: "secondary" },
                        React.createElement(icons_1.Remove, null)),
                    this.state.adult,
                    React.createElement(core_1.IconButton, { disabled: this.state.adult + this.state.child + this.state.infant == 9, onClick: () => this.handleAdultChange("+"), color: "secondary" },
                        React.createElement(icons_1.Add, null))),
                React.createElement(core_1.MenuItem, { button: false },
                    `Child:`,
                    React.createElement(core_1.IconButton, { disabled: this.state.child == 0, onClick: () => this.handleChildChange("-"), color: "secondary" },
                        React.createElement(icons_1.Remove, null)),
                    this.state.child,
                    React.createElement(core_1.IconButton, { disabled: this.state.adult + this.state.child + this.state.infant == 9, onClick: () => this.handleChildChange("+"), color: "secondary" },
                        React.createElement(icons_1.Add, null))),
                React.createElement(core_1.MenuItem, { button: false },
                    `Infant:`,
                    React.createElement(core_1.IconButton, { disabled: this.state.infant == 0, onClick: () => this.handleInfantChange("-"), color: "secondary" },
                        React.createElement(icons_1.Remove, null)),
                    this.state.infant,
                    React.createElement(core_1.IconButton, { disabled: this.state.adult + this.state.child + this.state.infant == 9, onClick: () => this.handleInfantChange("+"), color: "secondary" },
                        React.createElement(icons_1.Add, null))),
                React.createElement(core_1.Divider, null),
                React.createElement(core_1.MenuItem, { button: false },
                    React.createElement(core_1.RadioGroup, { value: this.state.class, onChange: this.handleClassChange, defaultValue: "Econom" },
                        React.createElement(core_1.FormControlLabel, { value: "Econom", control: React.createElement(core_1.Radio, { color: "secondary" }), label: "Econom", labelPlacement: "start" }),
                        React.createElement(core_1.FormControlLabel, { value: "Business", control: React.createElement(core_1.Radio, { color: "secondary" }), label: "Business", labelPlacement: "start" }))),
                React.createElement(core_1.Divider, null),
                React.createElement(core_1.MenuItem, { button: false },
                    React.createElement(core_1.Button, { color: "secondary", onClick: this.handleClose }, "Ok")))));
    }
}
exports.default = styles_1.withStyles(styles)(ParamsComponent);
