import React, { Component } from 'react';
import {Text, TextInput, View, ScrollView, FlatList, Image, Button, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import {baseUrl} from '../shared/baseUrl';

function ownerFlow (props) {

    const [username, onChangeUserName] = React.useState("Username");
    const [password, onChangePassword] = React.useState("");
    const [loginState, onChangeLoginState] = React.useState("Logged Out");
    const [revealed, onRevealPassword] = React.useState(false);

   

    const login = () => {
        
        console.log("Login Request for " + username);

        props.registrationStatusChange("Logged In as" + username);
        
        const getLoginAsync = async () => {
            try{
                let response = await fetch(
                    baseUrl, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                );

                let json = await response.json();
                return onChangeLoginState(JSON.stringify(json));

            } catch (e) {
                console.error(e);
            }

        }
        

    };
        
        

        
        

    

    const register = () => {
        console.log("new store registration");
        props.registrationStatusChange("Registered");
    }

    return (
        <>
        <Text>{props.registrationStatus()}</Text>
        
        <Text>{username}</Text>
        <Text>{loginState}</Text>
        <Text>Welcome Owners.</Text>
        <Text>Would you like to start a new restaurant?</Text>


        <Button
        title="Register New Store"
        onPress={register} 
        />
        <Text>Login and manage an existing one?</Text>
        <TextInput 
            onChangeText={name=>onChangeUserName(name)}
            value={username}
        />
        <TextInput 
            onChangeText={pass=>onChangePassword(pass)}
            value={password}
            placeholder={"Password"}
            secureTextEntry={revealed===false}
        />

        <Button
        title = "Show Password"
        onPress = {() => onRevealPassword(!revealed)}
        />
        
        

        <Button
        title="Login"
        onPress={login} 
        />
        </>
        
        )
}

export default ownerFlow;