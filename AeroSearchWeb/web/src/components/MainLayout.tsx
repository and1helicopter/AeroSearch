import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      backgroundColor: "#2196f3"
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    formControl:{
      position: "absolute",
      right: "2%",
      minWidth: 120
    },
    select: {
      color: "white",
      flexGrow: 1,      
    },
}));

export default function MainLayout() {
  const classes = useStyles();
  const [lang, setLang] = React.useState('');

  const langChange = (event: any) => {
    setLang(event.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.app} position="static">
        <Toolbar>
          <FormControl className={classes.formControl} >
            <Select className={classes.select} onChange={langChange} defaultValue={'Русский'} variant="standard">
              <MenuItem value={'Русский'}>Русский</MenuItem>
              <MenuItem value={'English'}>English</MenuItem>
            </Select>
            {/* <FormHelperText className={classes.select}>Язык/Language</FormHelperText> */}
          </FormControl>
        </Toolbar>
      </AppBar>
    </div>
  );
}