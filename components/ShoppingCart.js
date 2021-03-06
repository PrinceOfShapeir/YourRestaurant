import React, { Component } from 'react';
import {Text, View, Modal, SafeAreaView, FlatList, Button, Alert} from 'react-native';

//import MENULIST from '../shared/menuList';

class ShoppingCart extends Component {
    //this is untested

    constructor(props){
        super(props);
        let listifiedMenu = {};
        for(let i in props.menu){
            let name = props.menu[i].name;
            let price = props.menu[i].price;
            let id = props.menu[i].id;
            listifiedMenu[name] = {quantity: 0, price, id};
        }
        let sumTotal = {sumTotal: 0};

        this.state = { ...sumTotal, ...listifiedMenu};

    }



    addFromProps = (item) => {

        if(item.name){

            this.addToCart(item.name, item.quantity, item.price);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){

        //console.log(nextProps.shoppingCartItem.name);
        if(nextProps!==this.props) {
            
            this.addFromProps(nextProps.shoppingCartItem);
        }


    }

    
    addToCart = (itemName, quantity, price=5) => {
        console.log(itemName + quantity);

        let item = {...this.state[itemName], name:itemName, quantity: (this.state[itemName]) ? quantity + this.state[itemName].quantity: quantity};
        this.setState({[itemName]: item}, ()=>this.generateCart());
        this.setState({sumTotal: this.state.sumTotal + quantity * price});
        console.log("adding ", quantity, "times", price, "to", this.state.sumTotal);
    }
    generateCart = () => {
        console.log("running gen cart");
        let shoppingCartText = [];
        
        let counter = 0;
        for(let i in this.state){
            console.log(i);
            if(i!=='shoppingCartText'&&i!=='sumTotal'&&this.state[i].quantity>0){

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

    emailIsSending = (items) => {

        this.props.sendEmail(items);

        Alert.alert(
            "Email Sent",
            items + "were sent.",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: true }
            );
        
    }

    clearCart = () => {

        for(let i in this.state){
            if(this.state[i].hasOwnProperty('quantity')){

                if(this.state[i].quantity>0){
                    this.setState({[i]: {...this.state[i], quantity: 0}});
                }

            }

        }

        this.setState({sumTotal: 0});

        setTimeout(()=>this.generateCart(), 100);
        

    }

    CartItems = ({item}) => {//item is a harcoded prop from flatlist, breaks without
        let {title, quantity} = item;
        //console.log("rendering cart item" + Object.values(cartItem));
        console.log(quantity);

        if(title&&quantity>0){
        return (    
        <Text>{`${title}: ${quantity}`}</Text>
        );
        
    } 

        else return <Text>Could Not Load Item {title}</Text>
        }

    sendOrderEmail = () => {

        //let email = JSON.parse(JSON.stringify(this.state));
        //easier to just use shoppingCartText

        let alertText = []

        for(let i in this.state.shoppingCartText){
            alertText.push(`${this.state.shoppingCartText[i].quantity} ${this.state.shoppingCartText[i].title}`)
        }

        Alert.alert(
            `Send Order Email? Your total is ${this.state.sumTotal}$ You have the following items:`,
    
            `${alertText.toString().replace(',', ' ')}`,
            [
              {
                text: "Cancel",
                onPress: () => {console.log("Cancel Pressed")},
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                  console.log("OK Pressed"); 
                  console.log('sending order email ' + this.state.shoppingCartText);
                  this.emailIsSending(JSON.stringify(this.state.shoppingCartText));                
                }}
            ],
            { cancelable: true }
          );

        


    }

    render(){

        return(


            <SafeAreaView 
                style={{marginTop: 40, flexDirection: 'row'}}                
                >
            <View>
                <Text>Your Order:</Text>
                <Button 
                    title='Clear Cart'
                    onPress={()=>this.clearCart()}
                    />
                </View>        
            <FlatList
                data={this.state.shoppingCartText}
                renderItem={this.CartItems}
                keyExtractor={(item)=>item.id.toString()}//expects string
            >
            </FlatList>
            <View>
                <Button
                    title='Send Order Request'
                    onPress={()=>this.sendOrderEmail()}
                    />
                <Text>Your total is: ${this.state.sumTotal}</Text>
            </View>
           
            </SafeAreaView>
        );
    }



}

export default ShoppingCart;