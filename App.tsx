import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigator } from './src/navigator/Navigator';

export const App = () => {
  return (
    <>
      <NavigationContainer>
          <Navigator/>
      </NavigationContainer>
    </>
  )
}

export default App;
