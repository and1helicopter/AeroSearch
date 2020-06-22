import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CityComponent from '../UI-Components/CityComponent';
import DateComponent from '../UI-Components/DateComponent';
import ParamsComponent from '../UI-components/ParamsComponent';
import RadiusComponent from '../UI-Components/RadiusComponent';
import { Grid, Button, Checkbox, AppBar, Collapse, IconButton } from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { string } from 'prop-types';

const styles = () =>
  ({
    grid: {
      alignContent: "horizontal",
      margin: 10,
      "align-items": "center",
    },
    align: {
      "align-items": "center"
    }
  });

interface ISimpleSearchProps{

}

interface ISimpleSearchState {
  IsAdvanced: boolean; 
  IsReturn: boolean;
  Origin: any;
  Destination: any;
  From: Date | null;
  To: Date | null;
}

interface ISimpleSearchStyle {
  classes: any;
}

class Search_RQ
{
  know_english: boolean;
  currency: string;
  passengers: Search_Passengers;
  segments: Array<Search_Segment>;
}

class Search_Passengers
{
  adults: number;
  children: number;
  infants: number;
}

class Search_Segment
{
  date: string | undefined; 
  origin: string; 
  destination: string; 
}


class SimpleSearch extends React.Component<ISimpleSearchProps & ISimpleSearchStyle, ISimpleSearchState> {
  constructor(props: ISimpleSearchProps & ISimpleSearchStyle)
  {
    super(props);
    
    this.state = {
      IsReturn: true,
      Origin: null,
      Destination: null,
      From: new Date(),
      To: new Date(),
      IsAdvanced: false
    }

    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleShowBackDate = this.handleShowBackDate.bind(this);
    this.handleShowAdvanced = this.handleShowAdvanced.bind(this);
    this.handleSwapOriginAndDistination = this.handleSwapOriginAndDistination.bind(this);
    this.handleDepartureChange = this.handleDepartureChange.bind(this);
    this.handleArrivedChange = this.handleArrivedChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  };

  handleShowBackDate(){
      this.setState({IsReturn: !this.state.IsReturn});
  };

  handleOriginChange(name: any) {
    this.setState({Origin: name});
  };

  handleDestinationChange(name: any) {
    this.setState({Destination: name});
  };

  handleShowAdvanced() {
    this.setState({IsAdvanced: !this.state.IsAdvanced});
  };

  handleSwapOriginAndDistination(){
    let oldOrigin = this.state.Origin;
    let oldDistiantion = this.state.Destination;

    this.setState({Origin: oldDistiantion});
    this.setState({Destination: oldOrigin});
  }

  handleDepartureChange(date: Date | null){
    this.setState({From: date});
  }

  handleArrivedChange(date: Date | null){
    this.setState({To: date});    
  }

  handleSearch(){
    //Запрос на локальный сервер обработки запросов
    let url = `https://www.aviasales.com/adaptors/chains/rt_search_native_format`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onload = () => {
        console.log(xhr.response);
        if (xhr.status == 200) {
          let autocompleteDataTemp = xhr.response;
          console.log(autocompleteDataTemp);
        }
    };

    //Формирование запросов
    let request = new Search_RQ();
    request.know_english = true;
    request.currency = "rub"; //Нужно из меню использовать
    let passengers = new Search_Passengers();
    passengers.adults = 1;
    passengers.children = 0;
    passengers.infants = 0;
    request.passengers = passengers;
    let segments = new Search_Segment();

    let month = '' + this.state.From?.getMonth();
    let day = '' + this.state.From?.getDate();
    let year = this.state.From?.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    let dateString = [year, month, day].join('-');

    segments.date = dateString;
    segments.origin = this.state.Origin.code;
    segments.destination = this.state.Destination.code;
    request.segments = new Array<Search_Segment>(segments);

    console.log(request);
    //Включить загрузку 
    //Отправляем на локальный сервер
    xhr.send(JSON.stringify(request));
  }

  render(){
    const {classes} = this.props;
    return (
      <AppBar position="static" color="inherit" >
        <Grid container className={classes.grid} spacing={0}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={0} >
              {/*Departure*/}
              <Grid item>
                <CityComponent name={"Откуда"} value={this.state.Origin} onNameChange={this.handleOriginChange} lang="ru"></CityComponent>
              </Grid>
              {/*Switcher*/}                  
              <Grid item>
                <IconButton onClick={this.handleSwapOriginAndDistination} color="secondary">
                  <SyncAltIcon/>
                </IconButton>
                {/* <Fab  className={classes.align}>
                </Fab> */}
              </Grid>
              {/*Destination*/}                  
              <Grid item>
                <CityComponent name="Куда" value={this.state.Destination} onNameChange={this.handleDestinationChange} lang="ru"></CityComponent>
              </Grid>
              {/*IsReturn*/}            
              <Grid item>
                <Checkbox checked={this.state.IsReturn} onChange={this.handleShowBackDate} value={this.state.IsReturn} color="secondary" />
              </Grid> 
              {/*Departure date*/}            
              <Grid item>
                <DateComponent minDate={new Date()} onDateChange={this.handleDepartureChange} disable={false} name="Вылет"></DateComponent>
              </Grid> 
              {/*Arrived date*/}           
              <Grid item>
                <DateComponent minDate={this.state.From} onDateChange={this.handleArrivedChange} disable={!this.state.IsReturn} name="Обратно"></DateComponent>
              </Grid>
              {/*Search param*/}            
              <Grid item>
                <ParamsComponent></ParamsComponent>
              </Grid>
              {/*Show advanced search*/}            
              <Grid item>
                <Checkbox checked={this.state.IsAdvanced} onChange={this.handleShowAdvanced} value={this.state.IsAdvanced} color="secondary" />
              </Grid>         
            </Grid>
          </Grid>
        </Grid>
        {/*Advanced search*/}
        <Collapse in={this.state.IsAdvanced} >           
          {this.state.IsAdvanced ? 
            <Grid item xs={12} >              
              <Grid container justify="center" spacing={0} >
                <Grid item xs={4}>
                  <RadiusComponent radius={0} oneCity={true} cities={new Array(this.state.Origin)}></RadiusComponent>
                </Grid>
                <Grid item xs={4}> Прилет </Grid>
                <Grid item xs={4}> Карта </Grid>
              </Grid>
            </Grid> : null
          }
        </Collapse>       
        {/*Search button*/}   
        <Grid container className={classes.grid} spacing={0}>
          <Grid item xs={8}></Grid>       
          <Grid item xs={4}>
            <Grid container justify="center" spacing={0} >
              <Grid item>
                <Button onClick={this.handleSearch} color="secondary" variant="contained">Поиск</Button>
              </Grid>    </Grid>
          </Grid> 
        </Grid>
      </AppBar>
  
    );
  }
};

export default withStyles(styles)(SimpleSearch);