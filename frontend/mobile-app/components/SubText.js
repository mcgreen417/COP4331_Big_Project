import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  Image,
  ImageBackground,
} from "react-native";

function SubText(props) {
  return <Text style={styles.headerText}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  headerText: {
    color: "#000000",
    fontSize: 16,
    // borderWidth:2,
    textAlign: "center",
    width: "80%",
  },
});

export { SubText };
