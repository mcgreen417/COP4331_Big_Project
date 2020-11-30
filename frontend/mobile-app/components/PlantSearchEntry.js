import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  ImagePropTypes,
} from "react-native";
import Color from "../constants/colors";
import Dash from "react-native-dash";

function PlantSearchEntry(props) {
  return (
    <View>
      <Dash
        style={{ width: "100%", height: 1 }}
        dashLength={7}
        dashThickness={1}
        dashColor={Color.HeaderText}
        dashGap={5}
      />

      <View style={{ paddingVertical: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Image source={props.plantImage} />
          <View style={{ width: "100%", paddingLeft: 5, paddingRight: 5 }}>
            <Text>Nickname: {props.nickname}</Text>
            <Text>Species: {props.species}</Text>
            <Text>Reminder: Water in {props.numOfDays} days</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>I completed this task</Text>
              <Text>View Entry Here gotta see</Text>
            </View>
          </View>
        </View>
      </View>

      <Dash
        style={{ width: "100%", height: 1 }}
        dashLength={7}
        dashThickness={1}
        dashColor={Color.HeaderText}
        dashGap={5}
      />
    </View>
  );
}

export { PlantSearchEntry };
