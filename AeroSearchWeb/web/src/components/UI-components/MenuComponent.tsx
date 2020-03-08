import * as React from 'react';
import { AppBar, Toolbar, IconButton, Tooltip, Typography, MenuItem, Button, Menu } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';

const styles = () =>
({
    typography: {
        flexGrow: 1
    }
});

interface IMenuComponent {

}

interface ICityComponentStyle {
    classes: any;
}

interface IMenuComponentState {
    anchorEl: any;
}
  

class MenuComponent extends React.Component<IMenuComponent & ICityComponentStyle, IMenuComponentState> {
    constructor(props: IMenuComponent & ICityComponentStyle)
    {
        super(props);  

        this.state = {
            anchorEl: null
        }
          
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(event: React.MouseEvent<HTMLButtonElement>){
        this.setState({anchorEl: event.currentTarget});
        // setAnchorEl(event.currentTarget);
    };

    // onSelect(event: object, value: any){
    //     this.props.onNameChange(value);
    // };

    handleClose(event: object){
        this.setState({anchorEl: null});

        // setAnchorEl(null);
    };

    render(){
        const {classes} = this.props;
        return (
            <AppBar position="static" color="primary">
                <Toolbar variant="dense" >
                    {/* Name application */}
                    <Typography variant="h6" className={classes.typography}>
                        AeroSearch
                    </Typography>
                    {/* Language */}
                    <Tooltip title="Language">
                        <Button variant="text" color="inherit" startIcon={<LanguageIcon/>} onClick={this.handleClick}>
                            Русский
                        </Button>
                    </Tooltip>
                    <Menu id="lock-menu" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose}>
                        <MenuItem value={'Русский'}>Русский</MenuItem>
                        <MenuItem value={'English'}>English</MenuItem>
                    </Menu>
                    {/* Login */}
                    <IconButton edge="end" color="inherit" /*aria-label="login" onClick={}*/ >
                        <Tooltip title="Login">
                            <AccountCircleIcon fontSize="inherit"/>
                        </Tooltip>
                    </IconButton>
                </Toolbar>
            </AppBar>   
        );
    }
};

export default withStyles(styles)(MenuComponent);

       