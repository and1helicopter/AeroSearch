"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("@material-ui/core/styles");
const CityComponent_1 = require("../UI-Components/CityComponent");
const DateComponent_1 = require("../UI-Components/DateComponent");
const ParamsComponent_1 = require("../UI-components/ParamsComponent");
const RadiusComponent_1 = require("../UI-Components/RadiusComponent");
const core_1 = require("@material-ui/core");
const SyncAlt_1 = require("@material-ui/icons/SyncAlt");
const styles = () => ({
    grid: {
        alignContent: "horizontal",
        margin: 10,
        "align-items": "center",
    },
    align: {
        "align-items": "center"
    }
});
class Search_RQ {
}
class Search_Passengers {
}
class Search_Segment {
}
class SimpleSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsReturn: true,
            Origin: null,
            Destination: null,
            From: new Date(),
            To: new Date(),
            IsAdvanced: false
        };
        this.handleOriginChange = this.handleOriginChange.bind(this);
        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.handleShowBackDate = this.handleShowBackDate.bind(this);
        this.handleShowAdvanced = this.handleShowAdvanced.bind(this);
        this.handleSwapOriginAndDistination = this.handleSwapOriginAndDistination.bind(this);
        this.handleDepartureChange = this.handleDepartureChange.bind(this);
        this.handleArrivedChange = this.handleArrivedChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    ;
    handleShowBackDate() {
        this.setState({ IsReturn: !this.state.IsReturn });
    }
    ;
    handleOriginChange(name) {
        this.setState({ Origin: name });
    }
    ;
    handleDestinationChange(name) {
        this.setState({ Destination: name });
    }
    ;
    handleShowAdvanced() {
        this.setState({ IsAdvanced: !this.state.IsAdvanced });
    }
    ;
    handleSwapOriginAndDistination() {
        let oldOrigin = this.state.Origin;
        let oldDistiantion = this.state.Destination;
        this.setState({ Origin: oldDistiantion });
        this.setState({ Destination: oldOrigin });
    }
    handleDepartureChange(date) {
        this.setState({ From: date });
    }
    handleArrivedChange(date) {
        this.setState({ To: date });
    }
    handleSearch() {
        var _a, _b, _c;
        let url = `https://www.aviasales.com/adaptors/chains/rt_search_native_format`;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = () => {
            console.log(xhr.response);
            if (xhr.status == 200) {
                let autocompleteDataTemp = xhr.response;
                console.log(autocompleteDataTemp);
            }
        };
        let request = new Search_RQ();
        request.know_english = true;
        request.currency = "rub";
        let passengers = new Search_Passengers();
        passengers.adults = 1;
        passengers.children = 0;
        passengers.infants = 0;
        request.passengers = passengers;
        let segments = new Search_Segment();
        let month = '' + ((_a = this.state.From) === null || _a === void 0 ? void 0 : _a.getMonth());
        let day = '' + ((_b = this.state.From) === null || _b === void 0 ? void 0 : _b.getDate());
        let year = (_c = this.state.From) === null || _c === void 0 ? void 0 : _c.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        let dateString = [year, month, day].join('-');
        segments.date = dateString;
        segments.origin = this.state.Origin.code;
        segments.destination = this.state.Destination.code;
        request.segments = new Array(segments);
        console.log(request);
        xhr.send(JSON.stringify(request));
    }
    render() {
        const { classes } = this.props;
        return (React.createElement(core_1.AppBar, { position: "static", color: "inherit" },
            React.createElement(core_1.Grid, { container: true, className: classes.grid, spacing: 0 },
                React.createElement(core_1.Grid, { item: true, xs: 12 },
                    React.createElement(core_1.Grid, { container: true, justify: "center", spacing: 0 },
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(CityComponent_1.default, { name: "Откуда", value: this.state.Origin, onNameChange: this.handleOriginChange, lang: "ru" })),
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(core_1.IconButton, { onClick: this.handleSwapOriginAndDistination, color: "secondary" },
                                React.createElement(SyncAlt_1.default, null))),
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(CityComponent_1.default, { name: "\u041A\u0443\u0434\u0430", value: this.state.Destination, onNameChange: this.handleDestinationChange, lang: "ru" })),
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(core_1.Checkbox, { checked: this.state.IsReturn, onChange: this.handleShowBackDate, value: this.state.IsReturn, color: "secondary" })),
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(DateComponent_1.default, { minDate: new Date(), onDateChange: this.handleDepartureChange, disable: false, name: "\u0412\u044B\u043B\u0435\u0442" })),
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(DateComponent_1.default, { minDate: this.state.From, onDateChange: this.handleArrivedChange, disable: !this.state.IsReturn, name: "\u041E\u0431\u0440\u0430\u0442\u043D\u043E" })),
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(ParamsComponent_1.default, null)),
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(core_1.Checkbox, { checked: this.state.IsAdvanced, onChange: this.handleShowAdvanced, value: this.state.IsAdvanced, color: "secondary" }))))),
            React.createElement(core_1.Collapse, { in: this.state.IsAdvanced }, this.state.IsAdvanced ?
                React.createElement(core_1.Grid, { item: true, xs: 12 },
                    React.createElement(core_1.Grid, { container: true, justify: "center", spacing: 0 },
                        React.createElement(core_1.Grid, { item: true, xs: 4 },
                            React.createElement(RadiusComponent_1.default, { radius: 0, oneCity: true, cities: new Array(this.state.Origin) })),
                        React.createElement(core_1.Grid, { item: true, xs: 4 }, " \u041F\u0440\u0438\u043B\u0435\u0442 "),
                        React.createElement(core_1.Grid, { item: true, xs: 4 }, " \u041A\u0430\u0440\u0442\u0430 "))) : null),
            React.createElement(core_1.Grid, { container: true, className: classes.grid, spacing: 0 },
                React.createElement(core_1.Grid, { item: true, xs: 8 }),
                React.createElement(core_1.Grid, { item: true, xs: 4 },
                    React.createElement(core_1.Grid, { container: true, justify: "center", spacing: 0 },
                        React.createElement(core_1.Grid, { item: true },
                            React.createElement(core_1.Button, { onClick: this.handleSearch, color: "secondary", variant: "contained" }, "\u041F\u043E\u0438\u0441\u043A")),
                        "    ")))));
    }
}
;
exports.default = styles_1.withStyles(styles)(SimpleSearch);
