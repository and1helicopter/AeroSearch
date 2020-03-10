import * as React from 'react';
import { AppBar, Toolbar, IconButton, Tooltip, Typography, MenuItem, Button, Menu } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';
import { object } from 'prop-types';

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
    anchorElement: any;
    language: string;
}
  

class MenuComponent extends React.Component<IMenuComponent & ICityComponentStyle, IMenuComponentState> {
    constructor(props: IMenuComponent & ICityComponentStyle)
    {
        super(props);  

        this.state = {
            anchorElement: null,
            language: "Русский" /*Устанавдиваем по-умолчанию из props*/
        }
          
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChengeLanguage = this.handleChengeLanguage.bind(this);

    };

    handleClick(event: React.MouseEvent<HTMLButtonElement>){
        this.setState({anchorElement: event.currentTarget});
        // setAnchorEl(event.currentTarget);
    };

    // onSelect(event: object, value: any){
    //     this.props.onNameChange(value);
    // };

    handleClose(event: object){
        this.setState({anchorElement: null});

        // setAnchorEl(null);
    };

    handleChengeLanguage(event: any)
    {  
        this.setState({language: event.target.textContent});
        this.setState({anchorElement: null});
    }

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
                            {this.state.language}
                        </Button>
                    </Tooltip>
                    <Menu id="lock-menu" anchorEl={this.state.anchorElement} keepMounted open={Boolean(this.state.anchorElement)} onClose={this.handleClose}>
                        {/*Нужнео подавать список доступных языков */}
                        <MenuItem value={'Русский'} onClick={this.handleChengeLanguage}>Русский</MenuItem>
                        <MenuItem value={'English'} onClick={this.handleChengeLanguage}>English</MenuItem>
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

       