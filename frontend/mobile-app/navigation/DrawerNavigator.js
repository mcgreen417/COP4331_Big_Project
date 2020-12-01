import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import { AccountStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return <DrawerContent {...props} />;
      }}
      drawerPosition="right"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="LoginDrawer" component={AccountStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
