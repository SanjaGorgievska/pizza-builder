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
        //object so stringovi,odnosno properties
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
        //so .map() za dadena sostojka ja ziamme starata cena i ja zamenuvame so novata
        const sum =  Object.keys(ingredients).map(igKey => {
           //za sekoj kluc vrakam vrednosta za dadeno key
            return ingredients[igKey];
        })
        //sega mi treba sumata na site ingredients 
        .reduce((sum, el) => {
            //vrakame finalnata suma + elementot
            return sum + el;
        }, 0);
        //ke bide true ako imame barem edna sostojka
        this.setState({purchasable: sum > 0})
        //i potoa go povikuvame dole vo BuildControls
        //a potoa i pod dve f-cii za remove i add
    }

    addIngredientHandler = (type) => {
        //prvo ne interesira momentalnata kolichina na sostojkata
        const oldCount = this.state.ingredients[type];
        //ne sfakam zosto +1 ?
        const updatedCount = oldCount + 1;
        //treba update  na sostojkite
        //state mora da bide updejtiran na immutable nacin,
        //pa zatoa kreirame nov js object 
        //...gi distribuirame propertinjata na starite ingrediants state vo nov objekt 
        const updatedIngredients = {
            ...this.state.ingredients
        };
        //go zimame novo kreiraniot objekt, pristapuvame za daden type za koj
        //treba da napravime update na sostojkite
        //potoa dodavaame novo property ingridientAdded koe ke chuva referenca do ovoj handler
        //i ova novo propery potoa vo BuildControls go pishuvame slednovo
        // added={() => props.ingredientAdded(ctrl.type)}
        //i ova added potoa treba da e konektirano so kopcheto vo BuildCOntrol
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
    
    //ovoj method ke se aktivira koga ke klikneme na orderButton
    purchaseHandler = () =>
     {
        this.setState({purchasing: true})
    }

    //klikanje na backdrop za da se iskluci
    purchaseCancelHandelr = () => {
        this.setState({purchasing: false});
    }

    //tuka go pravam HTTP request
    //ke go iskoristime ovoj method here, zad ada pratime request do nashiot backend
    //for storing data, koristime post()
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
        //OrderSummary treba da ima propery ingredients zatoa sto nie pristapuvame
        //na props object vo OrderSummary/const ingredientSummary = Object.keys(props.ingredients).map()
        //taka sto nie treba da gi dodelime ingredients  i gi dobivame od state

        //na Modal mu dodavame property show i bind it to the purchasing state
        //ako purchase e true togas Modal ke bide visiable

        //treba da proverime koga OrderSummary e rerender preku dodavanje na life cycle hook
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