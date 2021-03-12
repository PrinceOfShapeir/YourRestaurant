import React, { Component, useState } from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, FlatList, Image, Button, SafeAreaView, TouchableOpacity, Alert, Modal} from 'react-native';
import {Card} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import {baseUrl} from '../shared/baseUrl';
import { Ionicons } from '@expo/vector-icons';
import CurrencyInput from 'react-native-currency-input';


const combinedUrl = baseUrl + "owners/";
const restaurantUrl = baseUrl + "restaurants/";

function ownerFlow (props) {

    //user state

    const [username, onChangeUserName] = useState("");
    const [password, onChangePassword] = useState("");
    const [loginState, onChangeLoginState] = useState(false);
    const [revealed, onRevealPassword] = useState(false);
    const [user, onUser] = useState("");
    const [registerModal, registerModalVisible] = useState(false);
    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");
    const [email, onChangeEmail] = useState("");
    
    //restaurant state

    const [createRestaurantModal, createRestaurantModalVisible] = useState(false);
    const [editRestaurantModalViewVisible, toggleEditRestaurant] = useState(false);

    const [restaurantName, changeRestaurantName] = useState(null);

    const [currentlyViewedRestaurant, changeCurrentlyViewedRestaurant] = useState(null);
    //menu state
    const [menuItemName, changeMenuItemName] = useState("");
    const [menuItemPrice, changeMenuItemPrice] = useState(null);

    const [newMenu, createNewMenu] = useState("");
    const [createMenuModalViewVisible, changeCreateMenuModalView] = useState(false);
    const [newMenuName, changeNewMenuName] = useState("");
    const [currentMenu, editCurrentMenu] = useState(null);
    const [currentMenuIndex, changeCurrentMenuIndex] = useState(null);
    const [editRestaurantMenuModalVisible, changeEditRestaurantMenuModalVisibility] = useState(false);
    



    const [loginModal, loginModalVisible] = useState(false);


    

    const changeCurrentMenu = (newMenu) => {

        //potential for throwing a sync menu in here.
        return editCurrentMenu(newMenu);
    } 

    const toggleEditRestaurantMenuView = () => {
        toggleEditRestaurant(!editRestaurantModalViewVisible)
    }
    

   
    const togglePassword  = () => {

             onRevealPassword(!revealed);

    }

    const PasswordVisibleIcon = () => {

        return (<Ionicons style={{marginTop:10}}
                    name={(revealed) ? "eye-outline" : "eye-off-outline"} onPress={togglePassword}/>
                    )
    }
    const editRestaurantIcon = () => {

        return (<Ionicons style={{marginTop:10}}
                    name={"pencil-outline"}/>
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
                <View style = {styles.rowsWithIcons}>

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
            <View style = {styles.rowsWithIcons}>

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

    const syncOwners = (updatedState) => {

                const syncOwnersAsync = async () => {
                    try{
                        let response = await fetch(
                        combinedUrl + `update`, {
                                method: 'PUT',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(updatedState)
                            }
                        );

                        let json = await response.json();
                        console.log(json);

                        } catch (e) {
                        console.error(e);
                    }

                    
                }
                return syncOwnersAsync();

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
                syncOwners(newLoginState)
            
                return onChangeLoginState(newLoginState);

            } catch (e) {
                console.error(e);
            }

        }

        return newRestaurantAsync();
    
    }


        const toggleCreateMenuModal = () => {
            changeCreateMenuModalView (!createMenuModalViewVisible);
        }
        const createMenuModalView = () => {

        if (currentlyViewedRestaurant) return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={createMenuModalViewVisible}
                onRequestClose={toggleCreateMenuModal}
            >
                {//change below to some type of list
                }
                <Text>{`Welcome ${username}`}</Text>
                <Text>{`Here is the screen to edit ${currentlyViewedRestaurant.name}`}</Text>

                <Text>{`You have ${currentlyViewedRestaurant.menus.length} menus.`}</Text>
                
                <Text>Create New Menu?</Text>
                <TextInput 
                    onChangeText={name=>changeNewMenuName(name)}
                    value={newMenuName||""}
                    placeholder={"New Menu"}
                    />
                <Button

                    onPress={()=>{
                        if(newMenuName) {
                            console.log("here");
                            let newRest = JSON.parse(JSON.stringify(currentlyViewedRestaurant));
                            newRest.menus.push({"name":newMenuName, "menuItems": [], "id":newRest.menus.length});
                            return changeCurrentlyViewedRestaurant(newRest), toggleCreateMenuModal();
                        }
                    }}
                    title={`Create ${newMenuName}`}
                
                
                    />

            </Modal>
        )
        

    }
    
    const toggleEditRestaurantMenuModalViewVisibility = () => {
        changeEditRestaurantMenuModalVisibility(!editRestaurantMenuModalVisible);
    }
    
    const middleWareSyncMenu = (cb, menu) => {

        let stagingRestaurant = JSON.parse(JSON.stringify(currentlyViewedRestaurant));
        //console.log(JSON.stringify(stagingRestaurant));
        let oldMenus = stagingRestaurant.menus;
        

        let index = oldMenus.findIndex((x)=>x.name===menu.name);
        (index>=0) ? stagingRestaurant.menus[index] = menu : stagingRestaurant.menus.push(menu);
        changeCurrentlyViewedRestaurant(stagingRestaurant); //syncs to restaurant state
        syncMenus(stagingRestaurant._id, username, stagingRestaurant.menus) //syncs to db, takes  (id, user, menus)
        return cb(menu);
    }
    
    const editRestaurantMenuModalView = () => {
        return (

        <Modal
                animationType="slide"
                transparent={false}
                visible={editRestaurantMenuModalVisible}
                onRequestClose={toggleEditRestaurantMenuModalViewVisibility}
            >

                <TextInput 
                    onChangeText={name=>changeMenuItemName(name)}
                    value={menuItemName||""}
                    placeholder={"New Menu Item"}
                    />

                <CurrencyInput 
                    value={menuItemPrice||0.00}
                    onChangeValue={changeMenuItemPrice}
                    unit="$"
                    delimiter=","
                    separator="."
                    precision={2}
                
                />
                
                <Button

                    onPress={()=>console.log(`submitting changes to ${JSON.stringify(currentlyViewedRestaurant)} restaurant `),
                     ()=>console.log(JSON.stringify({"name": menuItemName, "price" : menuItemPrice})),
                     ()=>{
                        
                        let newMenu = JSON.parse(JSON.stringify(currentMenu));
                        
                         if(currentMenuIndex===null) {
                             console.log(`current menu index is ${currentMenuIndex}`);
                             console.log(currentMenu);
                             console.log(newMenu.menuItems);
                             newMenu.menuItems = newMenu.menuItems.concat({"name": menuItemName, "price" : menuItemPrice, "id": newMenu.menuItems.length});
                             console.log(newMenu.menuItems);
                            }
                             else {
                             console.log(`current menu index is ${currentMenuIndex}`)
                             console.log(newMenu.menuItems);
                             newMenu.menuItems[currentMenuIndex] = {"name": menuItemName, "price" : menuItemPrice, "id": currentMenuIndex}
                         }
                        return middleWareSyncMenu(changeCurrentMenu, newMenu), changeCurrentMenuIndex(null), changeMenuItemName(null), toggleEditRestaurantMenuModalViewVisibility();

                     }
                     
                     
                     
                        }
                    title={`Submit Change`}
                
                
                    />


        </Modal>
        )

    }
    const editRestaurantModalView = () => {

        if (currentlyViewedRestaurant) return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={editRestaurantModalViewVisible}
                onRequestClose={toggleEditRestaurant}
            >
                {//change below to some type of list
                }
                <Text>{`Welcome ${username}`}</Text>
                <Text>{`Here is the menu to edit ${currentlyViewedRestaurant.name}`}</Text>

                <Text>{`You have ${currentlyViewedRestaurant.menus.length} menus.`}</Text>

                <Button
                    title="Create New Menu"
                    onPress={toggleCreateMenuModal}
                    />
                {createMenuModalView()}

                {(currentlyViewedRestaurant.menus.length>0) ? 
                    <FlatList
                            data={currentlyViewedRestaurant.menus}
                            renderItem={renderRestaurantMenu}
                            keyExtractor={(item) => item.id.toString()}
                            /> : <></> 
                }

                <Text>{(currentMenu) ? JSON.stringify(currentMenu.name) + " is selected" : "No menu selected"}</Text>

                {(currentMenu&&currentMenu.menuItems.length>0) ? 
                    <FlatList
                            data={currentMenu.menuItems}
                            renderItem={renderMenuItems}
                            keyExtractor={(item) => item.id.toString()}
                            /> : <></> 
                }
                {editRestaurantMenuModalView()}
                
                

            </Modal>
        )
        

    }

    const changeMenuItem = (item) => {

            console.log("attempting to open edit menu for " + item.name);
            changeCurrentMenuIndex(item.id);
            changeMenuItemName(item.name);
            changeMenuItemPrice(item.price);
            toggleEditRestaurantMenuModalViewVisibility();
    }

    const renderMenuItems = ({item}) => (

        <Card>
            <Card.Title>{item.name}</Card.Title>
            <Text>{item.price}</Text>
            <Button onPress={()=>changeMenuItem(item)}
                title={`Edit ${item.name}.`}/>

            <Card.Divider />

        </Card>

    )
    const menuClicked = (item, editing=false) => {
        if(!currentMenu||currentMenu.id!=item.id) changeCurrentMenu(item);
        changeCurrentMenuIndex(null);
        if(!editing) toggleEditRestaurantMenuModalViewVisibility();
    }
       const renderRestaurantMenu = ({item}) => (

        <Card>
            <Card.Title>{item.name}</Card.Title>
            <Button onPress={()=>menuClicked(item)}
                title={`Add new item to ${item.name} menu.`}/>
            <Button onPress={()=>menuClicked(item, true)}
                title={`Edit ${item.name} menu.`}/>

            <Card.Divider />

        </Card>

  );

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

    const renderRestaurantNames = ({item}) => (

        <Card>
            <Card.Title>{item.name}</Card.Title>
            <Button onPress={()=>retrieveRestaurantInfo(item)} title={`Edit ${item.name}`}/>

            <Card.Divider />

        </Card>

  );

    const syncMenus = (id, user, menus) => {

        const syncMenusAsync = async () => {
             try{
                let response = await fetch(
                   restaurantUrl + `${id}/menu`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "username": user,
                            "newMenus": menus
                        })
                    }
                );

                let json = await response.json();
                console.log("menu updated, new menu: " + JSON.stringify(json));

             }
                catch (e) {
                    console.error(e);
                }
        }
        return syncMenusAsync();

    }

    const retrieveRestaurantInfo = (selectedRestaurant) => {

        const retrieveRestaurantInfoAsync = async () => {
            try{
                let response = await fetch(
                   restaurantUrl + `lookup/${selectedRestaurant.restaurantId}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                let json = await response.json();
                

                json.menus = json.menus.map((item, index) =>{
                    item.menuItems = item.menuItems.map((menuItem, indice)=>{
                        return {...menuItem, "id" : indice}
                    })
                    return {...item, "id":index}
                } );
                console.log(JSON.stringify(json));

                return changeCurrentlyViewedRestaurant(json),toggleEditRestaurantMenuView();

            } catch (e) {
                console.error(e);
            }

    }

    return retrieveRestaurantInfoAsync();

}

    const alertRestaurantClicked = (clicked) => {


        Alert.alert(
            `${clicked.name}`,
            `${JSON.stringify(clicked)}`,
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
    const loggedInView = () => {
        return (
            <>

                <Button 
                    title="Create New Restaurant"
                    onPress={toggleRestaurantModal}
                    />

                <Text>You have {loginState.ownedRestaurants.length} restaurants.</Text>

                    {(loginState.ownedRestaurants.length>0) ?
                        <FlatList
                            data={loginState.ownedRestaurants}
                            renderItem={renderRestaurantNames}
                            keyExtractor={(item) => item._id}
                            /> : <></> 
                    }
                {editRestaurantModalView()}
                
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

const styles = StyleSheet.create({
    rowsWithIcons: {
        flexDirection: "row"
    }
});


export default ownerFlow;