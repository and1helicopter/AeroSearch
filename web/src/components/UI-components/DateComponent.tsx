import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


const styles = () =>
  ({
    keyboardDatePickerOn: { 
      width: 300,
      marginLeft: 8,
      marginRight: 8,
      // '& .MuiInputBase-root': {
      //   color: "#ffffff"
      // }   
    },
    keyboardDatePickerOff: { 
      width: 300,
      marginLeft: 8,
      marginRight: 8,
      '& .MuiInputBase-root': {
        color: "#1e5abd"
      }   
    },
    formHelperText:{
      // color: "white",
      paddingLeft: "5%",
      margin: 4,
    }
  });

interface IDateComponentProps {
  name: string;
  disable: boolean;
  onDateChange: any;
  minDate: Date | null;
}

interface IDateComponentState {
  date: Date | null;
}

interface IDateComponentStyle {
  classes: any;
}

class DateComponent extends React.Component<IDateComponentProps & IDateComponentStyle, IDateComponentState> {
  constructor(props: IDateComponentProps & IDateComponentStyle)
  {
    super(props);
    
    this.state = {
      date: new Date(),
    }
    
    this.handleDateChange = this.handleDateChange.bind(this);

  };

  handleDateChange(newDate: Date | null){
    this.setState({date: newDate});
    this.props.onDateChange(newDate)
  };

  render(){
    const {classes} = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
        <FormControl fullWidth className={classes.formControl}>
          <KeyboardDatePicker
              className={!this.props.disable ? classes.keyboardDatePickerOn : classes.keyboardDatePickerOff}
              disabled={this.props.disable}
              disableToolbar
              disablePast
              minDate ={this.props.minDate}
              color="secondary"
              variant="inline"
              format="dd-MM-yyyy"
              margin="none"
              id="date-picker-inline"            
              value={this.state.date}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <FormHelperText className={classes.formHelperText}>{this.props.name}</FormHelperText>
          </FormControl>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
};

export default withStyles(styles)(DateComponent)