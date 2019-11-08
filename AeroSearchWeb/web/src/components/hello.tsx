import * as React from "react";
import Button from '@material-ui/core/Button';

export interface HelloProps { compiler: string; framework: string; }
 
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <div>
                <h1>Привет от {this.props.compiler} и {this.props.framework}!</h1>
                <h2>работает</h2>
                <Button color="secondary" variant="contained">Button</Button>
            </div>        
        );
    }
}
