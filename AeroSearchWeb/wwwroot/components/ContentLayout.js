"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("@material-ui/core/styles");
const Box_1 = require("@material-ui/core/Box");
const Typography_1 = require("@material-ui/core/Typography");
const useScrollTrigger_1 = require("@material-ui/core/useScrollTrigger");
const Zoom_1 = require("@material-ui/core/Zoom");
const Grid_1 = require("@material-ui/core/Grid");
const MenuComponent_1 = require("./Web-Components/MenuComponent");
const SelectComponent_1 = require("./Web-Components/SelectComponent");
const SearchComponent_1 = require("./Web-Components/SearchComponent");
const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        padding: theme.spacing(1, 1),
        alignContent: "horizontal",
    },
    select: {
        "margin-left": "1px",
        "margin-right": "1px",
    },
    zoom: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    content: {
        "padding-top": "100px",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    swipeView: {
        "padding-top": "1px",
        "padding-bottom": "1px",
        "padding-left": "1px",
        "padding-right": "1px",
    }
}));
function ContentLayout(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleChangeIndex = (index) => {
        console.log(index);
        setValue(index);
    };
    return (React.createElement(Grid_1.default, { container: true, direction: "column", justify: "center" },
        React.createElement(Grid_1.default, { item: true },
            React.createElement(MenuComponent_1.default, null)),
        React.createElement(Grid_1.default, { item: true },
            React.createElement(SearchComponent_1.default, null)),
        React.createElement(Grid_1.default, { item: true },
            React.createElement(SelectComponent_1.default, null)),
        React.createElement(Grid_1.default, { item: true })));
}
exports.default = ContentLayout;
function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index } = props, other = __rest(props, ["children", "value", "index"]);
    return (React.createElement(Typography_1.default, { component: "div", role: "tabpanel", hidden: value !== index, id: `full-width-tabpanel-${index}`, "aria-labelledby": `full-width-tab-${index}` },
        React.createElement(Box_1.default, { className: classes.swipeView }, children)));
}
function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger_1.default({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    return (React.createElement(Zoom_1.default, { in: trigger },
        React.createElement("div", { onClick: handleClick, role: "presentation", className: classes.zoom }, children)));
}
