import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
//ke ja smenime vo class-based za da dodademe life cycle hooks
//da vidime koga ovaa e updated, zatoa kreirame nov method

class OrderSummary extends Component{
    componentDidUpdate(){
        console.log('[OrderSummary] DidUpdate');
    }
    render(){
        //expect to get as props and map them into list items
//ke imame prob zatoa sto tie se vo object format a ne vo array
//Sakame da imame lista <li>Salad: 1 <li/> i broj na sostojki od toj type
//Object.keys se koristi za transformiranje na vo array od kluchevite na salad itn.
//i sakame na kraj da go mapirame vo array od jsx elementi
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
        //vrakame lista od igKey= salad na primer i negovata vrednost
        return( 
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>);
    });
        return(
        <Aux>
            <h3>Your Order</h3>
            <p>Best pizza in town with following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    } 
};

export default OrderSummary;