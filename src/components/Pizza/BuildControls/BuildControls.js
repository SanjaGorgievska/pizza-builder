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
