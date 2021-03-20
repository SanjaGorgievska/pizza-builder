import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

//ako se prikazhe modal togas treba da se prikazhe i backdrop
//dodavame modalClosed property i pri klik na backdrop ke se iskl pozadinata
//modalClosed property go dodavame vo PizzaBuilder
//oti go dodavame kako referenca na methodot so sakame da se izvrshuva

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal}
            //we bind style here ... ako show e true 
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
    </Aux>
);



export default modal;

//modal ke go dodademe na mesto kade sto ke sakame da go prikazheme
//a toa e vo pizzaBuilder