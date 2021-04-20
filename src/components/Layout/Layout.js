import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component  {
    state = {
        showSideDrawer: true
    }
    sideDrawerClosedHandelr = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
           return {showSideDrawer: !this.state.showSideDrawer}
        });

    }
    render () {
        return(
    <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer 
        open={this.state.showSideDrawer}
         closed={this.sideDrawerClosedHandelr} />
        <main className={classes.Content}>
            {this.props.children}</main>
    </Aux>
        )
    }
};

export default Layout;
