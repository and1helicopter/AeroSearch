import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = () =>
({
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

interface ISelectComponent {

}

interface ISelectComponentStyle {
    classes: any;
}

interface ISelectComponentState {
    visable: boolean;
    routes: Array<Route>;
    
}

class Route{
    from: string; 
    to: string;
    fromDate: string;
    toDate: string;
    roundTrip: boolean;

    constructor(from:string, to:string, fromDate:string, toDate:string, roundTrip:boolean) { 
        this.from = from,
        this.to = to,
        this.fromDate = fromDate,
        this.toDate = toDate,
        this.roundTrip = roundTrip
    }  
} 
  

class SelectBarComponent extends React.Component<ISelectComponent & ISelectComponentStyle, ISelectComponentState> {
    constructor(props: ISelectComponent & ISelectComponentStyle)
    {
        super(props);  

        this.state = {
            visable: true,
            routes: new Array(),
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    };

    handleAdd(){       
        var routes = this.state.routes;
        var rand = Math.random().toString(36).substring(2, 5).toUpperCase();
        routes.push(new Route("MOW", rand, "10.06.2020", "12.07.2020", false));
        this.setState({routes: routes});

        if(this.state.routes.length >= 6)
            this.setState({visable: false});
    }

    handleRemove(value: Route){
        var routes = this.state.routes;
        var index = routes.indexOf(value);
        if(index != -1){
            routes.splice(index, 1);
            this.setState({routes: routes});
    
            if(this.state.routes.length < 6)
                this.setState({visable: true});
        }
    }

    handleSelect(){

    }

    render(){
        const {classes} = this.props;
        return (
            <AppBar className={classes.bar} position="static" color="inherit" >
                {/* Все маршруты */}   
                {this.state.routes.map(value =>                 
                    <Card className={classes.card} elevation={5}>
                        <CardActionArea className={classes.add} onClick={this.handleSelect} >
                            <CardHeader className={classes.route} 
                                avatar={
                                    value.roundTrip ? <UnfoldMoreIcon color="primary"/> : <KeyboardArrowDownIcon color="primary"/>
                                }
                                action={
                                    <IconButton aria-label="close" onClick={() => this.handleRemove(value)}>
                                        <CloseIcon color="secondary"/>
                                    </IconButton>  
                                }
                                title={value.from + " - " + value.to}
                                subheader={value.fromDate + "   " + value.toDate}>                   
                            </CardHeader > 
                        </CardActionArea>                   
                    </Card >)
                }           
                {/* Добавить поиск */}
                <Card hidden={!this.state.visable} className={classes.card} elevation={5}>
                    <CardActionArea className={classes.add} onClick={this.handleAdd}>
                        <CardContent className={classes.add_content}>
                            <AddIcon/>
                            <br/>
                            <Typography variant="h6">{"Add"}</Typography>
                        </CardContent>
                    </CardActionArea>                    
                </Card >
            </AppBar>
        );
    }
};

export default withStyles(styles)(SelectBarComponent);

       
