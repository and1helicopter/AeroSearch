import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CityComponent from '../UI-Components/CityComponent';
import DateComponent from '../UI-Components/DateComponent';
import { Grid, Button, Fab, Checkbox, AppBar, Collapse } from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

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
                <Fab onClick={this.handleSwapOriginAndDistination} color="secondary" size="small" variant="round" className={classes.align}>
                  <SyncAltIcon/>
                </Fab>
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
              <Grid container justify="center" spacing={0} >Сложный поиск</Grid>
            </Grid> : null
          }
        </Collapse>       
        {/*Search button*/}   
        <Grid container className={classes.grid} spacing={0}>
          <Grid item xs={8}></Grid>       
          <Grid item xs={4}>
            <Grid container justify="center" spacing={0} >
              <Grid item>
                <Button color="secondary" variant="contained">Поиск</Button>
              </Grid>    </Grid>
          </Grid> 
        </Grid>
      </AppBar>
  
    );
  }
};

export default withStyles(styles)(SimpleSearch);