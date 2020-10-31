// In App.js in a new project
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../navigation/DrawerNavigator";
import { Home } from "./Home";

function User({ navigation }) {
  return <DrawerNavigator />;
}

export { User };
