import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CityComponent from './CityComponent';
import DateComponent from './DateComponent';
import { Grid, Button, Fab, Checkbox } from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 1),
      alignContent: "horizontal",
    },
    align: {
      "align-items": "center"
    }
  }),
);

export default function SimpleSearch() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={0} >
          <Grid item>
            <CityComponent name="Откуда" lang="ru"></CityComponent>
          </Grid>
          <Grid item>
            <Fab color="secondary" size="small" variant="round" className={classes.align}>
              <SyncAltIcon />
            </Fab>
          </Grid>    
          <Grid item>
            <CityComponent name="Куда" lang="ru"></CityComponent>
          </Grid> 
          <Grid item>
            <Checkbox checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" color="secondary" />
          </Grid>             
          <Grid item>
            <DateComponent name="Вылет"></DateComponent>
          </Grid>          
          <Grid item>
            <DateComponent  name="Обратно"></DateComponent>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained" >Поиск</Button>
          </Grid>
        </Grid>
      </Grid>      
    </Grid>
  );
}