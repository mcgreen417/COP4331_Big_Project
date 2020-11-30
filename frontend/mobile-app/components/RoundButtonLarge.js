import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Color from "../constants/colors";
import { Header } from "../components/Header";
import { Input } from "react-native-elements";
import { Icon } from "react-native-elements";

function RoundButtonLarge(props) {
  return (
    <View>
      <TouchableOpacity
        style={[styles.roundButton, { backgroundColor: props.highlightColor }]}
        onPress={() => props.onToggle()}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ position: "absolute" }}>
            <Icon
              name="md-add-circle-outline"
              type="ionicon"
              size={12}
              color="white"
              style={{ paddingLeft: 4 }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Text style={{ color: "white", textAlign: "center" }}>
              {" "}
              {props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Color.background,
    paddingTop: 20,
    paddingLeft: 10,
  },
  HeaderText: {
    fontSize: 25,
    color: Color.header,
    fontWeight: "bold",
  },
  roundButton: {
    backgroundColor: Color.theme,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    height: 20,
    width: 100,
    marginTop: 5,
    justifyContent: "center",
  },
});

export { RoundButtonLarge };
