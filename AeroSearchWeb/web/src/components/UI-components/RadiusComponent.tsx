import * as React from 'react';
import {Switch, Slider, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () =>
  ({
    grid: {
      margin: 10,
      "align-items": "center",
      "margin-right": "35px",
      "margin-left": "35px"
    }
  });

interface IRadiusComponentProps {
  oneCity: boolean;  
  radius: number;
  cities: any;
}

interface IRadiusComponentStyle {
  classes: any;
}

interface IRadiusComponentState {
    value: number;
    autocompleteData: any;
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
      value: 0,
      autocompleteData: []
    }
    
    this.valueLabelFormat = this.valueLabelFormat.bind(this);
    this.onChange = this.onChange.bind(this);

    this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
  }

  retrieveDataAsynchronously(searchText: string){
    axios.get(`http://autocomplete.travelpayouts.com/places2?term=${searchText}&locale=${this.props}`)
      .then((response: any) => {
        let autocompleteDataTemp = response.data.map((item: any) => {return  {code: item.code, name:item.name}});
        this.setState({autocompleteData: autocompleteDataTemp});
      });
  };

  onChange(event: any, newValue: number){
    this.setState({value: newValue});
    console.log(newValue)
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
          <List dense>
                {[0, 1].map((value) => {
                  return (
                    <ListItem key={value} button>
                      <ListItemText primary={`Line item ${value + 1}`}/>
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
        </div>
    );
  }
}

export default withStyles(styles)(RadiusComponent)