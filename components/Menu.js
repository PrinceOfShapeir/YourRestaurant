import React, { Component } from 'react';
//import MENULIST from '../shared/menuList';
import {Text, View, ScrollView, FlatList, Image, Button, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';
//import {images} from './img/';


const baseUrl = 'http://192.168.0.23:3001/images/';
const jpeg = '.jpg';

function Menu (props) {

    let {menu, addToCart, toggleModal} = props;
    //let {menu} = props;
/*
    const addToCart = (item, quantity=1) => {
        console.log("Adding " + quantity + " " + item.name + " to the cart.");
    }
*/
    const AddItem = ({newItem}) => {
        //do something
    }

    const imageSizer =  ({imageName}) => {


    }

    const MenuItems = ({item}) => {
        //console.log(item.name);
        return (

            

           
            
          <View>

              <Text>{JSON.stringify(menu)}</Text>
            <Card /*style={{flex:1}}*/
               >
                <Card.Title>{item.name}</Card.Title>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Text
                        style={{fontWeight: 'bold', fontSize:15}}
                    >{item.name}</Text>
                    {/*
                    <Image style={{width: 50, height: 50}}
                        source={{uri: baseUrl + item.imageName + jpeg}}
                    />*/
                    }
                    
                </View>  
                <View>
                    <Text style={{marginTop:20, marginLeft: 10}}>{item.description||""}</Text>
                    <Text style={{marginTop:5, marginLeft: 15}}>Only {item.price||0} bucks!</Text>
                </View>          

                </View>
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