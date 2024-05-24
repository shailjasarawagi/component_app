/**
 * This is the main container for all the navigators.
 * @returns {MainRouter}- returns a Router
 */

import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export const MyStack = createNativeStackNavigator();

const MainRouter = () => {

  return (

    <NavigationContainer>
      <MyStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home">
      
      </MyStack.Navigator>
    </NavigationContainer>

  );
};

export default MainRouter;
