import React, { useContext, useState } from "react";
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
  Platform,
} from "react-native";
import Color from "../constants/colors";
import { Header } from "../components/Header";
import { Input } from "react-native-elements";
import { RoundButton } from "../components/RoundButton";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { GlobalContext } from "../context/GlobalContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ViewEntry({ navigation, route }) {
  const { itemId } = route.params;
  const id = itemId;
  const [plantEntries, setPlantEntries] = useState([]);
  let num = 0;
  const [sunlight, setSunlight] = useState([false, false, false]);
  const [water, setWater] = useState([false, false, false]);

  // Execute after plant entries update and delete has been pressed
  React.useEffect(() => {
    console.log(id);

    async function fetchViewEntry() {
      const accessToken = await AsyncStorage.getItem("@storage_Key");
      let response = await fetch(
        "https://myflowerpower.net/protected/viewEntry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify({
            plantid: id,
          }),
        }
      );
      let data = await response.json();
      console.log(data);
      setPlantEntries(data);
    }

    fetchViewEntry();
  }, []);

  React.useEffect(() => {
    let tempWater = [false, false, false];
    for (let i = 0; i < plantEntries.Water; i++) {
      tempWater[i] = true;
    }

    setWater([...tempWater]);
    let tempSunlight = [false, false, false];

    for (let i = 0; i < plantEntries.Sunlight; i++) {
      tempSunlight[i] = true;
    }
    setSunlight([...tempSunlight]);
  }, [plantEntries]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.mainContainer}>
        <StatusBar
          barstyle="dark-content"
          hidden={false}
          backgroundColor={Color.theme}
          translucent={true}
        />

        <View style={styles.secondaryContainerHeader}>
          <Image source={require("../assets/header.png")} />
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: plantEntries.plantUrl }}
              style={{
                resizeMode: "stretch",
                height: 200,
                width: 200,
                borderRadius: 5,
              }}
            />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.contentText, styles.ContentTextHeader]}>
                  Plant's Nickname:
                </Text>
                <Text style={styles.contentText}>{plantEntries.Nickname}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.contentText, styles.ContentTextHeader]}>
                  Plant Species:{" "}
                </Text>
                <Text style={styles.contentText}>{plantEntries.Species}</Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={[styles.contentText, styles.ContentTextHeader]}>
                Plant Classification:
              </Text>
              <View style={{ flexDirection: "row" }}>
                {plantEntries.Classification &&
                  plantEntries.Classification.map((name, idx) => (
                    <RoundButton key={idx} name={name} />
                  ))}
              </View>
            </View>
          </View>

          <View style={{ paddingTop: 20, width: "90%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={[styles.contentText, styles.ContentTextHeader]}>
                  Sunlight Needed:{" "}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {sunlight &&
                    sunlight.map((name) =>
                      name == true ? (
                        <Image
                          key={num++}
                          source={require("../assets/sun.png")}
                          resizeMode="cover"
                          style={{ width: 30, height: 30 }}
                        />
                      ) : (
                        <Image
                          key={num++}
                          source={require("../assets/dimmedSun.png")}
                          resizeMode="cover"
                          style={{ width: 30, height: 30 }}
                        />
                      )
                    )}
                </View>
              </View>

              <View>
                <Text style={[styles.contentText, styles.ContentTextHeader]}>
                  Water Needed:
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {water &&
                    water.map((name) =>
                      name == true ? (
                        <Image
                          key={num++}
                          source={require("../assets/cloud.png")}
                          resizeMode="stretch"
                          style={{ width: 30, height: 24 }}
                        />
                      ) : (
                        <Image
                          key={num++}
                          source={require("../assets/dimmedCloud.png")}
                          resizeMode="stretch"
                          style={{ width: 30, height: 24 }}
                        />
                      )
                    )}
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={[styles.contentText, styles.ContentTextHeader]}>
              Date Acquired:{" "}
            </Text>
            <Text style={styles.contentText}>
              {plantEntries.DateAcquired &&
                formatDate(plantEntries.DateAcquired)}
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text
              style={[
                styles.contentText,
                styles.ContentTextHeader,
                { paddingBottom: 5 },
              ]}
            >
              Reminders:
            </Text>
            <View style={{ height: 120, justifyContent: "space-between" }}>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                The plant needs to be{" "}
                <Text style={{ fontWeight: "bold" }}>watered</Text> every{" "}
                {plantEntries.Reminders && plantEntries.Reminders.watered} days.
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                The plant needs to be{" "}
                <Text style={{ fontWeight: "bold" }}>fertilized</Text> every{" "}
                {plantEntries.Reminders && plantEntries.Reminders.fertilized}{" "}
                days.
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                The plant needs to be{" "}
                <Text style={{ fontWeight: "bold" }}>rotated</Text> every{" "}
                {plantEntries.Reminders && plantEntries.Reminders.rotated} days.
              </Text>
            </View>
          </View>

          <View style={styles.additionalNotesContainer}>
            <Text
              style={{
                fontSize: 16,
                color: Color.darkGreen,
                textDecorationLine: "underline",
              }}
            >
              Additional Notes:
            </Text>
            <TextInput
              placeholder={plantEntries.Notes}
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: "white",
                paddingLeft: 10,
                paddingTop: 5,
                marginTop: 5,
                borderColor: Color.theme,
                textAlignVertical: "top",
                paddingVertical: Platform.OS === "ios" ? 5 : 0,
              }}
              placeholderTextColor="black"
              numberOfLines={10}
              multiline
              value={plantEntries.Notes}
            />

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: Color.theme,
                    flexDirection: "row",
                    borderRadius: 5,
                    alignItems: "center",
                    width: 150,
                    paddingVertical: 5,
                    zIndex: 1,
                  }}
                  onPress={() => {
                    navigation.navigate("ModifyEntryHome", { itemId: itemId });
                  }}
                >
                  <Icon
                    name="pencil"
                    type="simple-line-icon"
                    color="white"
                    style={{ paddingLeft: 5 }}
                  />
                  <Text
                    style={{ color: "white", paddingLeft: 10, fontSize: 16 }}
                  >
                    Modify Entry
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: Color.theme,
                    flexDirection: "row",
                    borderRadius: 5,
                    alignItems: "center",
                    width: 150,
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Icon
                    name="md-arrow-back"
                    type="ionicon"
                    color="white"
                    style={{ paddingLeft: 10 }}
                  />
                  <Text
                    style={{ paddingLeft: 10, color: "white", fontSize: 16 }}
                  >
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );

  function formatDate(date) {
    if (!date) {
      return "";
    }

    let day;
    let month = -1;
    let year;

    let dateArray = date.split("-");

    switch (dateArray[1].toLowerCase()) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
    }

    day = dateArray[2];
    year = dateArray[0];
    console.log(dateArray[1]);
    console.log(month);

    let completeDate = `${month} ${day}, ${year}`;

    return completeDate;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // borderWidth:5, borderColor:'purple',
    backgroundColor: Color.background,
    alignItems: "center",
    paddingBottom: 50,
  },
  secondaryContainerHeader: {
    marginTop: Platform.OS === "ios" ? 0 : 11,
    // borderWidth:5, borderColor:'blue',
    alignItems: "center",
    width: "100%",
    height: 307,
  },
  headerContainer: {
    position: "absolute",
    // borderWidth:5, borderColor:'red',
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    // borderWidth:5, borderColor:'blue',
    width: "80%",
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
    borderColor: "red",
    height: 25,
    width: 100,
  },
  weatherContainer: {},
  remindersContainer: {
    // borderWidth:5, borderColor:'blue'
    marginTop: 20,
  },
  additionalNotesContainer: {
    // borderWidth:5, borderColor:'blue',
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
  },
  ContentTextHeader: {
    color: "#358B59",
    textDecorationLine: "underline",
  },
});

export { ViewEntry };
