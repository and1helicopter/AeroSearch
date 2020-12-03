import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () =>
  ({
    grid: {
      margin: 10,
      "align-items": "center",
      "margin-right": "35px",
      "margin-left": "35px"
    },
    paper: {
      width: "100%",
      "max-height": 230,
      overflow: 'auto'
    },
  });

interface IRadiusComponentProps {
  city: any;
  cities: any;
}

interface IRadiusComponentStyle {
  classes: any;
}

interface IRadiusComponentState {
  oneCity: boolean;  
  value: number;
  radius: number;  
  autocompleteData: Array<City>;
}

class City{
  code: string; 
  latitude: number;
  longitude: number;

  constructor(code:string, latitude:number, longitude:number) { 
      this.code = code,
      this.latitude = latitude,
      this.latitude = longitude
  }  
} 

const axios = require('axios').default;

const marks = [
    {
      value: 0,
      label: '0 KM',
    },
    {
      value: 500,
      label: '500 KM',
    },
    {
      value: 1000,
      label: '1000 KM',
    },
  ];

class RadiusComponent extends React.Component<IRadiusComponentProps & IRadiusComponentStyle, IRadiusComponentState> {
  constructor(props: IRadiusComponentProps & IRadiusComponentStyle)
  {
    super(props);
    
    this.state = {
      oneCity: false,
      value: 0,     
      radius: 0,
      autocompleteData: new Array()
    }
    
    this.valueLabelFormat = this.valueLabelFormat.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event: any, newValue: number){
    axios.post(`http://localhost:44360/api/Radius/City?IATA=${this.props.city.code}&Radius=${newValue}`)
      .then((response: any) => {
        console.log(response)

        let autocompleteDataTemp = response.data.map((item: any) => new City(item.code, item.position.latitude, item.position.longitude));   

        this.setState({autocompleteData: autocompleteDataTemp});
      });

    //search cities
    
  };

  valueLabelFormat(value: number) {
    return `${value}`;
  };

  render(){
    const {classes} = this.props;
    return (
        <div className={classes.grid}>
          <div>
            <Switch>Many cities</Switch>
            <Slider   
                defaultValue={0}
                min={0}
                max={1000}   
                step={10}         
                getAriaValueText={this.valueLabelFormat}
                valueLabelFormat={this.valueLabelFormat}
                valueLabelDisplay="auto"
                onChange={this.onChange}
                marks={marks}
                />
          </div>
          <Paper className={classes.paper}>
            <List dense>
                {this.state.autocompleteData.map((value) => {
                  return (
                    <ListItem key={value.code} button>
                      <ListItemText primary={`${value.code}`}/>
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          // onChange={handleToggle(value)}
                          // checked={checked.indexOf(value) !== -1}
                          // inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>)})}
            </List>
          </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(RadiusComponent)