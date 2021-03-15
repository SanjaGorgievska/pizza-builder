import React from 'react';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a href={props.link} 
        //ako props.active e true togas classes ke bide active od CSS-ot ako stavi null kako className
        className={props.active ? classes.active : null}>
            {props.children}</a></li>
);

export default navigationItem;