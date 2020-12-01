import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import Color from "../constants/colors";
import { RoundButtonLarge } from "../components/RoundButtonLarge";
import { Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

function NewEntry({ navigation, route }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
    setSelectedDate(date);
  };

  // Execute after plant entries update and delete has been pressed
  React.useEffect(() => {}, [selectedDate]);

  // Image Picker
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // End Image Picker

  const [toggleSubmit, setToggleSubmit] = useState({});

  function submitEntry() {
    let tempArray = [];
    let sunlight = 0;
    let water = 0;

    for (let button of buttonSet) {
      tempArray.push(button.name);
    }

    for (let i = 0; i < 3; i++) {
      if (sunInput[i] == true) sunlight++;
    }

    for (let i = 0; i < 3; i++) {
      if (waterInput[i] == true) water++;
    }

    let key = (Math.floor(Math.random() * 70) + 30).toString();

    setToggleSubmit({ sunlight: sunlight, water: water, tempArray: tempArray });
  }

  useEffect(() => {
    async function doSubmit() {
      const accessToken = await AsyncStorage.getItem("@storage_Key");
      const response = await fetch(
        "https://myflowerpower.net/protected/newEntry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify({
            plantid: "empty",
            nickname: nicknameInput,
            species: speciesInput,
            sunlight: toggleSubmit.sunlight,
            water: toggleSubmit.water,
            notes: additionalNotesInput,
            date: convertedDate(selectedDate),
            classification: toggleSubmit.tempArray,
            reminders: {
              watered: wateredInput,
              fertilized: fertilizedInput,
              rotated: rotatedInput,
              prunned: prunnedInput,
              trimmed: trimmedInput,
              replanted: replantedInput,
            },
            noPhoto: true,
          }),
        }
      );

      const json = await response.json();
      console.log(json);
    }
    doSubmit();
    navigation.navigate("Home");
  }, [toggleSubmit]);

  const [roundButtons, setRoundButtons] = useState([
    { id: 0, name: "Algae", backgroundColor: Color.theme },
    { id: 1, name: "Flower", backgroundColor: Color.theme },
    { id: 2, name: "Fruit", backgroundColor: Color.theme },
    { id: 3, name: "Grass", backgroundColor: Color.theme },
    { id: 4, name: "Herb", backgroundColor: Color.theme },
    { id: 5, name: "Moss", backgroundColor: Color.theme },
    { id: 6, name: "Orchid", backgroundColor: Color.theme },
    { id: 7, name: "Root", backgroundColor: Color.theme },
    { id: 8, name: "Shrub", backgroundColor: Color.theme },
    { id: 9, name: "Succulent", backgroundColor: Color.theme },
    { id: 10, name: "Tree", backgroundColor: Color.theme },
    { id: 11, name: "Veggie", backgroundColor: Color.theme },
    { id: 12, name: "Vine", backgroundColor: Color.theme },
    { id: 13, name: "Other", backgroundColor: Color.theme },
  ]);

  // Inputs and initial states
  const [nicknameInput, setNicknameInput] = useState("Grape Fruit");
  const [speciesInput, setSpeciesInput] = useState("Roundy Fruit");
  const [wateredInput, setWateredInput] = useState("10");
  const [fertilizedInput, setFertilizedInput] = useState("20");
  const [rotatedInput, setRotatedInput] = useState("30");
  const [prunnedInput, setPrunnedInput] = useState("40");
  const [trimmedInput, setTrimmedInput] = useState("50");
  const [replantedInput, setReplantedInput] = useState("60");
  const [additionalNotesInput, setAdditionalNotesInput] = useState(
    "This is an awesome grape fruit"
  );

  // Sun
  const [sunInput, setSunInput] = useState([false, false, false]);
  const [waterInput, setWaterInput] = useState([false, false, false]);

  const [buttonSet, setButtonSet] = useState([]);

  console.log(buttonSet.length);

  function toggleSun(index) {
    let tempObject = [...sunInput];

    if (tempObject[index]) tempObject[index] = false;
    else tempObject[index] = true;

    setSunInput([...tempObject]);
  }

  function toggleWater(index) {
    let tempObject = [...waterInput];

    if (tempObject[index]) tempObject[index] = false;
    else tempObject[index] = true;

    setWaterInput([...tempObject]);
  }

  // Function that
  function toggleButton(id) {
    // Round buttons - All your buttons
    let tempArray = [...roundButtons];

    // Button set - three button set
    let tempButtonSet = [...buttonSet];

    // Current Button
    let tempButton = { ...roundButtons[id] };

    // Check what the current color of the button is.
    if (tempArray[id].backgroundColor == Color.theme) {
      // If the current length is 3 and we are on to adding a fourth button
      if (tempButtonSet.length == 3) {
        // Id of the button we pop and pop it.
        let poppedId = tempButtonSet[2].id;
        tempButtonSet.pop();

        // Change that button we popped to original
        tempArray[poppedId].backgroundColor = Color.theme;

        // Change the background color
        tempArray[id].backgroundColor = Color.darkGreen;

        // Push to our button set
        tempButtonSet.push(tempArray[id]);

        // Update our button set
        setButtonSet([...tempButtonSet]);

        // Update our round buttons
        setRoundButtons([...tempArray]);
      } else {
        // Change the background color
        tempArray[id].backgroundColor = Color.darkGreen;

        // Push to our button set
        tempButtonSet.push(tempArray[id]);

        // Update our button set
        setButtonSet((currentButtons) => [...currentButtons, tempButton]);

        // Update our round buttons
        setRoundButtons([...tempArray]);
      }
    } else {
      // Change the background color
      tempArray[id].backgroundColor = Color.theme;

      // Get rid of that button from our button set
      tempButtonSet = tempButtonSet.filter((name) => name.id != id);

      // Update our button set and round buttons
      setButtonSet([...tempButtonSet]);
      setRoundButtons([...tempArray]);
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* // Main Container - Purple */}
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
            {/* Image Upload Container - Brown */}
            <View
              style={{
                height: 260,
                width: 260,
                borderWidth: 2,
                borderColor: "#816868",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 150, height: 150 }}
                  />
                ) : (
                  <Image
                    source={require("../assets/path1.png")}
                    style={{ resizeMode: "contain", height: 50, width: 50 }}
                  />
                )}
              </TouchableOpacity>
              <Text style={{ textAlign: "center" }}>
                Click this Panel to upload an image of your plant
              </Text>
            </View>
          </View>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 16, color: "#816868" }}>
                Plant Nickname
              </Text>
              <TextInput
                placeholder="Plant nickname"
                style={{
                  borderColor: "#a5dfb2",
                  borderWidth: 2,
                  borderRadius: 5,
                  backgroundColor: "white",
                  width: "100%",
                  paddingLeft: 10,
                  paddingVertical: Platform.OS === "ios" ? 5 : 0,
                }}
                placeholderTextColor="black"
                onChangeText={(text) => {
                  setNicknameInput(text);
                  console.log(text);
                }}
                value={nicknameInput}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16, color: "#816868" }}>
                Plant Species
              </Text>
              <TextInput
                placeholder="Plant Species"
                style={{
                  borderColor: "#a5dfb2",
                  borderWidth: 2,
                  borderRadius: 5,
                  backgroundColor: "white",
                  width: "100%",
                  paddingLeft: 10,
                  paddingVertical: Platform.OS === "ios" ? 5 : 0,
                }}
                placeholderTextColor="black"
                onChangeText={(text) => setSpeciesInput(text)}
                value={speciesInput}
              />
            </View>
          </View>
        </View>

        {/* Plant Classification Container */}
        <View style={styles.plantClassificationContainer}>
          <Text style={{ fontSize: 16, color: "#816868" }}>
            Plant Classification (Select up to 3)
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <RoundButtonLarge
              name={roundButtons[0].name}
              highlightColor={roundButtons[0].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[0].id)}
            />
            <RoundButtonLarge
              name={roundButtons[1].name}
              highlightColor={roundButtons[1].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[1].id)}
            />
            <RoundButtonLarge
              name={roundButtons[2].name}
              highlightColor={roundButtons[2].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[2].id)}
            />
            <RoundButtonLarge
              name={roundButtons[3].name}
              highlightColor={roundButtons[3].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[3].id)}
            />
            <RoundButtonLarge
              name={roundButtons[4].name}
              highlightColor={roundButtons[4].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[4].id)}
            />
            <RoundButtonLarge
              name={roundButtons[5].name}
              highlightColor={roundButtons[5].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[5].id)}
            />
            <RoundButtonLarge
              name={roundButtons[6].name}
              highlightColor={roundButtons[6].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[6].id)}
            />
            <RoundButtonLarge
              name={roundButtons[7].name}
              highlightColor={roundButtons[7].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[7].id)}
            />
            <RoundButtonLarge
              name={roundButtons[8].name}
              highlightColor={roundButtons[8].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[8].id)}
            />
            <RoundButtonLarge
              name={roundButtons[9].name}
              highlightColor={roundButtons[9].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[9].id)}
            />
            <RoundButtonLarge
              name={roundButtons[10].name}
              highlightColor={roundButtons[10].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[10].id)}
            />
            <RoundButtonLarge
              name={roundButtons[11].name}
              highlightColor={roundButtons[11].backgroundColor}
              onToggle={toggleButton.bind(this, roundButtons[11].id)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "66%",
              }}
            >
              <RoundButtonLarge
                name={roundButtons[12].name}
                highlightColor={roundButtons[12].backgroundColor}
                onToggle={toggleButton.bind(this, roundButtons[12].id)}
              />
              <RoundButtonLarge
                name={roundButtons[13].name}
                highlightColor={roundButtons[13].backgroundColor}
                onToggle={toggleButton.bind(this, roundButtons[13].id)}
              />
            </View>
          </View>
        </View>

        {/* Weather Container */}
        <View style={styles.weatherContainer}>
          {/* Sunlight Set */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={[styles.contentText, styles.ContentTextHeader]}>
                Sunlight Needed:{" "}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => toggleSun(0)}>
                  {sunInput[0] == false ? (
                    <Image
                      source={require("../assets/dimmedSun.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/sun.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 30 }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleSun(1)}>
                  {sunInput[1] == false ? (
                    <Image
                      source={require("../assets/dimmedSun.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/sun.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 30 }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleSun(2)}>
                  {sunInput[2] == false ? (
                    <Image
                      source={require("../assets/dimmedSun.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/sun.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 30 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Water Set */}
            <View>
              <Text style={[styles.contentText, styles.ContentTextHeader]}>
                Water Needed:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => toggleWater(0)}>
                  {waterInput[0] == false ? (
                    <Image
                      source={require("../assets/dimmedCloud.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 24 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/cloud.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 24 }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleWater(1)}>
                  {waterInput[1] == false ? (
                    <Image
                      source={require("../assets/dimmedCloud.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 24 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/cloud.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 24 }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleWater(2)}>
                  {waterInput[2] == false ? (
                    <Image
                      source={require("../assets/dimmedCloud.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 24 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/cloud.png")}
                      resizeMode="cover"
                      style={{ width: 30, height: 24 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Date Acquired Container */}
        <View style={{ width: "85%", paddingTop: 20, paddingLeft: 10 }}>
          <Text style={{ fontSize: 16, color: Color.header }}>
            Date Acquired
          </Text>
          <Text
            style={{ color: Color.darkGreen, zIndex: 1 }}
            onPress={showDatePicker}
          >
            Click here to select date
          </Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text>{formatDateEntry(selectedDate)}</Text>
        </View>

        {/* Reminders Container */}
        <View style={styles.remindersContainer}>
          <Text style={{ color: Color.header }}>
            <Text
              style={{ fontSize: 16, color: Color.header, fontWeight: "bold" }}
            >
              Reminders
            </Text>{" "}
            (Leave the number blank if not applicable. )
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Color.header }}>
              This plant needs to be{" "}
              <Text style={{ fontWeight: "bold" }}>watered</Text> every{" "}
            </Text>
            <TextInput
              placeholder="##"
              style={{
                borderColor: "#a5dfb2",
                borderWidth: 2,
                borderRadius: 5,
                backgroundColor: "white",
                paddingLeft: 10,
                marginHorizontal: 5,
              }}
              onChangeText={(text) => setWateredInput(text)}
              value={wateredInput}
            />
            <Text style={{ color: Color.header }}>days</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Color.header }}>
              This plant needs to be{" "}
              <Text style={{ fontWeight: "bold" }}>fertilized</Text> every{" "}
            </Text>
            <TextInput
              placeholder="##"
              style={{
                borderColor: "#a5dfb2",
                borderWidth: 2,
                borderRadius: 5,
                backgroundColor: "white",
                paddingLeft: 10,
                marginHorizontal: 5,
              }}
              onChangeText={(text) => setFertilizedInput(text)}
              value={fertilizedInput}
            />
            <Text style={{ color: Color.header }}>days</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Color.header }}>
              This plant needs to be{" "}
              <Text style={{ fontWeight: "bold" }}>rotated</Text> every{" "}
            </Text>
            <TextInput
              placeholder="##"
              style={{
                borderColor: "#a5dfb2",
                borderWidth: 2,
                borderRadius: 5,
                backgroundColor: "white",
                paddingLeft: 10,
                marginHorizontal: 5,
              }}
              onChangeText={(text) => setRotatedInput(text)}
              value={rotatedInput}
            />
            <Text style={{ color: Color.header }}>days</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Color.header }}>
              This plant needs to be{" "}
              <Text style={{ fontWeight: "bold" }}>pruned</Text> every{" "}
            </Text>
            <TextInput
              placeholder="##"
              style={{
                borderColor: "#a5dfb2",
                borderWidth: 2,
                borderRadius: 5,
                backgroundColor: "white",
                paddingLeft: 10,
                marginHorizontal: 5,
              }}
              onChangeText={(text) => setPrunnedInput(text)}
              value={prunnedInput}
            />
            <Text style={{ color: Color.header }}>days</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Color.header }}>
              This plant needs to be{" "}
              <Text style={{ fontWeight: "bold" }}>trimmed</Text> every{" "}
            </Text>
            <TextInput
              placeholder="##"
              style={{
                borderColor: "#a5dfb2",
                borderWidth: 2,
                borderRadius: 5,
                backgroundColor: "white",
                paddingLeft: 10,
                marginHorizontal: 5,
              }}
              onChangeText={(text) => setTrimmedInput(text)}
              value={trimmedInput}
            />
            <Text style={{ color: Color.header }}>days</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Color.header }}>
              This plant needs to be{" "}
              <Text style={{ fontWeight: "bold" }}>replanted</Text> every{" "}
            </Text>
            <TextInput
              placeholder="##"
              style={{
                borderColor: "#a5dfb2",
                borderWidth: 2,
                borderRadius: 5,
                backgroundColor: "white",
                paddingLeft: 10,
                marginHorizontal: 5,
              }}
              onChangeText={(text) => setReplantedInput(text)}
              value={replantedInput}
            />
            <Text style={{ color: Color.header }}>days</Text>
          </View>
        </View>

        {/* Additional Notes Container */}
        <View style={styles.additionalNotesContainer}>
          <Text style={{ fontSize: 16, color: Color.header }}>
            Additional Notes
          </Text>
          <TextInput
            placeholder="Write any additional notes you'd like to keep about your plant here."
            style={{
              borderColor: Color.theme,
              borderWidth: 1,
              backgroundColor: "white",
              borderRadius: 5,
              paddingLeft: 10,
              paddingTop: 5,
              marginTop: 5,
              textAlignVertical: "top",
              paddingVertical: Platform.OS === "ios" ? 5 : 0,
            }}
            placeholderTextColor="black"
            numberOfLines={10}
            multiline
            onChangeText={(text) => setAdditionalNotesInput(text)}
            value={additionalNotesInput}
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
                  zIndex: 5,
                }}
                onPress={() => {
                  submitEntry();
                }}
              >
                <Icon
                  name="pencil"
                  type="simple-line-icon"
                  color="white"
                  style={{ paddingLeft: 5 }}
                />
                <Text style={{ color: "white", paddingLeft: 10, fontSize: 16 }}>
                  Create Entry
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Color.theme,
                  flexDirection: "row",
                  borderRadius: 5,
                  alignItems: "center",
                  width: 150,
                  zIndex: 5,
                }}
                onPress={() => navigation.navigate("Home")}
              >
                <Icon
                  name="md-close"
                  type="ionicon"
                  color="white"
                  style={{ paddingLeft: 10 }}
                />
                <Text style={{ paddingLeft: 10, color: "white", fontSize: 16 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );

  // Display Date Selection
  function formatDateEntry(date) {
    let tempDate = date.toString().split(" ");
    let month = tempDate[1];
    let day = tempDate[2];
    let year = tempDate[3];

    return `${month} ${day}, ${year}`;
  }

  // Convert Date Selection to add to Global on Submit
  function convertedDate(date) {
    let originalDate = date.toString();

    let day;
    let month = -1;
    let year;

    let dateArray = originalDate.split(" ");

    switch (dateArray[1].toLowerCase()) {
      case "jan":
        month = 1;
        break;
      case "feb":
        month = 2;
        break;

      case "mar":
        month = 3;
        break;

      case "apr":
        month = 4;
        break;
      case "may":
        month = 5;
        break;
      case "jun":
        month = 6;
        break;
      case "jul":
        month = 7;
        break;
      case "aug":
        month = 8;
        break;
      case "sep":
        month = 9;
        break;
      case "oct":
        month = 10;
        break;
      case "nov":
        month = 11;
        break;
      case "dec":
        month = 12;
        break;
    }

    day = dateArray[2];
    year = dateArray[3];
    console.log(dateArray[1]);
    console.log(month);

    let completeDate = `${year}-${month}-${day}`;

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
    height: 290,
    width: "100%",
  },
  headerContainer: {
    position: "absolute",
    // borderWidth:5, borderColor:'red',
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    // borderWidth:5, borderColor:'teal',
    width: "80%",
  },
  plantClassificationContainer: {
    // borderWidth:5, borderColor:'teal',
    marginTop: 10,
    width: "80%",
  },
  weatherContainer: {
    paddingTop: 20,
    width: "80%",
    // borderWidth:5, borderColor:'red'
  },
  remindersContainer: {
    // borderWidth:5, borderColor:'blue'
    marginTop: 20,
  },
  additionalNotesContainer: {
    // borderWidth:5, borderColor:'blue',
    marginTop: 20,
    width: "85%",
  },
  HeaderText: {
    fontSize: 25,
    color: Color.header,
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 16,
  },
  ContentTextHeader: {
    color: Color.header,
  },
});

export { NewEntry };
