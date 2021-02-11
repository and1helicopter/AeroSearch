import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
//import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import Grid from '@material-ui/core/Grid';
import MenuComponent from './Web-Components/MenuComponent';
import SelectBarComponent from './Web-Components/SelectComponent';
import SearchComponent from './Web-Components/SearchComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar:{
      padding: theme.spacing(1, 1),
      alignContent: "horizontal",
    },
    select:{
      "margin-left": "1px",
      "margin-right": "1px",    
    },
    zoom: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    content: {
      "padding-top": "100px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary  
    },
    swipeView:{
      "padding-top": "1px",
      "padding-bottom": "1px",
      "padding-left": "1px",
      "padding-right": "1px",
    }
  }),
);

export default function ContentLayout(props: ScrollTopProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as number);
  };

  const handleChangeIndex = (index: number) => {
    console.log(index);
    setValue(index);
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

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`}>
      <Box className={classes.swipeView}>{children}</Box>
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
  const classes = useStyles();
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
      <div onClick={handleClick} role="presentation" className={classes.zoom}>
        {children}
      </div>
    </Zoom>
  );
}