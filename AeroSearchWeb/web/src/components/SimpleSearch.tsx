import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import CityComponent from './UI-components/CityComponent';
import DateComponent from './UI-components/DateComponent';
import { Grid, Button, Fab, Checkbox } from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

const styles = () =>
  ({
    root: {
      alignContent: "horizontal",
    },
    align: {
      "align-items": "center"
    }
  });

interface ISimpleSearchProps{

}

interface ISimpleSearchState {
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
    }

    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleShowBackDate = this.handleShowBackDate.bind(this);
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
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={0} >
            <Grid item>
              <CityComponent name={"Откуда"} value={this.state.Origin} onNameChange={this.handleOriginChange} lang="ru"></CityComponent>
            </Grid>
            <Grid item>
              <Fab onClick={this.handleSwapOriginAndDistination} color="secondary" size="small" variant="round" className={classes.align}>
                <SyncAltIcon/>
              </Fab>
            </Grid>    
            <Grid item>
              <CityComponent name="Куда" value={this.state.Destination} onNameChange={this.handleDestinationChange} lang="ru"></CityComponent>
            </Grid> 
            <Grid item>
              <Checkbox checked={this.state.IsReturn} onChange={this.handleShowBackDate} value={this.state.IsReturn} color="secondary" />
            </Grid>             
            <Grid item>
              <DateComponent minDate={new Date()} onDateChange={this.handleDepartureChange} disable={false} name="Вылет"></DateComponent>
            </Grid>  
            <Grid item>
              <DateComponent minDate={this.state.From} onDateChange={this.handleArrivedChange} disable={!this.state.IsReturn} name="Обратно"></DateComponent>
            </Grid>        
            <Grid item>
              <Button color="secondary" variant="contained" >Поиск</Button>
            </Grid>
          </Grid>
        </Grid>      
      </Grid>
    );
  }
};

export default withStyles(styles)(SimpleSearch);