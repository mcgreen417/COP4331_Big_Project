import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import User from "./User";

function Login({ navigation }) {
  const [text, setText] = useState("");
  return (
    <View style={styles.Container}>
      <Text style={styles.MainText}>Welcome to Flower Power!</Text>
      <Text style={styles.MainText}>
        Sign in below or create an account to get started tracking your garden
        today.
      </Text>

      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "envelope", color: "white" }}
      />

      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
      />

      <Button
        title="Login"
        onPress={() => {
          console.log("Going to User page!");
          navigation.navigate("User");
        }}
      />

      <View style={styles.MainText}>
        <Text style={styles.MainText}>
          Don't have an account? Sign up here.
        </Text>
        <Text style={styles.MainText}>Forgot your password?</Text>

        <Text style={styles.MainText}>
          By continuing, you're accepting our terms of service and private
          policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "green",
  },
  MainText: {
    color: "white",
    alignSelf: "center",
  },
});

export { Login };
