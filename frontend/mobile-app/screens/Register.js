import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

function Register({ navigation }) {
  return (
    <View style={styles.Container}>
      <Text style={{ alignSelf: "center" }}>Welcome to the Register page!</Text>

      <Button
        title="Back to Login"
        onPress={() => {
          console.log("Going back to Login!");
          navigation.navigate("Login");
        }}
      />
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

export { Register };
