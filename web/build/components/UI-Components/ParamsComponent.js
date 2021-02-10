"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Divider_1 = require("@material-ui/core/Divider");
const Menu_1 = require("@material-ui/core/Menu");
const Button_1 = require("@material-ui/core/Button");
const MenuItem_1 = require("@material-ui/core/MenuItem");
const RadioGroup_1 = require("@material-ui/core/RadioGroup");
const FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
const Radio_1 = require("@material-ui/core/Radio");
const IconButton_1 = require("@material-ui/core/IconButton");
const withStyles_1 = require("@material-ui/core/styles/withStyles");
const Remove_1 = require("@material-ui/icons/Remove");
const Add_1 = require("@material-ui/icons/Add");
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
            React.createElement(Button_1.default, { color: "secondary", onClick: this.handleClick }, `Passenger ${this.state.adult + this.state.child + this.state.infant}: ${this.state.class}`),
            React.createElement(Menu_1.default, { id: "lock-menu", anchorEl: this.state.anchorElementMenu, keepMounted: true, open: Boolean(this.state.anchorElementMenu), onClose: this.handleClose },
                React.createElement(MenuItem_1.default, { button: false },
                    `Adult:`,
                    React.createElement(IconButton_1.default, { disabled: this.state.adult == 1, onClick: () => this.handleAdultChange("-"), color: "secondary" },
                        React.createElement(Remove_1.default, null)),
                    this.state.adult,
                    React.createElement(IconButton_1.default, { disabled: this.state.adult + this.state.child + this.state.infant == 9, onClick: () => this.handleAdultChange("+"), color: "secondary" },
                        React.createElement(Add_1.default, null))),
                React.createElement(MenuItem_1.default, { button: false },
                    `Child:`,
                    React.createElement(IconButton_1.default, { disabled: this.state.child == 0, onClick: () => this.handleChildChange("-"), color: "secondary" },
                        React.createElement(Remove_1.default, null)),
                    this.state.child,
                    React.createElement(IconButton_1.default, { disabled: this.state.adult + this.state.child + this.state.infant == 9, onClick: () => this.handleChildChange("+"), color: "secondary" },
                        React.createElement(Add_1.default, null))),
                React.createElement(MenuItem_1.default, { button: false },
                    `Infant:`,
                    React.createElement(IconButton_1.default, { disabled: this.state.infant == 0, onClick: () => this.handleInfantChange("-"), color: "secondary" },
                        React.createElement(Remove_1.default, null)),
                    this.state.infant,
                    React.createElement(IconButton_1.default, { disabled: this.state.adult + this.state.child + this.state.infant == 9, onClick: () => this.handleInfantChange("+"), color: "secondary" },
                        React.createElement(Add_1.default, null))),
                React.createElement(Divider_1.default, null),
                React.createElement(MenuItem_1.default, { button: false },
                    React.createElement(RadioGroup_1.default, { value: this.state.class, onChange: this.handleClassChange, defaultValue: "Econom" },
                        React.createElement(FormControlLabel_1.default, { value: "Econom", control: React.createElement(Radio_1.default, { color: "secondary" }), label: "Econom", labelPlacement: "start" }),
                        React.createElement(FormControlLabel_1.default, { value: "Business", control: React.createElement(Radio_1.default, { color: "secondary" }), label: "Business", labelPlacement: "start" }))),
                React.createElement(Divider_1.default, null),
                React.createElement(MenuItem_1.default, { button: false },
                    React.createElement(Button_1.default, { color: "secondary", onClick: this.handleClose }, "Ok")))));
    }
}
exports.default = withStyles_1.default(styles)(ParamsComponent);
