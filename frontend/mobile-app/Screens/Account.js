import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import Color from "../constants/colors";
import { useEffect } from "react";

function Account({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();

      navigation.openDrawer();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This tab will launch our Account drawer</Text>
    </View>
  );
}

export default Account;
