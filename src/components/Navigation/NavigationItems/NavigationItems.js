import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItemns = () => (
    <ul className={classes.NavigationItems}>
       <NavigationItem link="/" active>Pizza Builder</NavigationItem>
       <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItemns;