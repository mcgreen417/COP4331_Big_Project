import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

function PasswordDropdown() {
  const [flag, setFlag] = useState(false);

  return (
    <View style={{ backgroundColor: "#4CB97A", marginTop: 20 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (flag) setFlag(false);
            else setFlag(true);
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="pencil" type="evilicon" size={20} color="white" />
              <Text style={{ color: "white" }}>Change Password</Text>
            </View>
            {!flag ? (
              <View style={{ paddingRight: 10 }}>
                <Icon name="angle-down" type="font-awesome" color="white" />
              </View>
            ) : (
              <View style={{ paddingRight: 10 }}>
                <Icon name="angle-up" type="font-awesome" color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {flag == true && (
        <View>
          <TextInput
            placeholder="E-mail address"
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 10,
              borderColor: "white",
              textAlignVertical: "top",
            }}
            placeholderTextColor="white"
          />
          <TextInput
            placeholder="Current Password"
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 10,
              borderColor: "white",
            }}
            placeholderTextColor="white"
          />
          <TextInput
            placeholder="New Password"
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 10,
              borderColor: "white",
            }}
            placeholderTextColor="white"
          />
          <TextInput
            placeholder="Confirm new password"
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginVertical: 10,
              borderColor: "white",
            }}
            placeholderTextColor="white"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 5,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => alert("password changed")}
            >
              <Icon name="check" type="entypo" color="white" />
              <Text style={{ color: "white" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function EmailDropdown() {
  const [flag, setFlag] = useState(false);

  return (
    <View style={{ backgroundColor: "#4CB97A", marginTop: 20 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (flag) setFlag(false);
            else setFlag(true);
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="pencil" type="evilicon" size={20} color="white" />
              <Text style={{ color: "white" }}>Change E-mail Address</Text>
            </View>
            {!flag ? (
              <View style={{ paddingRight: 10 }}>
                <Icon name="angle-down" type="font-awesome" color="white" />
              </View>
            ) : (
              <View style={{ paddingRight: 10 }}>
                <Icon name="angle-up" type="font-awesome" color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {flag == true && (
        <View>
          <TextInput
            placeholder="Current e-mail address"
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 10,
              borderColor: "white",
            }}
            placeholderTextColor="white"
          />
          <TextInput
            placeholder="New e-mail address"
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 10,
              borderColor: "white",
            }}
            placeholderTextColor="white"
          />
          <TextInput
            placeholder="Confirm new e-mail address"
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 10,
              borderColor: "white",
            }}
            placeholderTextColor="white"
          />
          <TextInput
            placeholder="Confirm new password"
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginVertical: 10,
              borderColor: "white",
            }}
            placeholderTextColor="white"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 5,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => alert("Email changed")}
            >
              <Icon name="check" type="entypo" color="white" />
              <Text style={{ color: "white" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function ProblemDropDown() {
  const [flag, setFlag] = useState(false);

  return (
    <View style={{ backgroundColor: "#4CB97A", marginTop: 20 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (flag) setFlag(false);
            else setFlag(true);
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="report" type="octicon" color="white" size={15} />
              <Text style={{ color: "white", paddingLeft: 5 }}>
                Report a Problem
              </Text>
            </View>
            {!flag ? (
              <View style={{ paddingRight: 10 }}>
                <Icon name="angle-down" type="font-awesome" color="white" />
              </View>
            ) : (
              <View style={{ paddingRight: 10 }}>
                <Icon name="angle-up" type="font-awesome" color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {flag == true && (
        <View>
          <TextInput
            placeholder="Please describe your problem below. Limited to 256 characters."
            style={{
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "#80cda1",
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 10,
              borderColor: "white",
              textAlignVertical: "top",
            }}
            placeholderTextColor="white"
            numberOfLines={10}
            multiline
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 5,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => alert("Problem reported")}
            >
              <Icon name="check" type="entypo" color="white" />
              <Text style={{ color: "white" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function AboutDropdown() {
  const [flag, setFlag] = useState(false);

  return (
    <View style={{ backgroundColor: "#4CB97A", marginTop: 20 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (flag) setFlag(false);
            else setFlag(true);
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="info" type="feather" color="white" size={15} />
              <Text style={{ color: "white", paddingLeft: 5 }}>About</Text>
            </View>
            {!flag ? (
              <View style={{ paddingRight: 10 }}>
                <Icon name="angle-down" type="font-awesome" color="white" />
              </View>
            ) : (
              <View style={{ paddingRight: 10 }}>
                <Icon name="angle-up" type="font-awesome" color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {flag == true && (
        <View
          style={{
            flexWrap: "wrap",
            alignItems: "flex-start",
            height: 150,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white" }}>
            App created by Richard Gullo, Nolan Schafer, Michaela Green, Aden
            Carver, Scott McLeod, Donald Poland, Hung Nguyen
          </Text>
          <Text style={{ color: "white" }}>
            Icons: Material Icons (Rounded)
          </Text>
          <Text style={{ color: "white" }}>
            Visit us on the web at flowerpower.io!
          </Text>
        </View>
      )}
    </View>
  );
}

function Logout({ navigation }) {
  return (
    <View style={{ backgroundColor: "#4CB97A", marginTop: 20 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("@storage_Key");
              navigation.navigate("Login");
            } catch (e) {
              console.log(`Could not remove item due to: ${e}`);
            }
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="pencil" type="evilicon" size={20} color="white" />
              <Text style={{ color: "white" }}>Log out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export {
  PasswordDropdown,
  EmailDropdown,
  ProblemDropDown,
  AboutDropdown,
  Logout,
};
