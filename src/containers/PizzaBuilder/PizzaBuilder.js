import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Pizza from '../../components/Pizza/Pizza';
import BuildControls from '../../components/Pizza/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Pizza/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    pepperoni: 0.1,
    sausage: 0.4,
    pepper: 0.2,
    mushroom: 0.6,
    olive: 0.3
};

class PizzaBuilder extends Component {
    state = {
        ingredients: {
            pepperoni: 0,
            sausage: 0,
            pepper: 0,
            mushroom: 0,
            olive: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false
    }


    updatePurchaseState (ingredients) {
       
        const sum =  Object.keys(ingredients).map(igKey => {
          
            return ingredients[igKey];
        })
       
        .reduce((sum, el) => {
           
            return sum + el;
        }, 0);
        
        this.setState({purchasable: sum > 0})
       
    }

    addIngredientHandler = (type) => {
      
        const oldCount = this.state.ingredients[type];
       
        const updatedCount = oldCount + 1;
       
        const updatedIngredients = {
            ...this.state.ingredients
        };
       
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    
   
    purchaseHandler = () =>
     {
        this.setState({purchasing: true})
    }

   
    purchaseCancelHandelr = () => {
        this.setState({purchasing: false});
    }

   
    purchaseContinueHandelr = () => {
        //alert('You continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Sanja Gorgievska',
                address: {
                    street: 'Street12',
                    town: 'Veles',
                    country: 'North Macedonia'
                },
                email: 'gorgievska@gmail.com'
            }

        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        } 
        
        let OrderSummary =  <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandelr}
        purchaseContinued={this.purchaseContinueHandelr}/>
        if(this.state.loading){
            OrderSummary = <Spinner/>
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandelr}>
                   {OrderSummary}
                </Modal>
                <Pizza ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default PizzaBuilder;
