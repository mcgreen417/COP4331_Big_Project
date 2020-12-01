import React, { useContext, useEffect, useState } from "react";
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
  ScrollView,
} from "react-native";
import Color from "../constants/colors";
import { Header } from "../components/Header";
import { Input } from "react-native-elements";
import { RoundButton } from "../components/RoundButton";
import { RoundButtonLarge } from "../components/RoundButtonLarge";
import { Icon } from "react-native-elements";
import { GlobalContext } from "../context/GlobalContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function ModifyEntrySearch({ navigation, route }) {
  const { itemId } = route.params;

  console.log(itemId);

  const { plantEntriesContext } = useContext(GlobalContext);

  const [plantEntries, setPlantEntries] = plantEntriesContext;

  const [toggleSubmit, setToggleSubmit] = useState(false);

  let index = findEntryIndex(itemId);

  // ---- Date Variables
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

  // -- End Date Variables

  const [buttonSet, setButtonSet] = useState([]);

  useEffect(() => {
    let tempSunlight = [false, false, false];
    let tempWater = [false, false, false];

    for (let i = 0; i < plantEntries[index].sunlight; i++) {
      tempSunlight[i] = true;
    }

    for (let i = 0; i < plantEntries[index].water; i++) {
      tempWater[i] = true;
    }

    setSunInput([...tempSunlight]);
    setWaterInput([...tempWater]);

    initialbuttonSet(index);
  }, []); // <-- empty dependency array

  // Function when the user Clicks Confirm Edit
  function confirmEntry() {
    let tempArray = [...plantEntries];
    let tempButtonArray = [];

    let sunlight = 0;
    let water = 0;

    for (let i = 0; i < 3; i++) {
      if (sunInput[i] == true) sunlight++;

      if (waterInput[i] == true) water++;
    }

    for (let button of buttonSet) {
      tempButtonArray.push(button.name);
    }

    let myTempArray = {
      key: tempArray[index].key,
      nickname: nicknameInput,
      species: speciesInput,
      date: convertedDate(selectedDate),
      classification: [...tempButtonArray],
      image: tempArray[index].image,
      reminders: {
        watered: wateredInput,
        fertilized: fertilizedInput,
        rotated: rotatedInput,
        prunned: prunnedInput,
        trimmed: trimmedInput,
        replanted: replantedInput,
      },
      water: water,
      sunlight: sunlight,

      notes: additionalNotesInput,
      completedTask: [
        plantEntries[index].completedTask[0],
        plantEntries[index].completedTask[1],
      ],
      deleteEntry: plantEntries[index].deleteEntry,
    };

    tempArray[index] = myTempArray;

    setPlantEntries([...tempArray]);

    setToggleSubmit(true);
  }

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

  // Inputs
  const [nicknameInput, setNicknameInput] = useState(
    plantEntries[index].nickname
  );
  const [speciesInput, setSpeciesInput] = useState(plantEntries[index].species);
  const [wateredInput, setWateredInput] = useState(
    plantEntries[index].reminders.watered.toString()
  );
  const [fertilizedInput, setFertilizedInput] = useState(
    plantEntries[index].reminders.fertilized.toString()
  );
  const [rotatedInput, setRotatedInput] = useState(
    plantEntries[index].reminders.rotated.toString()
  );
  const [prunnedInput, setPrunnedInput] = useState(
    plantEntries[index].reminders.prunned.toString()
  );
  const [trimmedInput, setTrimmedInput] = useState(
    plantEntries[index].reminders.trimmed.toString()
  );
  const [replantedInput, setReplantedInput] = useState(
    plantEntries[index].reminders.replanted.toString()
  );
  const [additionalNotesInput, setAdditionalNotesInput] = useState(
    plantEntries[index].notes.toString()
  );

  const [sunInput, setSunInput] = useState([false, false, false]);
  const [waterInput, setWaterInput] = useState([false, false, false]);

  useEffect(() => {
    initialbuttonSet(index);
  }, []); // <-- empty dependency array

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <View style={{ justifyContent: "center", alignItems: "center" }}>
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

        {/* Current Date Acquired Container */}
        <View style={{ width: "85%", paddingTop: 20, paddingLeft: 10 }}>
          <Text style={{ fontSize: 16, color: Color.header }}>
            Current Date Acquired
          </Text>
          <Text>{formatDate(plantEntries[index].date)}</Text>
        </View>

        {/* New Date Selection Container */}
        <View
          style={{
            width: "85%",
            paddingTop: 20,
            paddingLeft: 10,
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 16, color: Color.header }}>
            New Date Selection
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
                marginHorizontal: 5,
                paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
                paddingLeft: Platform.OS === "ios" ? 10 : 10,
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
                marginHorizontal: 5,
                paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
                paddingLeft: Platform.OS === "ios" ? 10 : 10,
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
                marginHorizontal: 5,
                paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
                paddingLeft: Platform.OS === "ios" ? 10 : 10,
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
                marginHorizontal: 5,
                paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
                paddingLeft: Platform.OS === "ios" ? 10 : 10,
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
                marginHorizontal: 5,
                paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
                paddingLeft: Platform.OS === "ios" ? 10 : 10,
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
                marginHorizontal: 5,
                paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
                paddingLeft: Platform.OS === "ios" ? 10 : 10,
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
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "white",
              borderRadius: 5,
              paddingLeft: 10,
              paddingTop: 5,
              marginTop: 5,
              borderColor: Color.theme,
              textAlignVertical: "top",
              paddingVertical: Platform.OS ? 5 : 0,
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
                }}
                onPress={() => {
                  confirmEntry();
                  navigation.goBack();
                }}
              >
                <Icon
                  name="pencil"
                  type="simple-line-icon"
                  color="white"
                  style={{ paddingLeft: 5 }}
                />
                <Text style={{ color: "white", paddingLeft: 10, fontSize: 16 }}>
                  Confirm Edit
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
                onPress={() => navigation.goBack()}
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

        {/* <Button title = "Output" onPress = {() => console.log(plantEntries)} /> */}
      </View>
    </ScrollView>
  );

  function findEntryIndex(id) {
    for (let i = 0; i < plantEntries.length; i++) {
      if (plantEntries[i].key == id) return i;
    }

    return -1;
  }

  function initialbuttonSet(index) {
    let tempButtonSet = [];
    let tempRoundButtonSet = [...roundButtons];
    for (let i = 0; i < plantEntries[index].classification.length; i++) {
      for (let j = 0; j < roundButtons.length; j++) {
        if (
          plantEntries[index].classification[i].toLowerCase() ==
          roundButtons[j].name.toLowerCase()
        ) {
          tempButtonSet.push(roundButtons[j]);
          tempRoundButtonSet[j].backgroundColor = Color.darkGreen;
          break;
        }
      }
    }

    setButtonSet([...tempButtonSet]);
    // setRoundButtons(...tempRoundButtonSet);
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

export { ModifyEntrySearch };
