import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
<<<<<<< Updated upstream
import Dash from 'react-native-dash';
import {Home} from './Screens/Home'
import {names} from './constants/names'
import {myPlants} from './constants/plants'
import {NewEntry} from './Screens/NewEntry'
import {Search} from './Screens/Search'
import {ViewEntry} from './Screens/ViewEntry'
import {Login} from './Screens/Login'
import {Register} from './Screens/Register'
import {EmailVerification} from './Screens/EmailVerification'
import {ForgotPassword} from './Screens/ForgotPassword'
import {PasswordResetVerification} from './Screens/PasswordResetVerification'
import { ResetPassword } from './Screens/ResetPassword';
import { NavigationContainer } from "@react-navigation/native";
import {AccountStackNavigator} from "./navigation/StackNavigator"
import BottomTabNavigator from './navigation/TabNavigator'
import Nursery from './Screens/Nursery'
import DrawerNavigator from './navigation/DrawerNavigator'
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
=======
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from './navigation/DrawerNavigator'
import {GlobalContextProvider} from './context/GlobalContext'
import {LogBox} from 'react-native';

// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();
>>>>>>> Stashed changes

 export default function App() 
{
  return(
<<<<<<< Updated upstream
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
=======
    <GlobalContextProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </GlobalContextProvider>
>>>>>>> Stashed changes
  );
}


