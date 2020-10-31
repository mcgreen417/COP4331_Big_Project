// In App.js in a new project
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AccountStackNavigator } from "./navigation/StackNavigator";
import { Login } from "./screens/Login";

// Testing for commit 

function App() {
  return (
    <NavigationContainer>
      <AccountStackNavigator />
    </NavigationContainer>
  );
}

export default App;
