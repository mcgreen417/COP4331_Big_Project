import React from "react";
import { Text, View, Button, StyleSheet, StatusBar, Image } from "react-native";
import Color from "../constants/colors";

function Line() {
  return (
    <View style={{ borderBottomColor: Color.header, borderBottomWidth: 2 }} />
  );
}

export { Line };
