import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { Nursery } from "../screens/Nursery";
import { Search } from "../screens/Search";
import { Account } from "../screens/Account";
import { Login } from "../screens/Login";
import { User } from "../screens/User";
import { Register } from "../screens/Register";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

function NurseryStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Nursery" component={Nursery} />
    </Stack.Navigator>
  );
}

function AccountStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}

function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

export {
  MainStackNavigator,
  SearchStackNavigator,
  NurseryStackNavigator,
  AccountStackNavigator,
  AccountNavigator,
};
