import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/Routes';

const App: React.FC = () => {
  return (

    <NavigationContainer>
      <Routes />
    </NavigationContainer>

  );
}

export default App;

