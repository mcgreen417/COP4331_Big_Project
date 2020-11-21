import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet } from "react-native";

{/* Main Stack */}
import {Home} from '../Screens/Home'
import {ViewEntry} from '../Screens/ViewEntry'

const Stack = createStackNavigator();

function MainStackNavigator (){
    return(
        <Stack.Navigator
        screenOptions = {{
            headerShown:false
          }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ViewEntry" component={ViewEntry} />
        </Stack.Navigator>
    )
}

export default MainStackNavigator;