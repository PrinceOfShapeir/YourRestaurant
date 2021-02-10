import React, { Component } from 'react';
import {Text, View, ScrollView, FlatList, Image, Button, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';

function ownerFlow (props) {

    return (
        <>
        <Text>Welcome Owners.</Text>
        <Text>Would you like to start a new restaurant?</Text>
        <Button
        title="Register New Store"
        onPress={()=>console.log("new store registration")} 
        />
        <Text>Login and manage an existing one?</Text>
        <Button
        title="Login"
        onPress={()=>console.log("Login Request")} 
        />
        </>
        
        )
}

export default ownerFlow;