import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

{
  /* Main Stack */
}
import { Search } from "../Screens/Search";
import { ViewEntrySearch } from "../Screens/ViewEntrySearch";
import { ModifyEntrySearch } from "../Screens/ModifyEntrySearch";

const Stack = createStackNavigator();

function SearchStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchPage" component={Search} />
      <Stack.Screen name="ViewEntrySearch" component={ViewEntrySearch} />
      <Stack.Screen name="ModifyEntrySearch" component={ModifyEntrySearch} />
    </Stack.Navigator>
  );
}

export default SearchStackNavigator;
