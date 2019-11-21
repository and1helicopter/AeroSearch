import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CityComponent from './CityComponent';
import DateComponent from './DateComponent';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      alignContent: "horizontal",
    },
  }),
);

export default function SimpleSearch() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={0} >
          <Grid item>
            <CityComponent name="Откуда" lang="ru"></CityComponent>
          </Grid>
          <Grid item>
            <CityComponent name="Куда" lang="ru"></CityComponent>
          </Grid>          
          <Grid item>
            <DateComponent name="Вылет"></DateComponent>
          </Grid>          
          <Grid item>
            <DateComponent  name="Обратно"></DateComponent>
          </Grid>
        </Grid>
      </Grid>      
    </Grid>
  );
}