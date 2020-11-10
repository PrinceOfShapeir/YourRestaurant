import React, { Component } from 'react';
import {Text, View, Modal, SafeAreaView, FlatList} from 'react-native';
//import MENULIST from '../shared/menuList';

class ShoppingCart extends Component {
    //this is untested

    constructor(props){
        super(props);
        let listifiedMenu = {};
        for(let i in props.menu){
            let name = props.menu[i].imageName;
            let price = props.menu[i].imageName;
            let id = props.menu[i].id;
            listifiedMenu[name] = {quantity: 0, price, id};
        }

        this.state = listifiedMenu;
    }

    addFromProps = (item) => {

        if(item!=null){

            this.addToCart(item.name, item.quantity);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){

        //console.log(nextProps.shoppingCartItem.name);
        if(nextProps!==this.props) {
            
            this.addFromProps(nextProps.shoppingCartItem);
        }


    }

    
    addToCart = (itemName, quantity) => {
        console.log(itemName + quantity);

        let item = {name:itemName, quantity: (this.state[itemName]) ? quantity + this.state[itemName].quantity: quantity};
        this.setState({[itemName]: item}, ()=>this.generateCart());

    }
    generateCart = () => {
        console.log("running gen cart");
        let shoppingCartText = [];
        
        let counter = 0;
        for(let i in this.state){
            console.log(i);
            if(this.state[i].quantity>0&&i!=='shoppingCartText'){

                console.log("should be adding" + this.state[i].quantity + ' ' + i + " " + counter);
            shoppingCartText.push({
                
                id: counter,
                title: i,
                quantity: this.state[i].quantity

            });
            counter++;
            }
        }
        //console.log(shoppingCartText[0]);

        this.setState({shoppingCartText}, ()=> console.log(this.state.shoppingCartText));

        
    }
    componentDidMount(){

        //console.log(this.state);

    }

    CartItems = ({cartItem}) => {

        if(cartItem){
        return (    
        <Text>{`${cartItem.title}: ${cartItem.quantity}`}</Text>
        );
    }

    else console.log(cartItem);
    }

    render(){

        return(


            <SafeAreaView>
            <Text>Your Order:</Text>

            
            {/*<FlatList
                data={this.state.shoppingCartText}
                renderItem={this.CartItems}
                keyExtractor={(item)=>item.id}
            >
            </FlatList>*/}
            </SafeAreaView>
        );
    }



}

export default ShoppingCart;