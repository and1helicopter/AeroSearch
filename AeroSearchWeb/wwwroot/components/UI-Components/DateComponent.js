"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const date_fns_1 = require("@date-io/date-fns");
const pickers_1 = require("@material-ui/pickers");
const withStyles_1 = require("@material-ui/core/styles/withStyles");
const Grid_1 = require("@material-ui/core/Grid");
const FormControl_1 = require("@material-ui/core/FormControl");
const FormHelperText_1 = require("@material-ui/core/FormHelperText");
const styles = () => ({
    keyboardDatePickerOn: {
        width: 300,
        marginLeft: 8,
        marginRight: 8,
    },
    keyboardDatePickerOff: {
        width: 300,
        marginLeft: 8,
        marginRight: 8,
        '& .MuiInputBase-root': {
            color: "#1e5abd"
        }
    },
    formHelperText: {
        paddingLeft: "5%",
        margin: 4,
    }
});
class DateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    ;
    handleDateChange(newDate) {
        this.setState({ date: newDate });
        this.props.onDateChange(newDate);
    }
    ;
    render() {
        const { classes } = this.props;
        return (React.createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1.default },
            React.createElement(Grid_1.default, { container: true, justify: "space-around" },
                React.createElement(FormControl_1.default, { fullWidth: true, className: classes.formControl },
                    React.createElement(pickers_1.KeyboardDatePicker, { className: !this.props.disable ? classes.keyboardDatePickerOn : classes.keyboardDatePickerOff, disabled: this.props.disable, disableToolbar: true, disablePast: true, minDate: this.props.minDate, color: "secondary", variant: "inline", format: "dd-MM-yyyy", margin: "none", id: "date-picker-inline", value: this.state.date, onChange: this.handleDateChange, KeyboardButtonProps: {
                            'aria-label': 'change date',
                        } }),
                    React.createElement(FormHelperText_1.default, { className: classes.formHelperText }, this.props.name)))));
    }
}
;
exports.default = withStyles_1.default(styles)(DateComponent);
