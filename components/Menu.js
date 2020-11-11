import React, { Component } from 'react';
//import MENULIST from '../shared/menuList';
import {Text, View, ScrollView, FlatList, Image, Button, SafeAreaView} from 'react-native';
import {Card, Icon} from 'react-native-elements';
//import {images} from './img/';


const baseUrl = 'http://192.168.0.23:3001/images/';
const jpeg = '.jpg';

function Menu (props) {

    let {menu, addToCart} = props;
    //let {menu} = props;
/*
    const addToCart = (item, quantity=1) => {
        console.log("Adding " + quantity + " " + item.name + " to the cart.");
    }
*/
    const AddItem = ({newItem}) => {
        //do something
    }

    const MenuItems = ({item}) => {
        //console.log(item.name);
        return (

            

           
            
          <View>
            <Card /*style={{flex:1}}*/
               >
                <Card.Title>{item.id}</Card.Title>

                <Text>{item.imageName}</Text>
                <Image style={{width: 50, height: 50}}
                source={{uri: baseUrl + item.imageName + jpeg}}
               />
               
                <Text>{`$ ${item.price}`}</Text>

                <Text>Item</Text>
                <Button
                    title='Add To Cart'
                    onPress={()=>addToCart(item)}/>

            </Card>
            </View>
          
          

    
        );
    };
    
    const RenderMenu = ({menu}) => {

        //console.log('rendering menu' + Object.values(menu));

        return (
            
            
            
                <FlatList

                    style={{flexGrow: 3, flexDirection: 'column', marginBottom: 100}}    
                    data={Object.values(menu)}
                    renderItem={MenuItems}
                    keyExtractor={(item)=>item.id}
                    ListHeaderComponent={<Card>
                        <Card.Title>Menu</Card.Title>
                        
                    </Card>}
                    >
                </FlatList>
        
        );

    };

    return (
        
            
            <RenderMenu 
                menu={menu}
                />
            

        
    );
} 


export default Menu;