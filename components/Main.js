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
            shoppingCartItem: null 
        }
    }

    addToCart = (item, qty = 0) => {

        if(item){
            this.setState({shoppingCartItem: {
                name: item.name,
                quantity: (qty>0) ? qty : 1
            }});
        }

    }


    render(){
        return (
            <View>
                {/*
                <ShoppingCart 
                    menu={this.state.menu}
                    shoppingCartItem={(this.state.shoppingCartItem!=null) ? this.state.shoppingCartItem : null}
                />*/}
                <Menu 
                    menu={this.state.menu}
                    /*addToCart={this.addToCart}*/
                    />
            </View>
            
            //<Text>Menu</Text>
        );
    }
}
export default Main;