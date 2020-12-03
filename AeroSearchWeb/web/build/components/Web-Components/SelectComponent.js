"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AppBar_1 = require("@material-ui/core/AppBar");
const Typography_1 = require("@material-ui/core/Typography");
const CardHeader_1 = require("@material-ui/core/CardHeader");
const Card_1 = require("@material-ui/core/Card");
const CardActionArea_1 = require("@material-ui/core/CardActionArea");
const CardContent_1 = require("@material-ui/core/CardContent");
const IconButton_1 = require("@material-ui/core/IconButton");
const withStyles_1 = require("@material-ui/core/styles/withStyles");
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
        return (React.createElement(AppBar_1.default, { className: classes.bar, position: "static", color: "inherit" },
            this.state.routes.map(value => React.createElement(Card_1.default, { className: classes.card, elevation: 5 },
                React.createElement(CardActionArea_1.default, { className: classes.add, onClick: this.handleSelect },
                    React.createElement(CardHeader_1.default, { className: classes.route, avatar: value.roundTrip ? React.createElement(UnfoldMore_1.default, { color: "primary" }) : React.createElement(KeyboardArrowDown_1.default, { color: "primary" }), action: React.createElement(IconButton_1.default, { "aria-label": "close", onClick: () => this.handleRemove(value) },
                            React.createElement(Close_1.default, { color: "secondary" })), title: value.from + " - " + value.to, subheader: value.fromDate + "   " + value.toDate })))),
            React.createElement(Card_1.default, { hidden: !this.state.visable, className: classes.card, elevation: 5 },
                React.createElement(CardActionArea_1.default, { className: classes.add, onClick: this.handleAdd },
                    React.createElement(CardContent_1.default, { className: classes.add_content },
                        React.createElement(Add_1.default, null),
                        React.createElement("br", null),
                        React.createElement(Typography_1.default, { variant: "h6" }, "Add"))))));
    }
}
;
exports.default = withStyles_1.default(styles)(SelectBarComponent);
