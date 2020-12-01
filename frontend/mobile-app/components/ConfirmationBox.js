import React from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Color from "../constants/colors";

function ConfirmationBox(props) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dialogueContainer}>
        <Text>Confirm the following entries(s)?</Text>
        <Text>This action cannot be undone</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            width: "50%",
            height: 30,
            backgroundColor: "#A5DFB2",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={props.onCancel}
        >
          <Text style={{ color: "white" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "50%",
            height: 30,
            backgroundColor: "#4CB97A",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={props.onDelete}
        >
          <Text style={{ color: "white" }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    width: "80%",
    height: 150,
    // borderWidth:5, borderColor:'blue'
  },
  dialogueContainer: {
    // borderWidth:5, borderColor: Color.header,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f6efed",
  },
  buttonContainer: {
    flexDirection: "row",
    // borderWidth:5, borderColor:'black',
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export { ConfirmationBox };
