import React, { Component, useState } from 'react';
import {Text, TextInput, View, ScrollView, FlatList, Image, Button, SafeAreaView, TouchableOpacity, Alert, Modal} from 'react-native';
import {Card} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import {baseUrl} from '../shared/baseUrl';
import { Ionicons } from '@expo/vector-icons';


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


    const [loginModal, loginModalVisible] = useState(false);
    
   
    const togglePassword  = () => {

             onRevealPassword(!revealed);

    }

    const PasswordVisibleIcon = () => {

        return (<Ionicons style={{marginTop:10}}
                    name={(revealed) ? "eye-outline" : "eye-off-outline"} onPress={togglePassword}/>
                    )
    }
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

    const toggleLoginModal = () => {

        loginModalVisible(!loginModal);
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
        

        <Modal
        animationType="slide"
        transparent={false}
        visible={registerModal}
        onRequestClose={toggleRegisterModal}
      >
            <TextInput 
            onChangeText={name=>onChangeUserName(name)}
            value={username}
            placeholder={"Username"}
            />
            <View style = {{flexDirection: "row"}}>

                <TextInput 
                    style={{flex:1}}
                    onChangeText={pass=>onChangePassword(pass)}
                    value={password}
                    placeholder={"Password"}
                    secureTextEntry={revealed===false}
                />

                {PasswordVisibleIcon()}
                
            </View>
            <Button
                title = "Show Password"
                onPress = {() => onRevealPassword(!revealed)}
                />

          
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

        
        
        <Text>Login and manage an existing one?</Text>
        <Button
        title="Login"
        onPress={toggleLoginModal} 
        />

        <Modal
            animationType="slide"
            transparent={false}
            visible={loginModal}
            onRequestClose={toggleLoginModal}
      > 
        
            <TextInput 
            onChangeText={name=>onChangeUserName(name)}
            value={username}
            placeholder={"Username"}
        />
            <View style = {{flexDirection: "row"}}>

                <TextInput 
                    style={{flex:1}}
                    onChangeText={pass=>onChangePassword(pass)}
                    value={password}
                    placeholder={"Password"}
                    secureTextEntry={revealed===false}
                />

                {PasswordVisibleIcon()}
                
            </View>
            
            
            <Button
                title = "Show Password"
                onPress = {togglePassword}
                />
            <Button
                title="Login"
                onPress={login} 
            />


      </Modal>
        </>
        
        )
}

export default ownerFlow;