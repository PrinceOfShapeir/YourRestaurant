import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Main from './components/Main';

export default function App() {
  return (
    <View>
      <Main />
      {/*<Image source={require('./assets/img/bread.jpg')}/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
