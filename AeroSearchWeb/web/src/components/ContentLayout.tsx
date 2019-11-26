import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import SimpleSearch from './SimpleSearch';
import { Toolbar, Container, Box, Typography, AppBar, Tab, Tabs, Fab, useScrollTrigger, Zoom,  MenuItem, Select  } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    //   "padding-top": "12px",
    // //   "padding-bottom": "24px",
    //   "padding-left": "12px",
    //   "padding-right": "12px"    
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
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Select
            value={value}
            defaultValue={0}
            onChange={handleChange}            
          >
            <MenuItem value={0}>Простой поиск</MenuItem>
            <MenuItem value={1}>Сложный поиск</MenuItem>
            <MenuItem value={2}>Составной маршрут</MenuItem>
          </Select>
          <Select
            value={value}
            defaultValue={0}
          >
            <MenuItem value={0}>Эконом</MenuItem>
            <MenuItem value={1}>Комфорт</MenuItem>
            <MenuItem value={2}>Бизнес</MenuItem>
            <MenuItem value={3}>Первый класс</MenuItem>

          </Select>
        </Toolbar>

        {/* <Tabs variant="fullWidth" value={value} centered onChange={handleChange} aria-label="disabled tabs example">
          <Tab label="Простой поиск" />
          <Tab label="Сложный поиск" />
          <Tab label="Составной маршрут" />
        </Tabs> */}
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0}>
              <SimpleSearch></SimpleSearch>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <SimpleSearch></SimpleSearch>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <SimpleSearch></SimpleSearch>
            </TabPanel>
        </SwipeableViews>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container className={classes.content}> 
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
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
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