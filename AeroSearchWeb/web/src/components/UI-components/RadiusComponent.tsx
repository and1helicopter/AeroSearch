import * as React from 'react';
import {Switch, Slider  } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
    formControl: {
      width: "100%"
    },
    formHelperText:{
      // color: "white",
      paddingLeft: "5%",
      margin: 4
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
        <div>
            <Switch>Many cities</Switch>
            <Slider   
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
    );
  }
}

export default withStyles(styles)(RadiusComponent)