import React, { Component } from 'react';
import propTypes from 'prop-types';
import classes from './PizzaIngredient.css';


class PizzaIngredient extends Component{
    render () {
    let ingredient = null;
    
    switch(this.props.type){
        case ('pizzacontainer'):
            ingredient = <div className={classes.pizzacontainer}></div>
            break;
        case ('pizzapan'):
            ingredient = <div className={classes.pizzapan}></div>
            break;
        case ('panhandle'):
            ingredient = <div className={classes.panhandle}></div>
            break;
        case ('tomatosauce'):
            ingredient = <div className={classes.tomatosauce}></div>
            break;
        case ('cheese'):
            ingredient = <div className={classes.cheese}></div>
            break;
        case ('pepperoni'):
            ingredient = (
                <div className={classes.pepperoni}></div>
            );
            break;
        case ('sausage'):
            ingredient = <div className={classes.sausage}></div>
            break;
        case ('mushroom'):
             ingredient = <div className={classes.mushroom}></div>
            break;
        case ('olive'):
            ingredient = <div className={classes.olive}></div>
             break;
        case ('pepper'):
            ingredient = <div className={classes.pepper}></div>
            break;
        default:
            ingredient = null;
           
        }
        return ingredient;
    }
}

PizzaIngredient.propTypes = {
    type: propTypes.string.isRequired
};

export default PizzaIngredient;
