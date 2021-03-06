import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import withStyles from '@material-ui/core/styles/withStyles';

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

interface ICityComponentProps {
  value: any;
  name: string;
  lang: string;
  onNameChange: any;
}

interface ICityComponentState {
  value: string;
  autocompleteData: any;
}

interface ICityComponentStyle {
  classes: any;
}

interface IPlace{
  name: string;
  code: string;
}

const axios = require('axios').default;

class CityComponent extends React.Component<ICityComponentProps & ICityComponentStyle, ICityComponentState> {
  constructor(props: ICityComponentProps & ICityComponentStyle)
  {
    super(props);
    
    this.state = {
      value: '',
      autocompleteData: []
    }
    
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
  }

  retrieveDataAsynchronously(searchText: string){
    axios.get(`http://autocomplete.travelpayouts.com/places2?term=${searchText}&locale=${this.props.lang}`)
      .then((response: any) => {
        let autocompleteDataTemp = response.data.map((item: any) => {return  {code: item.code, name:item.name}});
        this.setState({autocompleteData: autocompleteDataTemp});
      });
  };

  onChange(e: any){
    this.setState({value: e.target.value});
    this.retrieveDataAsynchronously(e.target.value);
  };

  onSelect(event: object, value: any){
    this.props.onNameChange(value);
  };

  render(){
    const {classes} = this.props;
    return (
      <Autocomplete
        className = {classes.autocomplete}
        options={this.state.autocompleteData}
        getOptionLabel={(option) => `${option.code} - ${option.name}` }
        disableOpenOnFocus={true}
        value={this.props.value}
        freeSolo
        onChange={this.onSelect}
        renderInput={(params: any) => (
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              {...params} 
              className={classes.textField}
              value={this.props.value}
              variant="standard" 
              color="secondary"
              margin="none"  
              fullWidth 
              onChange = {this.onChange}
            />
            <FormHelperText className={classes.formHelperText}>{this.props.name}</FormHelperText>
          </FormControl>
        )}
      />
    );
  }
}

export default withStyles(styles)(CityComponent)