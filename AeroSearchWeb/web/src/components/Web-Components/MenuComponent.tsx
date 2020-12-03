import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Language from '@material-ui/icons/Language';
import AttachMoney from '@material-ui/icons/AttachMoney';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import withStyles from '@material-ui/core/styles/withStyles';

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
    anchorElementLang: any;
    anchorElementCurrency: any;
    language: string;
    currency: string;
}
  

class MenuComponent extends React.Component<IMenuComponent & ICityComponentStyle, IMenuComponentState> {
    constructor(props: IMenuComponent & ICityComponentStyle)
    {
        super(props);  

        this.state = {
            anchorElementLang: null,
            anchorElementCurrency: null,
            language: "Русский", /*Устанавдиваем по-умолчанию из props*/
            currency: "RUB", /*Устанавдиваем по-умолчанию из props*/
        }
          
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
        this.handleChengeLanguageClick = this.handleChengeLanguageClick.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.handleChengeCurrencyClick = this.handleChengeCurrencyClick.bind(this);
    };

    handleChangeLanguage(event: React.MouseEvent<HTMLButtonElement>){
        this.setState({anchorElementLang: event.currentTarget});
        // setAnchorEl(event.currentTarget);
    };

    handleChangeCurrency(event: React.MouseEvent<HTMLButtonElement>){
        this.setState({anchorElementCurrency: event.currentTarget});
        // setAnchorEl(event.currentTarget);
    };
    // onSelect(event: object, value: any){
    //     this.props.onNameChange(value);
    // };

    handleClose(event: object){
        this.setState({anchorElementLang: null});
        this.setState({anchorElementCurrency: null});
    };

    handleChengeLanguageClick(event: any)
    {  
        this.setState({language: event.target.textContent});
        this.setState({anchorElementLang: null});
    }

    handleChengeCurrencyClick(event: any)
    {  
        this.setState({currency: event.target.textContent});
        this.setState({anchorElementCurrency: null});
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
                    {/* Currency */}
                    <Tooltip title="Currency">
                    <Button variant="text" color="inherit" onClick={this.handleChangeCurrency}
                        startIcon={this.state.currency == 'USD' ? <AttachMoney/> : this.state.currency == 'EUR' ? <EuroSymbol/> : null } 
                    >
                        {this.state.currency}
                    </Button>
                    </Tooltip>
                    <Menu id="lock-menu" anchorEl={this.state.anchorElementCurrency} keepMounted open={Boolean(this.state.anchorElementCurrency)} onClose={this.handleClose}>
                        {/*Нужнео подавать список доступных валют */}
                        <MenuItem value={'RUB'} onClick={this.handleChengeCurrencyClick}>RUB</MenuItem>
                        <MenuItem value={'USD'} onClick={this.handleChengeCurrencyClick}>USD</MenuItem>
                        <MenuItem value={'EUR'} onClick={this.handleChengeCurrencyClick}>EUR</MenuItem>
                    </Menu>
                    {/* Language */}
                    <Tooltip title="Language">
                        <Button variant="text" color="inherit" startIcon={<Language/>} onClick={this.handleChangeLanguage}>
                            {this.state.language}
                        </Button>
                    </Tooltip>
                    <Menu id="lock-menu" anchorEl={this.state.anchorElementLang} keepMounted open={Boolean(this.state.anchorElementLang)} onClose={this.handleClose}>
                        {/*Нужнео подавать список доступных языков */}
                        <MenuItem value={'Русский'} onClick={this.handleChengeLanguageClick}>Русский</MenuItem>
                        <MenuItem value={'English'} onClick={this.handleChengeLanguageClick}>English</MenuItem>
                    </Menu>
                    {/* Login */}
                    <IconButton edge="end" color="inherit" /*aria-label="login" onClick={}*/ >
                        <Tooltip title="Login">
                            <AccountCircle fontSize="inherit"/>
                        </Tooltip>
                    </IconButton>
                </Toolbar>
            </AppBar>   
        );
    }
};

export default withStyles(styles)(MenuComponent);

       