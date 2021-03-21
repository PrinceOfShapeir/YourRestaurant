import React, { Component } from 'react';
import MENULIST from '../shared/menuList';
import Menu from './Menu';
import ShoppingCart from './ShoppingCart';
import OwnerFlow from './OwnerFlow';
import * as MailComposer from 'expo-mail-composer';
import {Text, View, ScrollView, FlatList, Picker, SafeAreaView, Button} from 'react-native';
import {retrieveOpenRestaurants} from './customerDbCalls';
import {baseUrl} from '../shared/baseUrl';

const restaurantUrl = baseUrl + "restaurants/";
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
            owner: false,
            ownerState: "signed out",
            selecteRestaurant: null,
            selectedRestuarantPickerValue: "nothing selected"
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

    registrationStatus = () => {

            return this.state.ownerState;

    }

    registrationStatusChange = (newStatus) => {

        this.setState({ownerState: newStatus});

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

    returnHome = () => {
        //console.log("returning home");
        this.setState({
            customer: false,
            owner: false
        });
        console.log(this.state.customer||this.state.owner);
    }

    ownerView = () => {

        return (
            <SafeAreaView>
                
                <Button 
                        onPress={()=>{}}
                        title=""
                        color="#000000"
                        />
                
                

                        <Text>{this.state.customer||this.state.owner}</Text>

                <OwnerFlow 
                    registrationStatus = {this.registrationStatus}
                    registrationStatusChange = {this.registrationStatusChange}
                    
                />
                <Button 
                        onPress={this.returnHome}
                        title="Return"
                        />


            </SafeAreaView>
        )

    }

    customerView = () => {

        if(this.state.selectedRestaurant) {
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
                    <Button 
                        onPress={this.returnHome}
                        title="Return"
                        />

                </SafeAreaView>
        )

        }
        else  {

            const openRestaurants =  async () => {

                return await retrieveOpenRestaurants(restaurantUrl+"names");
            }

            openRestaurants().then(restaurants=>console.log(JSON.stringify(restaurants)))

            

        return (
            <>
            <Text>
                Please select a restaurant.
            </Text>

            <Picker
             selectedValue={this.selectedRestaurantPickerValue}
             style={{ height: 50, width: 150 }}
             onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} //change this
            >
            <Picker.Item label="Item 1" value="item1" />
            <Picker.Item label="Item 2" value="item2" />
                
            </Picker>

            <Button 
                onPress={this.selectRestaurant}
                title="Select Restaurant"
            />

            </>

        


        )}
    }

    customer = () => {

        this.setState({customer: true, owner: false});
    }
    owner = () => {

        this.setState({owner: true, customer: false});
    }

    identifier = () => {

        return (
            <SafeAreaView style={{
                
                flex:1,
                justifyContent: "center",
                textAlign: "center"
                
                }}> 
                
                <Text>Are you a</Text>
                
                <Button onPress={this.customer} 
                    title="Customer?"
                    
                />

                <Text>Or an</Text>
                <Button onPress={this.owner}
                    title="Owner?"  
                    
                />
                
            </SafeAreaView>

        )
    }

    chosenView = () => {

        console.log("view is chosen");

        return (
            (this.state.customer) ? this.customerView() : this.ownerView()
        )

    }


    render(){
        return (

            <SafeAreaView style={{height: "100%"}}>

                {(this.state.customer||this.state.owner) ? this.chosenView() : this.identifier()}
                
            </SafeAreaView>

            
            //<Text>Menu</Text>
        );
    }
}
export default Main;