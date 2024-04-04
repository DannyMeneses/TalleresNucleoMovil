import 'react-native-gesture-handler';
import React from 'react';
//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
//import { RegisterScreen } from './src/screens/registerScreen';// Importa RegisterScreen como exportación con nombre
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider>
      <StackNavigator/>
    </PaperProvider>
    </NavigationContainer>
  );
}