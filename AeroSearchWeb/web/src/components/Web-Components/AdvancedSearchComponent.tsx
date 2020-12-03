import * as React from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';

//JSON map 
const pathMap = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const styles = () =>
  ({
    grid: {
      alignContent: "horizontal",
      "padding-right": 40,
      "padding-left": 40,
      "align-items": "center",
    },
    slider: {
      "padding-right": 30,
      "padding-left": 30,
      "align-items": "center",
    }
  });

const marks = [
  {
    value: 0,
    label: '0 Km',
  },
  {
    value: 250,
    label: '250 Km',
  },
  {
    value: 500,
    label: '500 Km',
  },
  {
    value: 750,
    label: '750 Km',
  },
  {
    value: 1000,
    label: '1000 Km',
  },
];

interface IAdvancedSearchComponentProps {
  value: any;
  name: string;
  lang: string;
  onNameChange: any;
}

interface IAdvancedSearchComponentState {
  RadiusDep: number;
  RadiusArr: number;
}

interface IAdvancedSearchComponentStyle {
  classes: any;
}

class AdvancedSearchComponent extends React.Component<IAdvancedSearchComponentProps & IAdvancedSearchComponentStyle, IAdvancedSearchComponentState> {
  constructor(props: IAdvancedSearchComponentProps & IAdvancedSearchComponentStyle)
  {
    super(props);
    
    this.state = {
      RadiusDep: 10,
      RadiusArr: 10,
    }

    this.handleDistanceDepChange = this.handleDistanceDepChange.bind(this);
    this.handleDistanceArrChange = this.handleDistanceArrChange.bind(this);
  }

  handleDistanceDepChange(event: object, value: number) {
    this.setState({RadiusDep: value});
  };

  handleDistanceArrChange(event: object, value: number) {
    this.setState({RadiusArr: value});
  };

  // generateCircle(lon: number, lat: number, radius: number ) {
  //   if (!deg) return [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]];
  //   return new Array(361).fill(1).map((d, i) => {
  //     return [-180 + i, deg];
  //   });
  // }

  render(){
    const {classes} = this.props;
    return (
      <Grid container className={classes.grid} spacing={1}>
         {/*Departure*/}
        <Grid item xs={6}>
          <div className={classes.slider}>
            <Slider color="secondary" defaultValue={0} onChange={this.handleDistanceDepChange} aria-labelledby="discrete-slider-custom" min={10} max={1000} step={10} valueLabelDisplay="auto" marks={marks}/>
          </div>
        </Grid>
        {/*Arrive*/}
        <Grid item xs={6}>
          <div className={classes.slider}>
            <Slider color="secondary" defaultValue={0} onChange={this.handleDistanceArrChange} aria-labelledby="discrete-slider-custom" min={10} max={1000} step={10} valueLabelDisplay="auto" marks={marks}/>
          </div>
        </Grid>
        {/*Map*/}
        <Grid item xs={6}>
          <Grid container xs={12}>
            <Grid item xs={8}>
              <Paper>
                <ComposableMap 
                  projection="geoAzimuthalEqualArea"
                  projectionConfig={{
                    rotate: [-37, -55, 0],
                    scale: 2000
                  }}
                >
                  <Geographies geography={pathMap}>
                  {
                    ({ geographies }) =>
                    geographies.map(geo => (<Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF"/>))
                  }
                  </Geographies>
                  {/* <Line
                    coordinates={geoCircle().center([3.4,6.5]).radius(10)()}
                    stroke="#776865"
                    strokeWidth={1}
                  /> */}
                  <Marker coordinates={[37.618, 55.751]}>
                    <circle r={8} fill="#F53" />
                  </Marker>
                </ComposableMap>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              {/*City*/}
              <Paper>
                Departure Cities
              </Paper>
            </Grid>
          </Grid>
        </Grid>        
        {/*City*/}
        <Grid item xs={2}>
          Arrive Cities
        </Grid>
        {/*Map*/}
        <Grid item xs={4}>
          <Paper>
            <ComposableMap projection="geoAlbers">
              <Geographies geography={pathMap}>
              {
                ({ geographies }) =>
                geographies.map(geo => (<Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF"/>))
              }
              </Geographies>
              <Marker coordinates={[-74.006, 40.7128]}>
                <circle r={8} fill="#F53" />
              </Marker>
            </ComposableMap>
          </Paper>
        </Grid>                
      </Grid>
    );
  }
}

export default withStyles(styles)(AdvancedSearchComponent)
