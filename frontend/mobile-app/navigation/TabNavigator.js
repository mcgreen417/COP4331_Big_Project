import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MainStackNavigator,
  SearchStackNavigator,
  NurseryStackNavigator,
  AccountStackNavigator,
  AccountNavigator,
} from "./StackNavigator";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

function BottomTabNavigator({ route }) {
  const tabName = route.name;
  console.log("name is", tabName);

  return (
    <Tab.Navigator
      initialRouteName={tabName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Nursery") {
            iconName = "spa";
          } else if (route.name === "Account") {
            iconName = "user-circle";
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              type="font-awesome"
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "green",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Nursery" component={NurseryStackNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
}

export { BottomTabNavigator };
