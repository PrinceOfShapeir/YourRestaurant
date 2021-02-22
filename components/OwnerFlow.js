import React, { Component, useState } from 'react';
import {Text, TextInput, View, ScrollView, FlatList, Image, Button, SafeAreaView, TouchableOpacity, Alert, Modal} from 'react-native';
import {Card} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import {baseUrl} from '../shared/baseUrl';
import { Ionicons } from '@expo/vector-icons';


const combinedUrl = baseUrl + "owners/";
const restaurantUrl = baseUrl + "restaurants/";

function ownerFlow (props) {

    const [username, onChangeUserName] = useState("");
    const [password, onChangePassword] = useState("");
    const [loginState, onChangeLoginState] = useState(false);
    const [revealed, onRevealPassword] = useState(false);
    const [user, onUser] = useState("");
    const [registerModal, registerModalVisible] = useState(false);
    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");
    const [email, onChangeEmail] = useState("");

    const [createRestaurantModal, createRestaurantModalVisible] = useState(false);

    const [restaurantName, changeRestaurantName] = useState(null);


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
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "username":username,
                            "password":password
                        })
                    }
                );

                let user = await response.json();
                console.log(JSON.stringify(user));
                return onChangeLoginState(user);

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

    const toggleRestaurantModal = () => {

        console.log("Create restaurant view");
        createRestaurantModalVisible(!createRestaurantModal);
        console.log(createRestaurantModal.toString());
    }

    const changeRestaurant = () => {

        console.log("Change restaurant");
    }

    const loggedOutView = () => {

        return(
            <>

             <Text>{registerModal}</Text>


            <Button
            title="Register as a Business Owner"
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

    const submitRestaurant = () => {

        (restaurantName) ? console.log(`Preparing to submit ${restaurantName}`) : console.log("Please select a restaurant name.");
        
        toggleRestaurantModal();

        const newRestaurantAsync = async () => {
            try{
                let response = await fetch(
                   restaurantUrl + "add", {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "name":restaurantName,
                            "username": username,
                            "email": loginState.email
                        })
                    }
                );

                let json = await response.json();
                console.log(JSON.stringify(json));

                let newLoginState = JSON.parse(JSON.stringify(loginState));
                newLoginState.ownedRestaurants.push({"name": json.name, "restaurantId": json._id})
                console.log(JSON.stringify(newLoginState));
                console.log(typeof newLoginState);
            
                return onChangeLoginState(newLoginState);

            } catch (e) {
                console.error(e);
            }

        }

        return newRestaurantAsync();
    
    }

    const createRestaurantModalView = () => {

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={createRestaurantModalVisible}
                onRequestClose={toggleRestaurantModal}
            >

                <TextInput 
                    onChangeText={name=>changeRestaurantName(name)}
                    value={restaurantName||""}
                    placeholder={"Restaurant Name"}
                    />
                <Button

                    onPress={submitRestaurant}
                    title={`Register ${(restaurantName) ? restaurantName : "your new restaurant."}`}
                
                
                    />

            </Modal>
        )
        
        
        

         
    }

    const loggedInView = () => {
        return (
            <>

                <Text>You have {loginState.ownedRestaurants.length} restaurants.</Text>

                <Button 
                    title="Create New Restaurant"
                    onPress={toggleRestaurantModal}
                    />

                {(loginState.ownedRestaurants.length>0) ? 
                    <Button 
                        title="Edit Existing Restaurant"
                        onPress={changeRestaurant}
                        />    :
                    <></>
            
                    }
                {createRestaurantModalView()}
                

            </>
        )
    }

    return (
        <>
        <Text>{props.registrationStatus()}</Text>
        
        <Text>{username}</Text>
        <Text>{JSON.stringify(loginState)}</Text>
        <Text>Welcome {(loginState) ? loginState.firstName || loginState.username : "Owners"}.</Text>
        <Text>Would you like to start a new restaurant?</Text>

        <Text>{(user) ? user : ""}</Text>

        {(loginState) ? loggedInView() : loggedOutView()}

       
        </>
        
        )
}

export default ownerFlow;