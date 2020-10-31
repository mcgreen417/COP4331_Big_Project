import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

function Search({ navigation }) {
  return (
    <View style={styles.Container}>
      <Text style={{ alignSelf: "center", color: "white" }}>
        Welcome to the Search page!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "green",
  },
});

export { Search };
