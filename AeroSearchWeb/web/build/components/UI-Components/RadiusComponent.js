"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/core/styles");
const styles = () => ({
    autocomplete: {
        width: 300,
        marginLeft: 8,
        marginRight: 8,
    },
    formControl: {
        width: "100%"
    },
    formHelperText: {
        paddingLeft: "5%",
        margin: 4
    }
});
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
            value: 0,
            autocompleteData: []
        };
        this.valueLabelFormat = this.valueLabelFormat.bind(this);
        this.onChange = this.onChange.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
    }
    retrieveDataAsynchronously(searchText) {
        axios.get(`http://autocomplete.travelpayouts.com/places2?term=${searchText}&locale=${this.props}`)
            .then((response) => {
            let autocompleteDataTemp = response.data.map((item) => { return { code: item.code, name: item.name }; });
            this.setState({ autocompleteData: autocompleteDataTemp });
        });
    }
    ;
    onChange(event, newValue) {
        this.setState({ value: newValue });
        console.log(newValue);
    }
    ;
    valueLabelFormat(value) {
        return `${value}`;
    }
    ;
    render() {
        const { classes } = this.props;
        return (React.createElement("div", null,
            React.createElement(core_1.Switch, null, "Many cities"),
            React.createElement(core_1.Slider, { min: 0, max: 1000, step: 10, getAriaValueText: this.valueLabelFormat, valueLabelFormat: this.valueLabelFormat, valueLabelDisplay: "auto", onChange: this.onChange, marks: marks })));
    }
}
exports.default = styles_1.withStyles(styles)(RadiusComponent);
