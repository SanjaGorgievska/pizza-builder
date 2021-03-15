import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button
    //we have to pass the string in the end
    //imame niza od stringovi 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
            {props.children}
    </button>
);

export default button;