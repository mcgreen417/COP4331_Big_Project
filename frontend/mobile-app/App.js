import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { GlobalContextProvider } from "./context/GlobalContext";
import { LogBox } from "react-native";

// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

export default function App() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
