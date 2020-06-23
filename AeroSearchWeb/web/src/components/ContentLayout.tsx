import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Box, Typography,  useScrollTrigger, Zoom,  Grid,   } from '@material-ui/core';
import MenuComponent from './Web-Components/MenuComponent';
import SelectBarComponent from './Web-Components/SelectComponent';
import SearchComponent from './Web-Components/SearchComponent';

const styles = () =>
  ({
    root: {
      flexGrow: 1,
    },
    swipeView:{
      //display: "flex",
    }
  });

interface IContentLayoutProps{

}

interface IContentLayoutState{
  typeSearch: number,
  typeType: number,
}

interface IContentLayoutStyle {
  classes: any;
}

class ContentLayout extends React.Component<IContentLayoutProps & IContentLayoutStyle, IContentLayoutState> {
  constructor(props: IContentLayoutProps & IContentLayoutStyle)
  {
    super(props);
    
    this.state = {
       typeSearch: 0,
       typeType: 0,
    }

    this.handleTypeSearchChange = this.handleTypeSearchChange.bind(this);
  };


  handleTypeSearchChange(value: number){
    this.setState({typeSearch: value});
  };

  return (
    <Grid container direction="column" justify="center">
      {/*Head menu*/}
      <Grid item>
        <MenuComponent></MenuComponent>
      </Grid>
      {/*Search bar */}
      <Grid item>
        <SearchComponent></SearchComponent>
      </Grid>
      {/*Select bar */}
      <Grid item>
        <SelectBarComponent></SelectBarComponent>
      </Grid>

      {/* Results */}
      <Grid item>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ContentLayout);

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
 // const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`}>
      <Box >{children}</Box>  
      {/* className={classes.swipeView} */}
    </Typography>
  );
}

interface ScrollTopProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: ScrollTopProps) {
  const { children, window } = props;
 // const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" >
      {/* className={classes.zoom} */}
        {children}
      </div>
    </Zoom>
  );
}
