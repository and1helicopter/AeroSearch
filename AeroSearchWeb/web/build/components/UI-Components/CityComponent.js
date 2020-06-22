"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const Autocomplete_1 = require("@material-ui/lab/Autocomplete");
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
class CityComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            autocompleteData: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
    }
    retrieveDataAsynchronously(searchText) {
        axios.get(`http://autocomplete.travelpayouts.com/places2?term=${searchText}&locale=${this.props.lang}`)
            .then((response) => {
            let autocompleteDataTemp = response.data.map((item) => { return { code: item.code, name: item.name }; });
            this.setState({ autocompleteData: autocompleteDataTemp });
        });
    }
    ;
    onChange(e) {
        this.setState({ value: e.target.value });
        this.retrieveDataAsynchronously(e.target.value);
    }
    ;
    onSelect(event, value) {
        this.props.onNameChange(value);
    }
    ;
    render() {
        const { classes } = this.props;
        return (React.createElement(Autocomplete_1.default, { className: classes.autocomplete, options: this.state.autocompleteData, getOptionLabel: (option) => `${option.code} - ${option.name}`, disableOpenOnFocus: true, value: this.props.value, freeSolo: true, onChange: this.onSelect, renderInput: (params) => (React.createElement(core_1.FormControl, { fullWidth: true, className: classes.formControl },
                React.createElement(core_1.TextField, Object.assign({}, params, { className: classes.textField, value: this.props.value, variant: "standard", color: "secondary", margin: "none", fullWidth: true, onChange: this.onChange })),
                React.createElement(core_1.FormHelperText, { className: classes.formHelperText }, this.props.name))) }));
    }
}
exports.default = styles_1.withStyles(styles)(CityComponent);
