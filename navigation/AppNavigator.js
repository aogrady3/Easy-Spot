import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import MainTabNavigator from './MainTabNavigator';
import AddDrivewayScreen from '../screens/AddDrivewayScreen';

const AppNaivigator = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: LoginScreen,
    Main: MainTabNavigator,
    SignUp: SignUpScreen,
    AddDriveway: AddDrivewayScreen
  })
);

export default AppNaivigator
