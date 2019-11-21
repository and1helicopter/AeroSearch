import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SimpleSearch from './SimpleSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      "padding-top": "12px",
    //   "padding-bottom": "24px",
      "padding-left": "12px",
      "padding-right": "12px"    
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

export default function ContentLayout() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
         <div className={classes.paper}>
             <AppBar position="static" color="default">
                <Tabs variant="fullWidth" value={value} indicatorColor="primary" textColor="primary" centered onChange={handleChange} aria-label="disabled tabs example">
                    <Tab label="Простой поиск" />
                    <Tab label="Сложный поиск" />
                    <Tab label="Составной маршрут" />
                </Tabs>
            </AppBar>
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0}>
                    <SimpleSearch></SimpleSearch>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </SwipeableViews>
         </div>
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