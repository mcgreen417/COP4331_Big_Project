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
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const [usernameVal, setUsername] = useState("");
  const [passwordVal, setPassword] = useState("");

  let login = async () => {
    console.log("called login");
    const response = await fetch("https://myflowerpower.net/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameVal,
        password: passwordVal,
      }),
    });
    const body = await response.text();
    if (response.status === 200) {
      const { AccessToken } = JSON.parse(body);
      console.log("got token and putting in storage");
      try {
        await AsyncStorage.setItem("@storage_Key", AccessToken);
      } catch (e) {
        console.log(`Error with AsyncStorage in Login ${e}`);
      }
      // this.props.history.push("/home");
    } else if (response.status === 400) {
      // TODO: Indicate not logged in
      console.log("Unsuccessful login");
    } else {
      console.log("Not logged in due to incorrect input");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Main Container - purple */}
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
          <Input
            placeholder="Username"
            style={{
              textAlign: "center",
              borderColor: "#a5dfb2",
              borderWidth: 2,
              borderRadius: 5,
              backgroundColor: "white",
              paddingVertical: Platform.OS === "ios" ? 10 : 0,
            }}
            value={usernameVal}
            onChangeText={(e) => setUsername(e)}
            placeholderTextColor="black"
          />

          <Input
            placeholder="Password"
            style={{
              textAlign: "center",
              borderColor: "#a5dfb2",
              borderWidth: 2,
              borderRadius: 5,
              backgroundColor: "white",
              paddingVertical: Platform.OS === "ios" ? 10 : 0,
            }}
            value={passwordVal}
            onChangeText={(e) => setPassword(e)}
            placeholderTextColor="black"
          />
          <CustomButton label="Log in" onPress={login} link="HomeStack" />
        </View>

        {/* Secondary Container Footer - Blue */}
        <View style={styles.secondaryContainerFooter}>
          {/* Footer Container - Red*/}
          <View style={styles.footerContainer}>
            {/* Footer Content Container - Green */}
            <View style={styles.footerContentContainer}>
              <View style={{ alignItems: "center" }}>
                <Text>
                  Don't have an account?{" "}
                  <Text
                    style={styles.plantLabel}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Sign up here.
                  </Text>
                </Text>
                <Text
                  style={styles.plantLabel}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  Forgot your password?
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
    height: 270,
  },
  headerContainer: {
    position: "absolute",
    // borderWidth:5, borderColor:'red',
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "80%",
    // borderWidth:5, borderColor:'dodgerblue',
    height: 200,
  },
  imgContainer: {
    borderWidth: 5,
    borderColor: "teal",
  },
  secondaryContainerFooter: {
    justifyContent: "flex-end",
    // borderWidth:5, borderColor:'blue',
    height: Platform.OS === "ios" ? 0 : 195,
    flex: Platform.OS === "ios" ? 1 : 0,
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

export { Login };
