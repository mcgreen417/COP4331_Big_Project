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

function ViewEntry({ navigation, route }) {
  const { itemId } = route.params;
  const id = itemId;
  const { plantEntriesContext } = useContext(GlobalContext);
  const [plantEntries, setPlantEntries] = plantEntriesContext;
  let num = 0;
  const [sunlight, setSunlight] = useState([false, false, false]);
  const [water, setWater] = useState([false, false, false]);

  const index = findEntryIndex(id);

  // Execute after plant entries update and delete has been pressed
  React.useEffect(() => {
    let tempSunlight = [false, false, false];
    let tempWater = [false, false, false];

    for (let i = 0; i < plantEntries[index].sunlight; i++) {
      tempSunlight[i] = true;
    }

    for (let i = 0; i < plantEntries[index].water; i++) {
      tempWater[i] = true;
    }

    setSunlight([...tempSunlight]);
    setWater([...tempWater]);
  }, [plantEntries]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Main Container */}
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
            {/* Tree Image */}
            <Image
              source={plantEntries[index].image}
              style={{
                resizeMode: "stretch",
                height: 200,
                width: 200,
                borderRadius: 5,
              }}
            />
          </View>
        </View>

        {/* Content Container - Blue */}
        <View style={styles.contentContainer}>
          <View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.contentText, styles.ContentTextHeader]}>
                  Plant's Nickname:
                </Text>
                <Text style={styles.contentText}>
                  {plantEntries[index].nickname}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.contentText, styles.ContentTextHeader]}>
                  Plant Species:{" "}
                </Text>
                <Text style={styles.contentText}>
                  {plantEntries[index].species}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={[styles.contentText, styles.ContentTextHeader]}>
                Plant Classification:
              </Text>
              <View style={{ flexDirection: "row" }}>
                {plantEntries[index].classification.map((name) => (
                  <RoundButton key={name} name={name} />
                ))}
              </View>
            </View>
          </View>

          {/* Weather Container */}
          <View style={{ paddingTop: 20, width: "90%" }}>
            {/* Sunlight Set */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={[styles.contentText, styles.ContentTextHeader]}>
                  Sunlight Needed:{" "}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {sunlight.map((name) =>
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

              {/* Water Set */}
              <View>
                <Text style={[styles.contentText, styles.ContentTextHeader]}>
                  Water Needed:
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {water.map((name) =>
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

          {/* Date Acquired */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={[styles.contentText, styles.ContentTextHeader]}>
              Date Acquired:{" "}
            </Text>
            <Text style={styles.contentText}>
              {formatDate(plantEntries[index].date)}
            </Text>
          </View>

          {/* Reminders */}
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
                {plantEntries[index].reminders.watered} days.
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                The plant needs to be{" "}
                <Text style={{ fontWeight: "bold" }}>fertilized</Text> every{" "}
                {plantEntries[index].reminders.fertilized} days.
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                The plant needs to be{" "}
                <Text style={{ fontWeight: "bold" }}>rotated</Text> every{" "}
                {plantEntries[index].reminders.rotated} days.
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                The plant needs to be{" "}
                <Text style={{ fontWeight: "bold" }}>pruned</Text> every{" "}
                {plantEntries[index].reminders.prunned} days.
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                The plant needs to be{" "}
                <Text style={{ fontWeight: "bold" }}>trimmed</Text> every{" "}
                {plantEntries[index].reminders.trimmed} days.
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                The plant needs to be{" "}
                <Text style={{ fontWeight: "bold" }}>replanted</Text> every{" "}
                {plantEntries[index].reminders.replanted} days.
              </Text>
            </View>
          </View>

          {/* Additional Notes Container */}
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
              placeholder={plantEntries[index].notes}
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
              value={plantEntries[index].notes}
            />

            {/* Buttons */}
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
        {/* <Button title = "TestButton" onPress = {() => setUsername("Dusty")} /> */}
        {/* <Button title = "Output" onPress = {() => console.log(plantEntries)} /> */}
      </View>
    </KeyboardAwareScrollView>
  );

  function findEntryIndex(id) {
    for (let i = 0; i < plantEntries.length; i++) {
      if (plantEntries[i].key == id) return i;
    }

    return -1;
  }

  function formatDate(date) {
    let originalDate = date;

    let day;
    let month = -1;
    let year;

    let dateArray = originalDate.split("-");

    switch (dateArray[1].toLowerCase()) {
      case "1":
        month = "January";
        break;
      case "2":
        month = "February";
        break;
      case "3":
        month = "March";
        break;
      case "4":
        month = "April";
        break;
      case "5":
        month = "May";
        break;
      case "6":
        month = "June";
        break;
      case "7":
        month = "July";
        break;
      case "8":
        month = "August";
        break;
      case "9":
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
