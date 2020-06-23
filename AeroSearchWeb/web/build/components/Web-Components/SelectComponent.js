"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/core/styles");
const Add_1 = require("@material-ui/icons/Add");
const Close_1 = require("@material-ui/icons/Close");
const UnfoldMore_1 = require("@material-ui/icons/UnfoldMore");
const KeyboardArrowDown_1 = require("@material-ui/icons/KeyboardArrowDown");
const styles = () => ({
    typography: {
        flexGrow: 1
    },
    bar: {
        "flex-direction": "row"
    },
    card: {
        margin: 10,
        minWidth: 150,
        maxWidth: 200,
    },
    add: {
        "text-align": "center",
        width: "100%",
        height: "100%",
    },
    route: {
        "text-align": "center",
    },
});
class Route {
    constructor(from, to, fromDate, toDate, roundTrip) {
        this.from = from,
            this.to = to,
            this.fromDate = fromDate,
            this.toDate = toDate,
            this.roundTrip = roundTrip;
    }
}
class SelectBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visable: true,
            routes: new Array(),
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    ;
    handleAdd() {
        var routes = this.state.routes;
        var rand = Math.random().toString(36).substring(2, 5).toUpperCase();
        routes.push(new Route("MOW", rand, "10.06.2020", "12.07.2020", false));
        this.setState({ routes: routes });
        if (this.state.routes.length >= 6)
            this.setState({ visable: false });
    }
    handleRemove(value) {
        var routes = this.state.routes;
        var index = routes.indexOf(value);
        if (index != -1) {
            routes.splice(index, 1);
            this.setState({ routes: routes });
            if (this.state.routes.length < 6)
                this.setState({ visable: true });
        }
    }
    handleSelect() {
    }
    render() {
        const { classes } = this.props;
        return (React.createElement(core_1.AppBar, { className: classes.bar, position: "static", color: "inherit" },
            this.state.routes.map(value => React.createElement(core_1.Card, { className: classes.card, elevation: 5 },
                React.createElement(core_1.CardActionArea, { className: classes.add, onClick: this.handleSelect },
                    React.createElement(core_1.CardHeader, { className: classes.route, avatar: value.roundTrip ? React.createElement(UnfoldMore_1.default, { color: "primary" }) : React.createElement(KeyboardArrowDown_1.default, { color: "primary" }), action: React.createElement(core_1.IconButton, { "aria-label": "close", onClick: () => this.handleRemove(value) },
                            React.createElement(Close_1.default, { color: "secondary" })), title: value.from + " - " + value.to, subheader: value.fromDate + "   " + value.toDate })))),
            React.createElement(core_1.Card, { hidden: !this.state.visable, className: classes.card, elevation: 5 },
                React.createElement(core_1.CardActionArea, { className: classes.add, onClick: this.handleAdd },
                    React.createElement(core_1.CardContent, { className: classes.add_content },
                        React.createElement(Add_1.default, null),
                        React.createElement("br", null),
                        React.createElement(core_1.Typography, { variant: "h6" }, "Add"))))));
    }
}
;
exports.default = styles_1.withStyles(styles)(SelectBarComponent);
