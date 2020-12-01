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
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { Input } from "react-native-elements";
import { DialogueBox } from "../components/DialogueBox";
import { Header } from "../components/Header";
import { SubText } from "../components/SubText";
import Color from "../constants/colors";
import { CustomButton } from "../components/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function Register({ navigation }) {
  const [usernameVal, setUsername] = useState("");
  const [emailVal, setEmail] = useState("");
  const [passwordVal, setPassword] = useState("");
  const [confirmVal, setConfirm] = useState("");

  async function doSignup() {
    console.log("executed");
    if (passwordVal !== confirmVal) {
      // TODO: Show error
      return;
    }
    const response = await fetch("https://myflowerpower.net/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameVal,
        email: emailVal,
        password: passwordVal,
      }),
    });
    const body = await response.text();

    if (response.status === 200) {
      // TODO: Indicate successfully logged in
      console.log(
        "User successfully signed up... redirect to verification code"
      );
      navigation.navigate("EmailVerification", { username: usernameVal });
    } else if (response.status === 400) {
      // TODO: Indicate invalid code
      console.log("????? 400 error");
    } else {
      console.log("Password or code fields are invalid");
    }

    console.log(body);
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/*// Main Container - purple */}
      <View style={styles.mainContainer}>
        <StatusBar
          barstyle="dark-content"
          hidden={false}
          backgroundColor={Color.theme}
          translucent={true}
        />

        {/* Secondary Container Header - Blue */}
        <View style={styles.secondaryContainerHeader}>
          <Image source={require("../assets/header.png")} />

          {/* Header Container - Red */}
          <View style={styles.headerContainer}>
            <Header />
            <SubText>
              {" "}
              Sign in below or create an account to get started tracking your
              garden today.
            </SubText>
          </View>
        </View>

        {/* Form Container -  DodgerBlue*/}
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Username"
            style={{
              textAlign: "center",
              borderColor: "#a5dfb2",
              borderWidth: 2,
              borderRadius: 5,
              backgroundColor: "white",
              paddingVertical: Platform.OS === "ios" ? 10 : 3,
            }}
            placeholderTextColor="black"
            value={usernameVal}
            onChangeText={(e) => setUsername(e)}
          />

          <TextInput
            placeholder="Email Address"
            style={{
              textAlign: "center",
              borderColor: "#a5dfb2",
              borderWidth: 2,
              borderRadius: 5,
              backgroundColor: "white",
              paddingVertical: Platform.OS === "ios" ? 10 : 3,
            }}
            placeholderTextColor="black"
            value={emailVal}
            onChangeText={(e) => setEmail(e)}
          />

          <TextInput
            placeholder="Password"
            style={{
              textAlign: "center",
              borderColor: "#a5dfb2",
              borderWidth: 2,
              borderRadius: 5,
              backgroundColor: "white",
              paddingVertical: Platform.OS === "ios" ? 10 : 3,
            }}
            placeholderTextColor="black"
            value={passwordVal}
            onChangeText={(e) => setPassword(e)}
          />

          <TextInput
            placeholder="Confirm Password"
            style={{
              textAlign: "center",
              borderColor: "#a5dfb2",
              borderWidth: 2,
              borderRadius: 5,
              backgroundColor: "white",
              paddingVertical: Platform.OS === "ios" ? 10 : 3,
            }}
            placeholderTextColor="black"
            value={confirmVal}
            onChangeText={(e) => setConfirm(e)}
          />

          <CustomButton
            label="SIGN UP"
            onPress={() => doSignup()}
            link="EmailVerification"
          />
        </View>

        {/* Secondary Container Footer - Blue */}
        <View style={styles.secondaryContainerFooter}>
          {/* Footer Container - Red*/}
          <View style={styles.footerContainer}>
            {/* Footer Content Container - Green */}
            <View style={styles.footerContentContainer}>
              <View style={{ alignItems: "center", paddingBottom: 20 }}>
                <Text>
                  Already have an account?{" "}
                  <Text
                    style={styles.plantLabel}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login here
                  </Text>
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>By continuing, you're accepting our</Text>
                <Text>
                  <Text style={styles.plantLabel}>Terms of Service </Text> and{" "}
                  <Text style={styles.plantLabel}>Private Policy</Text>
                </Text>
              </View>
            </View>
          </View>
          <Image source={require("../assets/footer.png")} style={{}} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // borderWidth:5, borderColor:'purple',
    backgroundColor: Color.background,
    alignItems: "center",
  },
  secondaryContainerHeader: {
    marginTop: Platform.OS === "ios" ? 0 : 11,
    // borderWidth:5, borderColor:'blue',
    alignItems: "center",
    height: 200,
  },
  headerContainer: {
    position: "absolute",
    //  borderWidth:5, borderColor:'red',
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    width: "80%",
    marginTop: 10,
    // borderWidth:5, borderColor:'dodgerblue',
    justifyContent: "space-between",
    flex: 1,
  },
  imgContainer: {
    borderWidth: 5,
    borderColor: "teal",
  },
  secondaryContainerFooter: {
    justifyContent: "flex-end",
    // borderWidth:5, borderColor:'blue',
    height: 220,
  },
  footerContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    // borderWidth:5, borderColor:'red'
  },
  footerContentContainer: {
    paddingTop: 10,
    // borderWidth:5, borderColor:'green'
  },
  plantLabel: {
    color: Color.darkGreen,
    textDecorationLine: "underline",
  },
});

export { Register };
