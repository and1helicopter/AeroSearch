import * as React from "react";
import Button from '@material-ui/core/Button';
 
export default class Hello extends React.Component{
    render() {
        return (
            <div>
                <h1>Привет!</h1>
                <h2>работает</h2>
                <Button color="secondary" variant="contained">Button</Button>
            </div>        
        );
    }
}
