import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface FilmOptionType {
    title: string;
    year: number;
}

interface ICityComponentProps {
  name: string;
  lang: string;
}

interface ICityComponentState {
  value: string;
  autocompleteData: any;
}

export default class CityComponent extends React.Component<ICityComponentProps, ICityComponentState>{
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
    let _this = this;

    // Url of your website that process the data and returns a
    let url = `http://autocomplete.travelpayouts.com/places2?term=${searchText}&locale=${this.props.lang}`;
    
    // Configure a basic AJAX request to your server side API
    // that returns the data according to the sent text
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
        let status = xhr.status;

        if (status == 200) {
            // In this example we expects from the server data with the structure of:
            // [
            //    {
            //        label: "Some Text",
            //        value: 1,
            //    },
            //    {
            //        label: "Some Other Text",
            //        value: 1,
            //    },
            // ]
            // But you can obviously change the render data :)

            // Update the state with the remote data and that's it !
            _this.setState({
                autocompleteData: xhr.response
            });

            // Show response of your server in the console
            console.log(xhr.response);
        } else {
            console.error("Cannot load data from remote source");
        }
    };

    xhr.send();
  }

  onChange(e: any){
    this.setState({
        value: e.target.value
    });

    /**
     * Handle the remote request with the current text !
     */
    this.retrieveDataAsynchronously(e.target.value);

    console.log("The Input Text has changed to ", e.target.value);
}

  render(){
    return (
      <Autocomplete
        options={this.state.autocompleteData}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params: any) => (
          <TextField {...params} label={this.props.name} variant="standard" fullWidth onChange = {this.onChange}/>
        )}
      />
    );
  }
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 }
]