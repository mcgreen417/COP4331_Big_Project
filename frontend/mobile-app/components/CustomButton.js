import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import Color from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CustomButton(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={async () => {
        await props.onPress();
        const accessToken = await AsyncStorage.getItem("@storage_Key");
        if (accessToken) {
          navigation.navigate(props.link);
        }
      }}
      style={{ width: "100%", zIndex: 1 }}
    >
      <View
        style={{
          backgroundColor: "#a5dfb2",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, color: "white" }}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export { CustomButton };
