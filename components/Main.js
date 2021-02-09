import React, { Component } from 'react';
import {SafeAreaView, Button} from 'react-native';
import MENULIST from '../shared/menuList';
import Menu from './Menu';
import ShoppingCart from './ShoppingCart';
import OwnerFlow from './OwnerFlow';
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
            storeEmail:'dummyEmail@dummy.dummy',
            customer: false,
            owner: false
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

    customerView = () => {
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
        )
    }

    customer = () => {

        this.setState({customer: true, owner: false});
    }
    owner = () => {

        this.setState({owner: true, customer: false});
    }

    identifier = () => {

        return (
            <> 
                <Button onPress={this.customer}>
                    Customer
                    </Button>
                    <Button onPress={this.owner}>
                    Owner
                </Button>
            </>

        )
    }

    chosenView = () => {

        return (
            (this.state.customer) ? this.customerView : <OwnerFlow />
        )

    }


    render(){
        return (

            <SafeAreaView>

                {(!this.state.customer&&!this.state.owner) ? this.identifier : this.chosenView}
                
            </SafeAreaView>

            
            //<Text>Menu</Text>
        );
    }
}
export default Main;