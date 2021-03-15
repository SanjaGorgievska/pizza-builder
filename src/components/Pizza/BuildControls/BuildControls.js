import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Pepperoni',type: 'pepperoni'},
    {label: 'Sausage',type: 'sausage'},
    {label: 'Pepper',type: 'pepper'},
    {label: 'Mushroom',type: 'mushroom'},
    {label: 'Olive',type: 'olive'},
];
//so .map()-> mapira sekoja element od nizata vo BuildControl
//vnatre vo divot sakame da vrtime nis site controls i da renderirame build control za sekoj od niv
//{controls.map(ctrl => ova znaci ctrl kako eden element od ovaa array od controls into build control
//i potoa go renderirame vo PizzaBuilder


const BuildControls = (props) => (
        <div className={classes.BuildControls}>
            <p>Current price:<strong>{props.price.toFixed(2)}</strong> </p>
            
            {controls.map(ctrl => (
                <BuildControl
                
                 key={ctrl.label} 
                 label={ctrl.label}
                 type={ctrl.type}
                 added={() => props.ingredientAdded(ctrl.type)}
                 removed={() => props.ingredientRemoved(ctrl.type)}
                 disabled={props.disabled[ctrl.type]}/>
            ))}
            
            <button className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
            
        </div>
        
);

export default BuildControls; 
