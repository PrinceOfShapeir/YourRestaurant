import React, { Component } from 'react';
import {SafeAreaView} from 'react-native';
import MENULIST from '../shared/menuList';
import Menu from './Menu';
import ShoppingCart from './ShoppingCart';
import * as MailComposer from 'expo-mail-composer';
import {Text, View, ScrollView, FlatList} from 'react-native';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {

            //menulist is an array of objects
            //e.g. [{id, name, imageName, description, priceDefault}]
            menu: MENULIST,
            shoppingCartItem: {},
            storeId: 'dummy_id',
            storeEmail:'dummyEmail@dummy.dummy'
        }
    }


    sendEmail = (items) => {


        MailComposer.composeAsync({
            subject: 'New Order',
            body: items,
            recipients: [this.state.storeEmail],
            isHtml: true
        });


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
            <SafeAreaView>
                
                <ShoppingCart 
                    menu={this.state.menu}
                    shoppingCartItem={(this.state.shoppingCartItem!=null) ? this.state.shoppingCartItem : null}
                    sendEmail={this.sendEmail}
                />
                <Menu 
                    menu={this.state.menu}
                    addToCart={this.addToCart}
                    />
            </SafeAreaView>
            
            //<Text>Menu</Text>
        );
    }
}
export default Main;