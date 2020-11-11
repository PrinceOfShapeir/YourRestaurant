import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Main from './components/Main';

export default function App() {
  return (
    
      <Main />

  );
}

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
