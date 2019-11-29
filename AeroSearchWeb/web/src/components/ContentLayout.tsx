import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import SimpleSearch from './Search-components/SimpleSearch';
import MainToolbar from './Search-components/MainToolbar';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Container, Box, Typography, AppBar, Fab, useScrollTrigger, Zoom,  MenuItem, Select  } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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

  render(){
    return (
      <div>
        <AppBar position="fixed" color="primary">
          <MainToolbar onTypeSearchChange={this.handleTypeSearchChange} onTypePassagerChange={null} onTypeTypeChange={null}></MainToolbar> 
          <SwipeableViews index={this.state.typeSearch}>
            <TabPanel value={this.state.typeSearch} index={0}>
              <SimpleSearch></SimpleSearch>
            </TabPanel>
                <TabPanel value={this.state.typeSearch} index={1}>
                <SimpleSearch></SimpleSearch>
                </TabPanel>
                <TabPanel value={this.state.typeSearch} index={2}>
                <SimpleSearch></SimpleSearch>
                </TabPanel>
          </SwipeableViews>
        </AppBar>
  
        <Toolbar id="back-to-top-anchor" />
        <Container> 
          <Box my={2}>
            {[...new Array(122)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </Box>
        </Container>
        <ScrollTop {...this.props}>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
    );
  }
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