"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_simple_maps_1 = require("react-simple-maps");
const withStyles_1 = require("@material-ui/core/styles/withStyles");
const Grid_1 = require("@material-ui/core/Grid");
const Paper_1 = require("@material-ui/core/Paper");
const Slider_1 = require("@material-ui/core/Slider");
const pathMap = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const styles = () => ({
    grid: {
        alignContent: "horizontal",
        "padding-right": 40,
        "padding-left": 40,
        "align-items": "center",
    },
    slider: {
        "padding-right": 30,
        "padding-left": 30,
        "align-items": "center",
    }
});
const marks = [
    {
        value: 0,
        label: '0 Km',
    },
    {
        value: 250,
        label: '250 Km',
    },
    {
        value: 500,
        label: '500 Km',
    },
    {
        value: 750,
        label: '750 Km',
    },
    {
        value: 1000,
        label: '1000 Km',
    },
];
class AdvancedSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RadiusDep: 10,
            RadiusArr: 10,
        };
        this.handleDistanceDepChange = this.handleDistanceDepChange.bind(this);
        this.handleDistanceArrChange = this.handleDistanceArrChange.bind(this);
    }
    handleDistanceDepChange(event, value) {
        this.setState({ RadiusDep: value });
    }
    ;
    handleDistanceArrChange(event, value) {
        this.setState({ RadiusArr: value });
    }
    ;
    render() {
        const { classes } = this.props;
        return (React.createElement(Grid_1.default, { container: true, className: classes.grid, spacing: 1 },
            React.createElement(Grid_1.default, { item: true, xs: 6 },
                React.createElement("div", { className: classes.slider },
                    React.createElement(Slider_1.default, { color: "secondary", defaultValue: 0, onChange: this.handleDistanceDepChange, "aria-labelledby": "discrete-slider-custom", min: 10, max: 1000, step: 10, valueLabelDisplay: "auto", marks: marks }))),
            React.createElement(Grid_1.default, { item: true, xs: 6 },
                React.createElement("div", { className: classes.slider },
                    React.createElement(Slider_1.default, { color: "secondary", defaultValue: 0, onChange: this.handleDistanceArrChange, "aria-labelledby": "discrete-slider-custom", min: 10, max: 1000, step: 10, valueLabelDisplay: "auto", marks: marks }))),
            React.createElement(Grid_1.default, { item: true, xs: 6 },
                React.createElement(Grid_1.default, { container: true, xs: 12 },
                    React.createElement(Grid_1.default, { item: true, xs: 8 },
                        React.createElement(Paper_1.default, null,
                            React.createElement(react_simple_maps_1.ComposableMap, { projection: "geoAzimuthalEqualArea", projectionConfig: {
                                    rotate: [-37, -55, 0],
                                    scale: 2000
                                } },
                                React.createElement(react_simple_maps_1.Geographies, { geography: pathMap }, ({ geographies }) => geographies.map(geo => (React.createElement(react_simple_maps_1.Geography, { key: geo.rsmKey, geography: geo, fill: "#DDD", stroke: "#FFF" })))),
                                React.createElement(react_simple_maps_1.Marker, { coordinates: [37.618, 55.751] },
                                    React.createElement("circle", { r: 8, fill: "#F53" }))))),
                    React.createElement(Grid_1.default, { item: true, xs: 4 },
                        React.createElement(Paper_1.default, null, "Departure Cities")))),
            React.createElement(Grid_1.default, { item: true, xs: 2 }, "Arrive Cities"),
            React.createElement(Grid_1.default, { item: true, xs: 4 },
                React.createElement(Paper_1.default, null,
                    React.createElement(react_simple_maps_1.ComposableMap, { projection: "geoAlbers" },
                        React.createElement(react_simple_maps_1.Geographies, { geography: pathMap }, ({ geographies }) => geographies.map(geo => (React.createElement(react_simple_maps_1.Geography, { key: geo.rsmKey, geography: geo, fill: "#DDD", stroke: "#FFF" })))),
                        React.createElement(react_simple_maps_1.Marker, { coordinates: [-74.006, 40.7128] },
                            React.createElement("circle", { r: 8, fill: "#F53" })))))));
    }
}
exports.default = withStyles_1.default(styles)(AdvancedSearchComponent);
