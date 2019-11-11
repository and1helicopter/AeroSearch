import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CityComponent from './CityComponent';
import DateComponent from './DateComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      alignContent: "horizontal"
    },
  }),
);

export default function SimpleSearch() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <CityComponent></CityComponent>
      <CityComponent></CityComponent>
      <DateComponent></DateComponent>
      <DateComponent></DateComponent>
    </Paper>
  );
}