import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Select, MenuItem } from '@material-ui/core';

const styles = () =>
  ({
    root: {
      alignContent: "horizontal",
    },
    align: {
      "align-items": "center"
    }
  });

interface IMainToolbarProps{
    onTypeSearchChange: any;
    onTypeTypeChange: any;
    onTypePassagerChange: any;
}

interface IMainToolbarState {
    typeSearch: number;
    typeType: number;
}

interface IMainToolbarStyle {
  classes: any;
}

class MainToolbar extends React.Component<IMainToolbarProps & IMainToolbarStyle, IMainToolbarState> {
  constructor(props: IMainToolbarProps & IMainToolbarStyle)
  {
    super(props);
    
    this.state = {
       typeSearch: 0,
       typeType: 0,
    }

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event: React.ChangeEvent<{name?: string | undefined;  value: unknown;}>){
    let value = event.target.value as number;
    this.setState({typeSearch: value});
    this.props.onTypeSearchChange(value);
  };

  render(){
    const {classes} = this.props;
    return (
      <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={0} >
          <Grid item>
            <Select className={classes.select} value={this.state.typeSearch} defaultValue={0} onChange={this.handleChange}>
                <MenuItem value={0}>Простой поиск</MenuItem>
                <MenuItem value={1}>Сложный поиск</MenuItem>
                <MenuItem value={2}>Составной маршрут</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Select className={classes.select} value={this.state.typeSearch} defaultValue={0}>
                <MenuItem value={0}>Эконом</MenuItem>
                <MenuItem value={1}>Комфорт</MenuItem>
                <MenuItem value={2}>Бизнес</MenuItem>
                <MenuItem value={3}>Первый класс</MenuItem>
            </Select>
          </Grid>    
          <Grid item>
          {/* <Select 
                className={classes.select}
                value={value}
                defaultValue={0}
                onChange={handleChange}            
            >
                <MenuItem value={0}>Простой поиск</MenuItem>
                <MenuItem value={1}>Сложный поиск</MenuItem>
                <MenuItem value={2}>Составной маршрут</MenuItem>
            </Select>           */}
           </Grid>
        </Grid>
      </Grid>      
    </Grid>
    );
  }
};

export default withStyles(styles)(MainToolbar);