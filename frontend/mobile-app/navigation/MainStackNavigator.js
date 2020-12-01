import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

{
  /* Main Stack */
}
import { Home } from "../Screens/Home";
import { ViewEntry } from "../Screens/ViewEntry";
import { ModifyEntry } from "../Screens/ModifyEntry";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomePage" component={Home} />
      <Stack.Screen name="ViewEntry" component={ViewEntry} />
      <Stack.Screen name="ModifyEntryHome" component={ModifyEntry} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
