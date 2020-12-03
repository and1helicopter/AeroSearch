import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';

const styles = () =>
  ({
    // textField: { 
    //   // '& .MuiInputBase-root': {
    //   //   color: "white"
    //   // }   
    // },
    autocomplete: {
      width: 300,
      marginLeft: 8,
      marginRight: 8,
    },
    slider: {
      "margin-left": 16,
      "margin-right": 16,
    },
    formControl: {
      width: "100%"
    },
    formHelperText:{
      // color: "white",
      paddingLeft: "5%",
      margin: 4
    }
  });

interface IParamsComponentProps {

}

interface IParamsComponentState {
  anchorElementMenu: any;
  isOpen: boolean;
  adult: number;
  child: number;
  infant: number;
  class: string;
}

interface IParamsComponentStyle {
  classes: any;
}

class ParamsComponent extends React.Component<IParamsComponentProps & IParamsComponentStyle, IParamsComponentState> {
  constructor(props: IParamsComponentProps & IParamsComponentStyle)
  {
    super(props);
    
    this.state = {
      isOpen: false,
      anchorElementMenu: null,
      adult: 1,
      child: 0,
      infant: 0,
      class: "Econom"
    }
    
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAdultChange = this.handleAdultChange.bind(this);
    this.handleChildChange = this.handleChildChange.bind(this);
    this.handleInfantChange = this.handleInfantChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
  }

  handleClick(event: React.MouseEvent<HTMLButtonElement>){
    this.setState({anchorElementMenu: event.currentTarget});
  };

  handleClose(){
    this.setState({anchorElementMenu: null});
  };

  handleAdultChange(event: string){
    if(event != undefined)
    {
      if(event == "-" && this.state.adult > 1)
      {
        let adult = this.state.adult - 1;
        this.setState({adult: adult});
      }
      if(event == "+" && this.state.adult + this.state.child + this.state.infant < 9)
      {
        let adult = this.state.adult + 1;
        this.setState({adult: adult});
      }
    }
  };

  handleChildChange(event: string){
    if(event != undefined)
    {
      if(event == "-" && this.state.child > 0)
      {
        let child = this.state.child - 1;
        this.setState({child: child});
      }
      if(event == "+" && this.state.adult + this.state.child + this.state.infant < 9)
      {
        let child = this.state.child + 1;
        this.setState({child: child});
      }
    }
  };

  handleInfantChange(event: string){
    if(event != undefined)
    {
      if(event == "-" && this.state.infant > 0)
      {
        let infant = this.state.infant - 1;
        this.setState({infant: infant});
      }
      if(event == "+" && this.state.adult + this.state.child + this.state.infant < 9)
      {
        let infant = this.state.infant + 1;
        this.setState({infant: infant});
      }
    }    
  };  

  handleClassChange(event: any){
    this.setState({class: event.target.value});
  }; 

  render(){
    const {classes} = this.props;
    return (
      <div>
        <Button color="secondary" onClick={this.handleClick}>
          {`Passenger ${this.state.adult + this.state.child + this.state.infant}: ${this.state.class}`}
        </Button>
        <Menu id="lock-menu" anchorEl={this.state.anchorElementMenu} keepMounted open={Boolean(this.state.anchorElementMenu)} onClose={this.handleClose}>
          <MenuItem button={false}>
            {`Adult:`} 
            <IconButton disabled={this.state.adult == 1} 
              onClick={() => this.handleAdultChange("-")} color="secondary">
              <Remove/>
            </IconButton>
            {this.state.adult}
            <IconButton disabled={this.state.adult + this.state.child + this.state.infant == 9}
              onClick={() => this.handleAdultChange("+")} color="secondary">
              <Add/>
            </IconButton>
          </MenuItem>
          <MenuItem button={false}>
            {`Child:`} 
            <IconButton disabled={this.state.child == 0} 
              onClick={() => this.handleChildChange("-")} color="secondary">
              <Remove/>
            </IconButton>
            {this.state.child}
            <IconButton disabled={this.state.adult + this.state.child + this.state.infant == 9}
              onClick={() => this.handleChildChange("+")} color="secondary">
              <Add/>
            </IconButton>
          </MenuItem>
          <MenuItem button={false}>
            {`Infant:`} 
            <IconButton disabled={this.state.infant == 0} 
              onClick={() => this.handleInfantChange("-")} color="secondary">
              <Remove/>
            </IconButton>
            {this.state.infant}
            <IconButton disabled={this.state.adult + this.state.child + this.state.infant == 9}
              onClick={() => this.handleInfantChange("+")} color="secondary">
              <Add/>
            </IconButton>
          </MenuItem>
          <Divider/>
          <MenuItem button={false}>
            <RadioGroup value={this.state.class} onChange={this.handleClassChange} defaultValue="Econom">
              <FormControlLabel value="Econom" control={<Radio color="secondary" />} label="Econom" labelPlacement="start"/>
              <FormControlLabel value="Business" control={<Radio color="secondary" />} label="Business" labelPlacement="start"/>
            </RadioGroup>
          </MenuItem>
          <Divider/>
          <MenuItem button={false}>
            <Button color="secondary" onClick={this.handleClose}>Ok</Button>
          </MenuItem>
        </Menu >
      </div>
    );
  }
}

export default withStyles(styles)(ParamsComponent)