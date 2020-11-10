import React, { Component } from 'react';
import MENULIST from '../shared/menuList';
import Menu from './Menu';
import ShoppingCart from './ShoppingCart';

import {Text, View, ScrollView, FlatList} from 'react-native';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {

            //menulist is an array of objects
            //e.g. [{id, name, imageName, description, priceDefault}]
            menu: MENULIST,
            shoppingCartItem: {} 
        }
    }

    addToCart = (item, qty = 1) => {

        //console.log(item);

        if(item){
            let shoppingCartItem = {...this.state.shoppingCartItem}
            shoppingCartItem.name = item.name;
            shoppingCartItem.quantity = qty;
            this.setState({shoppingCartItem}/*, ()=>console.log(this.state.shoppingCartItem.name)*/);
        }


    }



    render(){
        return (
            <View>
                
                <ShoppingCart 
                    menu={this.state.menu}
                    shoppingCartItem={(this.state.shoppingCartItem!=null) ? this.state.shoppingCartItem : null}
                />
                <Menu 
                    menu={this.state.menu}
                    addToCart={this.addToCart}
                    />
            </View>
            
            //<Text>Menu</Text>
        );
    }
}
export default Main;