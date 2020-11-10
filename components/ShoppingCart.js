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
/*
    UNSAFE_componentWillReceiveProps(nextProps){

        if(nextProps!==this.props)

        this.addFromProps(nextProps.shoppingCartItem);


    }*/

    
    addToCart = (itemName, quantity) => {

        this.setState({[itemName]: {
            quantity: (this.state.quantity>0) ? quantity + this.state.itemName.quantity: quantity
            }});

    }
    generateCart = () => {
        let shoppingCartText = [];
        
        for(let i in this.state){
            if(this.state.i.quantity>0){
            shoppingCartText.concat({
                
                id: this.state.i.id,
                title: i,
                quantity: this.state.i.quantity

            });
            }
        }

        return shoppingCartText;

        
    }
    componentDidMount(){

        //console.log(this.state);

    }

    CartItems = ({cartItem}) => {

        return (    
        <Text>{`${cartItem.title}: ${cartItem.quantity}`}</Text>
        );
    }

    render(){

        return(


            <SafeAreaView>
            <Text>Your Order:</Text>
            <FlatList
                data={this.generateCart}
                renderItem={this.CartItems}
                keyExtractor={(item)=>item.id}
                >
            </FlatList>
            </SafeAreaView>
        );
    }



}

export default ShoppingCart;