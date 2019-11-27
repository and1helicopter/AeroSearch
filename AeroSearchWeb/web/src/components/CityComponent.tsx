import * as React from 'react';
import {TextField, FormControl, FormHelperText } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    textField: { 
      color: "#fff"   
    },
    "label.MuiFormLabel-root":{
      color: "#fff"
    }
  });

interface ICityComponentProps {
  name: string;
  lang: string;
}

interface ICityComponentState {
  value: string;
  autocompleteData: any;
}

class CityComponent extends React.Component<ICityComponentProps & any, ICityComponentState> {
  constructor(props: ICityComponentProps)
  {
    super(props);
    
    this.state = {
      value: '',
      autocompleteData: []
    }
    
    this.onChange = this.onChange.bind(this);
    this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
  }

  retrieveDataAsynchronously(searchText: string){
    let url = `http://autocomplete.travelpayouts.com/places2?term=${searchText}&locale=${this.props.lang}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.status == 200) {
          this.setState({
            autocompleteData: xhr.response
          });

          console.log(this.state.autocompleteData);
        } 
    };

    xhr.send();
  }

  onChange(e: any){
    this.setState({
        value: e.target.value
    });

    this.retrieveDataAsynchronously(e.target.value);
  }

  render(){
    return (
      <Autocomplete
        options={this.state.autocompleteData}
        getOptionLabel={(option) => `${option.code} - ${option.name}` }
        style={{ width: 300 }}
        disableOpenOnFocus={true}
        renderInput={(params: any) => (
          <FormControl fullWidth style={{width: "100%"}}>
            <TextField
              {...params} 
              style={{
                color: "#fff" 
              }}  
              variant="standard" 
              color="secondary"
              margin="none"  
              fullWidth 
              onChange = {this.onChange}
            />
            <FormHelperText style={{color: "#fff", paddingLeft: "15%"}}>{this.props.name}</FormHelperText>
          </FormControl>
        )}
      />
    );
  }
}

export default withStyles(styles)(CityComponent)