import React, { Component } from 'react';
import MENULIST from '../shared/menuList';
import Menu from './Menu';
import ShoppingCart from './ShoppingCart';
import OwnerFlow from './OwnerFlow';
import * as MailComposer from 'expo-mail-composer';
import {Text, View, ScrollView, FlatList, Picker, SafeAreaView, Button} from 'react-native';
import {retrieveOpenRestaurants, retrieveRestaurantInfo} from './customerDbCalls';
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
            selectedRestaurant: null,
            selectedRestaurantPickerValue: "nothing selected",
            restaurantsToSelect: null,
            selectedMenu: null,
            selectedMenuPickerValue: null,
            loadedRestaurant: null
        }
    }

    changeMenu = (menu) => {
        if(menu) this.setState({menu: menu})
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

    setSelectedRestaurant = (value) => {

        if(value) this.setState({selectedRestaurantPickerValue: value})

    } 

    selectRestaurant = (value) => {
        //need to request entire restaurant by the id
        return (value) ? this.setState({selectedRestaurant: value}) : console.log("error no real restaurant selected");
    } 

    setSelectedMenu = (value) => {

        console.log("should be selecting" + value);

        if(value) this.setState({selectedMenu: value}, console.log("menu selected " + value))
    }
    setSelectedMenuPickerValue = (value) => {

        if(value) this.setState({selectedMenuPickerValue: value})
    }


    customerView = () => {

        if(this.state.selectedRestaurant) {
            console.log("selected restaurant" + this.state.selectedRestaurant);

            if(this.state.selectedMenu!=null) {
                
                console.log("should be returning the selected menu" + this.state.selectedMenu)
                return (
                        <SafeAreaView>
                            
                            <ShoppingCart 
                                menu={this.state.loadedRestaurant.menus[this.state.selectedMenu].menuItems}
                                shoppingCartItem={(this.state.shoppingCartItem!=null) ? this.state.shoppingCartItem : null}
                                sendEmail={this.sendEmail}
                            />
                            
                            <Menu 
                                menu={this.state.loadedRestaurant.menus[this.state.selectedMenu].menuItems}
                                addToCart={this.addToCart}
                                />
                            <Button 
                                onPress={this.returnHome}
                                title="Return"
                                />

                        </SafeAreaView>
                )}
            else {

                    
                const restaurantInfo =  async () => {

                    

                    return await retrieveRestaurantInfo(restaurantUrl,this.state.selectedRestaurant);
                }

                if(!this.state.loadedRestaurant) restaurantInfo().then(info=>{
                    console.log(JSON.stringify(info.menus));
                    this.setState({loadedRestaurant: info},()=>console.log(this.state.loadedRestaurant));
                    })
                

              

                return (
                    <>

                        <Picker
                            selectedValue={this.state.selectedMenuPickerValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => this.setSelectedMenuPickerValue(itemValue)} //change this
                            >
                            {(this.state.loadedRestaurant&&this.state.loadedRestaurant.menus&&this.state.loadedRestaurant.menus.length>0) ? this.state.loadedRestaurant.menus.map((listedMenu) => 
                                (<Picker.Item label={listedMenu.name||"what"} value={listedMenu.id} />)) : 
                                <Picker.Item label={"No Menus Available"} value={null} />
                                //lets assume we have already mapped items using the {...menuItem, "id" : indice} convention
                            }
                        </Picker>

                        <Button 
                            title="Select Menu"
                            //selectedMenu is now the index of the menu in this.state.loadedRestaurant.menus
                            //did this because Array.map seems to be losing the nested data, or the value prop in picker can't handle it
                            onPress={()=>this.setSelectedMenu(this.state.selectedMenuPickerValue)}
                        />

                    </>


                )

                

            }

        }
        else  {

            if(!this.state.restaurantsToSelect){

                const openRestaurants =  async () => {

                    return await retrieveOpenRestaurants(restaurantUrl+"names");
                }

                openRestaurants().then(restaurants=>{
                    restaurants = restaurants.map(obj=>obj._id);
                    console.log(JSON.stringify(restaurants))
                    this.setState({
                        restaurantsToSelect: restaurants
                    });

                
                })
            }

            

            const restaurantSelector = (list) => {
                if(list){
                    console.log("there is a list");
                    console.log(JSON.stringify(list)) //logs array of objects
                    console.log(list.length); //returns 17

                    return (

                        
                        <Picker
                            selectedValue={this.state.selectedRestaurantPickerValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => this.setSelectedRestaurant(itemValue)&&console.log(itemValue)} //change this
                            >
                            {list.map((listedRestaurant) => 
                                (<Picker.Item label={listedRestaurant.name||"what"} value={listedRestaurant._id||"what"} />))
                            }
                        </Picker>

                        


                    )
                    
                    /*return list.reduce(listedRestaurant => {
                    return (<Picker.Item label={listedRestaurant.name} value={listedRestaurant._id} />)})*/
                } else return (
                    <Picker.Item label="Loading Items" value={null} />
                )
                            
            }

            

        return (
            <>
            <Text>
                Please select a restaurant.
            </Text>

            
            {restaurantSelector(this.state.restaurantsToSelect)}
                
            

            <Button 
                onPress={()=>console.log("select restaurant" + this.state.selectedRestaurantPickerValue._id),()=>this.selectRestaurant(this.state.selectedRestaurantPickerValue)
            }
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