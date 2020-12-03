"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const withStyles_1 = require("@material-ui/core/styles/withStyles");
const CityComponent_1 = require("../UI-Components/CityComponent");
const DateComponent_1 = require("../UI-Components/DateComponent");
const ParamsComponent_1 = require("../UI-components/ParamsComponent");
const Grid_1 = require("@material-ui/core/Grid");
const Button_1 = require("@material-ui/core/Button");
const Checkbox_1 = require("@material-ui/core/Checkbox");
const AppBar_1 = require("@material-ui/core/AppBar");
const Collapse_1 = require("@material-ui/core/Collapse");
const IconButton_1 = require("@material-ui/core/IconButton");
const SyncAlt_1 = require("@material-ui/icons/SyncAlt");
const AdvancedSearchComponent_1 = require("./AdvancedSearchComponent");
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
const axios = require('axios').default;
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
        axios.post(`https://www.aviasales.com/adaptors/chains/rt_search_native_format`, JSON.stringify(request))
            .then((response) => {
            console.log(response);
        });
    }
    render() {
        const { classes } = this.props;
        return (React.createElement(AppBar_1.default, { position: "static", color: "inherit" },
            React.createElement(Grid_1.default, { container: true, className: classes.grid, spacing: 0 },
                React.createElement(Grid_1.default, { item: true, xs: 12 },
                    React.createElement(Grid_1.default, { container: true, justify: "center", spacing: 0 },
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(CityComponent_1.default, { name: "Откуда", value: this.state.Origin, onNameChange: this.handleOriginChange, lang: "ru" })),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(IconButton_1.default, { onClick: this.handleSwapOriginAndDistination, color: "secondary" },
                                React.createElement(SyncAlt_1.default, null))),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(CityComponent_1.default, { name: "\u041A\u0443\u0434\u0430", value: this.state.Destination, onNameChange: this.handleDestinationChange, lang: "ru" })),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(Checkbox_1.default, { checked: this.state.IsReturn, onChange: this.handleShowBackDate, value: this.state.IsReturn, color: "secondary" })),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(DateComponent_1.default, { minDate: new Date(), onDateChange: this.handleDepartureChange, disable: false, name: "\u0412\u044B\u043B\u0435\u0442" })),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(DateComponent_1.default, { minDate: this.state.From, onDateChange: this.handleArrivedChange, disable: !this.state.IsReturn, name: "\u041E\u0431\u0440\u0430\u0442\u043D\u043E" })),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(ParamsComponent_1.default, null)),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(Checkbox_1.default, { checked: this.state.IsAdvanced, onChange: this.handleShowAdvanced, value: this.state.IsAdvanced, color: "secondary" }))))),
            React.createElement(Collapse_1.default, { in: this.state.IsAdvanced }, this.state.IsAdvanced ?
                React.createElement(Grid_1.default, { item: true, xs: 12 },
                    React.createElement(AdvancedSearchComponent_1.default, { value: null, name: "", lang: "ru", onNameChange: null })) : null),
            React.createElement(Grid_1.default, { container: true, className: classes.grid, spacing: 0 },
                React.createElement(Grid_1.default, { item: true, xs: 8 }),
                React.createElement(Grid_1.default, { item: true, xs: 4 },
                    React.createElement(Grid_1.default, { container: true, justify: "center", spacing: 0 },
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(Button_1.default, { onClick: this.handleSearch, color: "secondary", variant: "contained" }, "\u041F\u043E\u0438\u0441\u043A")))))));
    }
}
;
exports.default = withStyles_1.default(styles)(SimpleSearch);
