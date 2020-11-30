import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet } from "react-native";

{/* Main Stack */}
import {Home} from '../Screens/Home'
import {ViewEntry} from '../Screens/ViewEntry'
<<<<<<< Updated upstream
=======
import {ModifyEntry} from "../Screens/ModifyEntry";
>>>>>>> Stashed changes

const Stack = createStackNavigator();

function MainStackNavigator (){
    return(
        <Stack.Navigator
        screenOptions = {{
            headerShown:false
          }}
        >
<<<<<<< Updated upstream
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ViewEntry" component={ViewEntry} />
=======
            <Stack.Screen name="HomePage" component={Home} />
            <Stack.Screen name="ViewEntry" component={ViewEntry} />
            <Stack.Screen name = "ModifyEntryHome" component = {ModifyEntry} />
>>>>>>> Stashed changes
        </Stack.Navigator>
    )
}

export default MainStackNavigator;