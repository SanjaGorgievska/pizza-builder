import React from 'react';
import classes from './Backdrop.css';

//ako props e true ke vratime div ako ne ke vratime null
//onClick={props.clicked} ova go koristime ako klikneme na pozadinata pozadi na backdrop
//i da se vratime nazad

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}> </div> : null
);

export default backdrop;

//kade ke go koristime ovoj backdrop. Moze na poveke mesta
//edno mesto ke bide Modal komponentata