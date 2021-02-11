import React, { Component } from 'react';
import {Text, TextInput, View, ScrollView, FlatList, Image, Button, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

function ownerFlow (props) {

    const [username, onChangeUserName] = React.useState("Username");

    const login = () => {
        
        console.log("Login Request for " + username); //becomes [object object] ??

        props.registrationStatusChange("Logged In as" + username);
        

        

        
        

    }

    const register = () => {
        console.log("new store registration");
        props.registrationStatusChange("Registered");
    }

    return (
        <>
        <Text>{props.registrationStatus()}</Text>
        <Text>{username}</Text> {//displays the correct value! 
        }
        <Text>Welcome Owners.</Text>
        <Text>Would you like to start a new restaurant?</Text>


{/*
        <Picker
            selectedValue={"Login"}
            onValueChange={(item, index)=>
                props.registrationStatusChange(item)
            }
        >

        <Picker.Item label="Register" value = "register"/>
        <Picker.Item label="Login"  value = "login"/>
            

        </Picker>
*/}

        <Button
        title="Register New Store"
        onPress={register} 
        />
        <Text>Login and manage an existing one?</Text>
        <TextInput 
            onChangeText={name=>onChangeUserName(name)}
            value={username}
        />
        <Button
        title="Login"
        onPress={login} 
        />
        </>
        
        )
}

export default ownerFlow;