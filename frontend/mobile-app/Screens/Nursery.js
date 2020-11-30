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

function Nursery({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Nursery Page Coming Soon!</Text>
    </View>
  );
}

export default Nursery;
