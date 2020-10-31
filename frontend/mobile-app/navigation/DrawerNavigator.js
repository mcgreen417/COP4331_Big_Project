// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./StackNavigator";
import { BottomTabNavigator } from "./TabNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Search" component={BottomTabNavigator} />
      <Drawer.Screen name="Nursery" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
