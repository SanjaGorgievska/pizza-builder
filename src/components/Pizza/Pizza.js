import React from 'react';
import classes from './Pizza.css';
import PizzaIngredient from './PizzaIngredients/PizzaIngredient';

const pizza = (props) => {
    //keys methodot pravi extract na keys na daden objekt i go pretvora vo array
    //odnosno niza od kluchevi
    //map() izvrshuva f-ja na sekoj element vo input arrray
    //nacin na transformiranje na object key value pairs vo array so pizza sostojki
    //odnosno kolku sosotjki ni trebaat i key e vazen za topot na sostojkata
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <PizzaIngredient key={igKey + i} type={igKey}/>
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = 
        <div className={props.Pizza}>
            <p >Please start adding ingredients!</p>
        </div>
    }
   

    return (
        <div className={classes.Pizza}>
            <PizzaIngredient type="pizzapan"/>
            <PizzaIngredient type="panhandle"/>
            <PizzaIngredient type="tomatosauce"/>
            <PizzaIngredient type="cheese"/>
            {transformedIngredients}
        
            <div className={props.Pizza}>
            <p>PEPERONI COSTS 0.1</p>
            <p>SAUSAGE COSTS 1.2</p>
            <p>PEPPER COSTS 0.5</p>
            <p>MUSHROOM COSTS 0.0</p>
            <p>OLIVE COSTS 0.6</p>
    </div>
        </div>
    );
};

export default pizza;