import * as React from "react";
import { Route, BrowserRouter}  from "react-router-dom"; 
import MainLayout from "./MainLayout";
import ContentLayout from "./ContentLayout";
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from '../themes/theme';
import { connect } from 'react-redux';

const styles = {
    // root: {
    //     height: "500px",
    //     background: "#cfd8dc"
    // }, 
};

const mapStateToProps = (store: any) => ({app: store.app})

class App extends React.Component {  
    render(){    
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div >
                        {/* <Route component={MainLayout}></Route> */}
                        <Route component={ContentLayout}></Route>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);