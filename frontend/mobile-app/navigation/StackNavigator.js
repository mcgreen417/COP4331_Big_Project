import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet } from "react-native";

{/* Account Managament Stack */}
import {Login} from '../Screens/Login'
import {Register} from '../Screens/Register'
import {EmailVerification} from '../Screens/EmailVerification'
import {ForgotPassword} from '../Screens/ForgotPassword'
import {PasswordResetVerification} from '../Screens/PasswordResetVerification'
import {ResetPassword} from '../Screens/ResetPassword'

import BottomTabNavigator from './TabNavigator'

const Stack = createStackNavigator();

function AccountStackNavigator () {
  return (
    <Stack.Navigator
      screenOptions = {{
        headerShown:false
      }}
    >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen name="PasswordResetVerification" component={PasswordResetVerification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
<<<<<<< Updated upstream
        <Stack.Screen name = "Home" component = {BottomTabNavigator} />
=======
        <Stack.Screen name = "HomeStack" component = {BottomTabNavigator} />
>>>>>>> Stashed changes
    </Stack.Navigator>
  )
}




export { AccountStackNavigator};