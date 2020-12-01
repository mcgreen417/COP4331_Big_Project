import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import Color from "../constants/colors";

function BrownButton(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onSort(props.data.id);
      }}
    >
      <View
        style={{
          backgroundColor: props.data.backgroundColor,
          borderWidth: 1,
          borderColor: Color.header,
          justifyContent: "center",
          paddingHorizontal: 3,
        }}
      >
        <Text style={{ color: props.data.color }}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export { BrownButton };
