"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Switch_1 = require("@material-ui/core/Switch");
const Slider_1 = require("@material-ui/core/Slider");
const List_1 = require("@material-ui/core/List");
const ListItem_1 = require("@material-ui/core/ListItem");
const ListItemText_1 = require("@material-ui/core/ListItemText");
const ListItemSecondaryAction_1 = require("@material-ui/core/ListItemSecondaryAction");
const Checkbox_1 = require("@material-ui/core/Checkbox");
const Paper_1 = require("@material-ui/core/Paper");
const withStyles_1 = require("@material-ui/core/styles/withStyles");
const styles = () => ({
    grid: {
        margin: 10,
        "align-items": "center",
        "margin-right": "35px",
        "margin-left": "35px"
    },
    paper: {
        width: "100%",
        "max-height": 230,
        overflow: 'auto'
    },
});
class City {
    constructor(code, latitude, longitude) {
        this.code = code,
            this.latitude = latitude,
            this.latitude = longitude;
    }
}
const axios = require('axios').default;
const marks = [
    {
        value: 0,
        label: '0 KM',
    },
    {
        value: 500,
        label: '500 KM',
    },
    {
        value: 1000,
        label: '1000 KM',
    },
];
class RadiusComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneCity: false,
            value: 0,
            radius: 0,
            autocompleteData: new Array()
        };
        this.valueLabelFormat = this.valueLabelFormat.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(event, newValue) {
        axios.post(`http://localhost:44360/api/Radius/City?IATA=${this.props.city.code}&Radius=${newValue}`)
            .then((response) => {
            console.log(response);
            let autocompleteDataTemp = response.data.map((item) => new City(item.code, item.position.latitude, item.position.longitude));
            this.setState({ autocompleteData: autocompleteDataTemp });
        });
    }
    ;
    valueLabelFormat(value) {
        return `${value}`;
    }
    ;
    render() {
        const { classes } = this.props;
        return (React.createElement("div", { className: classes.grid },
            React.createElement("div", null,
                React.createElement(Switch_1.default, null, "Many cities"),
                React.createElement(Slider_1.default, { defaultValue: 0, min: 0, max: 1000, step: 10, getAriaValueText: this.valueLabelFormat, valueLabelFormat: this.valueLabelFormat, valueLabelDisplay: "auto", onChange: this.onChange, marks: marks })),
            React.createElement(Paper_1.default, { className: classes.paper },
                React.createElement(List_1.default, { dense: true }, this.state.autocompleteData.map((value) => {
                    return (React.createElement(ListItem_1.default, { key: value.code, button: true },
                        React.createElement(ListItemText_1.default, { primary: `${value.code}` }),
                        React.createElement(ListItemSecondaryAction_1.default, null,
                            React.createElement(Checkbox_1.default, { edge: "end" }))));
                })))));
    }
}
exports.default = withStyles_1.default(styles)(RadiusComponent);
