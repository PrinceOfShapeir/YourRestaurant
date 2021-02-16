import React, { Component, useState } from 'react';
import {Text, TextInput, View, ScrollView, FlatList, Image, Button, SafeAreaView, TouchableOpacity, Alert, Modal} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import {baseUrl} from '../shared/baseUrl';

const combinedUrl = baseUrl + "owners/"

function ownerFlow (props) {

    const [username, onChangeUserName] = useState("");
    const [password, onChangePassword] = useState("");
    const [loginState, onChangeLoginState] = useState("Logged Out");
    const [revealed, onRevealPassword] = useState(false);
    const [user, onUser] = useState("");
    const [registerModal, registerModalVisible] = useState(false);
    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");
    const [email, onChangeEmail] = useState("");
   

    const login = () => {
        
        //console.log("Login Request for " + username);

        //props.registrationStatusChange("Logged In as" + username);
        
        const getLoginAsync = async () => {
            try{
                let response = await fetch(
                    combinedUrl + "login", {
                        method: 'POST',
                        headers: {
                            Accept: 'text/plain',
                            'Content-Type': 'text/plain'
                        },
                        body: JSON.stringify({
                            "username":username,
                            "password":password
                        })
                    }
                );

                let text = await response.text();
                console.log(text);
                return onChangeLoginState(text);

            } catch (e) {
                console.error(e);
            }

        }

        return getLoginAsync();
        

    };
        
        

        
    const toggleRegisterModal = () => {

        registerModalVisible(!registerModal)
        console.log("register toggled " + registerModal)
    }

    

    const register = () => {


        //console.log("new store registration");
        //props.registrationStatusChange("Registered");

        toggleRegisterModal();

        const registerAsync = async () => {
            try{
                let response = await fetch(
                   combinedUrl + "add", {
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
            
                return onUser(JSON.stringify(json));

            } catch (e) {
                console.error(e);
            }

        }

        return registerAsync();


    }

    return (
        <>
        <Text>{props.registrationStatus()}</Text>
        
        <Text>{username}</Text>
        <Text>{loginState}</Text>
        <Text>Welcome Owners.</Text>
        <Text>Would you like to start a new restaurant?</Text>

        <Text>{(user) ? user : ""}</Text>

        <Text>{registerModal}</Text>


        <Button
        title="Register New Store"
        onPress={toggleRegisterModal} 
        />        
        <TextInput 
            onChangeText={name=>onChangeUserName(name)}
            value={username}
            placeholder={"Username"}
        />
        <TextInput 
            onChangeText={pass=>onChangePassword(pass)}
            value={password}
            placeholder={"Password"}
            secureTextEntry={revealed===false}
        />

        <Modal
        animationType="slide"
        transparent={false}
        visible={registerModal}
        onRequestClose={toggleRegisterModal}
      >

          
            <TextInput 
                onChangeText={name=>onChangeFirstName(name)}
                value={firstName}
                placeholder={"First Name"}
            />

            

            <TextInput 
                onChangeText={name=>onChangeLastName(name)}
                value={lastName}
                placeholder={"Last Name"}
            />
            <TextInput 
                onChangeText={email=>onChangeEmail(email)}
                value={email}
                placeholder={"Email"}
            />
            <Button
                title="Submit Registration"
                onPress={register} 
                />        


          </Modal>
        <Button
        title = "Show Password"
        onPress = {() => onRevealPassword(!revealed)}
        />
        
        
        <Text>Login and manage an existing one?</Text>
        <Button
        title="Login"
        onPress={login} 
        />
        </>
        
        )
}

export default ownerFlow;