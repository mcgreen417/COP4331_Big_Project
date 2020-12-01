import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import Color from "../constants/colors";
import { Line } from "../components/Line";
import { DottedLine } from "../components/DottedLine";
import Dash from "react-native-dash";
import { Input } from "react-native-elements";
import { BrownButton } from "../components/BrownButton";
import { Icon } from "react-native-elements";
import { myPlants, plantReminders } from "../constants/plants";
import { PlantEntry } from "../components/PlantEntry";
import { DialogueBox } from "../components/DialogueBox";
import { CheckBox } from "react-native-elements";
import { GlobalContext } from "../context/GlobalContext";

function Search({ navigation }) {
  const { plantEntriesContext } = useContext(GlobalContext);
  const [checkCount, setCheckCount] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [plantEntries, setPlantEntries] = plantEntriesContext;
  const [filteredArray, setFilteredArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [deletePressed, setDeletePressed] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [sortButtons, setSortButtons] = useState([
    { id: 1, backgroundColor: Color.header, color: "white" },
    { id: 2, backgroundColor: Color.background, color: Color.header },
    { id: 3, backgroundColor: Color.background, color: Color.header },
    { id: 4, backgroundColor: Color.background, color: Color.header },
  ]);

  // Execute after plant entries update and delete has been pressed
  // React.useEffect(() => {
  //   if (searchInput.length != 0 && deletePressed == true)
  //     filterTable(searchInput);
  // }, [plantEntries]);

  // Execute to filter global based on text input
  function filterTable(text) {
    return;
    let tempArray = [];

    for (let i = 0; i < plantEntries.length; i++) {
      if (plantEntries[i].nickname.toLowerCase().includes(text.toLowerCase()))
        tempArray.push(plantEntries[i]);
    }

    setFilteredArray([...tempArray]);
  }

  function cancelHandler() {
    console.log("Cancel pressed");
    setModalVisible(false);
  }

  function deleteHandler() {
    return;
    setDeletePressed(true);
    setPlantEntries((currentPlants) => {
      return currentPlants.filter((name) => name.deleteEntry == false);
    });
    console.log("Delete Pressed");
    setCheckCount(0);
    // alert('Entry has been deleted');
    setModalVisible(false);
  }

  function toggleDeleteHandler(id, checkboxState) {
    let tempArray = [...plantEntries];
    let index = findEntryIndex(id);

    if (checkboxState == true) {
      tempArray[index].deleteEntry = true;
      setCheckCount(checkCount + 1);
    } else {
      tempArray[index].deleteEntry = false;
      setCheckCount(checkCount - 1);
    }

    setPlantEntries([...tempArray]);
  }

  function launchModalHandler() {
    setModalVisible(true);
  }

  function toggleSort(id) {
    let tempObject = [...sortButtons];

    if (id == 1) {
      sortByNickName();
    } else if (id == 2) {
      sortBySpecies();
    } else if (id == 3) {
      sortByClassification();
    } else {
      sortByDate();
    }

    for (let i = 0; i < tempObject.length; i++) {
      if (tempObject[i].id == id) {
        tempObject[i].backgroundColor = Color.header;
        tempObject[i].color = "white";
      } else {
        tempObject[i].backgroundColor = Color.background;
        tempObject[i].color = Color.header;
      }
    }

    setSortButtons(tempObject);
  }

  // Sorts By NickName
  function sortByNickName() {
    return;
    let tempEntries;

    if (searchInput.length == 0) tempEntries = [...plantEntries];
    else tempEntries = [...filteredArray];

    tempEntries = tempEntries.sort((a, b) => {
      if (a.nickname.toLowerCase() > b.nickname.toLowerCase()) return 1;
      else if (a.nickname.toLowerCase() < b.nickname.toLowerCase()) return -1;
      else return 0;
    });

    if (searchInput.length == 0) setPlantEntries([...tempEntries]);
    else setFilteredArray([...tempEntries]);
  }

  function sortBySpecies() {
    let tempEntries = [...plantEntries];

    tempEntries = tempEntries.sort((a, b) => {
      if (a.species.toLowerCase() > b.species.toLowerCase()) return 1;
      else if (a.species.toLowerCase() < b.species.toLowerCase()) return -1;
      else return 0;
    });

    setPlantEntries([...tempEntries]);
  }

  function sortByClassification() {
    let tempEntries = [...plantEntries];

    tempEntries = tempEntries.sort((a, b) => {
      if (a.classification[0].toLowerCase() > b.classification[0].toLowerCase())
        return 1;
      else if (
        a.classification[0].toLowerCase() < b.classification[0].toLowerCase()
      )
        return -1;
      else return 0;
    });

    setPlantEntries([...tempEntries]);
  }

  function sortByDate() {
    return;
    let tempEntries;

    if (searchInput.length == 0) tempEntries = [...plantEntries];
    else tempEntries = [...filteredArray];

    tempEntries = tempEntries.sort((a, b) => {
      return new Date(convertDate(a.date)) - new Date(convertDate(b.date));
    });

    if (searchInput.length == 0) setPlantEntries([...tempEntries]);
    else setFilteredArray([...tempEntries]);
  }

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.mainContainer}>
        <StatusBar
          barstyle="dark-content"
          hidden={false}
          backgroundColor={Color.theme}
          translucent={true}
        />

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={{ ...styles.container }}>
            <DialogueBox onCancel={cancelHandler} onDelete={deleteHandler} />
          </View>
        </Modal>

        {/* Search Container - Blue */}
        <View style={styles.searchContainer}>
          <View>
            <Text style={{ color: Color.header, fontSize: 16 }}>
              Enter a phrase below to search through your saved plants. Plants
              with a nickname or species matching the search name will be shown
            </Text>
          </View>
          <View style={{ paddingTop: 10, alignItems: "center" }}>
            <TextInput
              placeholder="Search Criteria"
              style={{
                borderColor: "#a5dfb2",
                borderWidth: 2,
                borderRadius: 5,
                backgroundColor: "white",
                paddingLeft: 10,
                width: "100%",
              }}
              placeholderTextColor="black"
              onChangeText={(text) => {
                filterTable(text);
                setSearchInput(text);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckBox
                checked={toggleCheckBox}
                onPress={() => setToggleCheckBox(!toggleCheckBox)}
              />
              <Text style={{ textAlign: "center" }}>
                Display partial matches
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="search" type="material" color={Color.header} />
              <Text style={{ color: Color.header }}>Search</Text>
            </View>
          </View>
        </View>

        <Line />

        {/* Sorting Container - Red */}
        <View style={styles.sortingContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Sort results by: </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <BrownButton data={sortButtons[0]} onSort={toggleSort}>
                Nickname
              </BrownButton>
              <BrownButton data={sortButtons[1]} onSort={toggleSort}>
                Species
              </BrownButton>
              <BrownButton data={sortButtons[2]} onSort={toggleSort}>
                Classification
              </BrownButton>
              <BrownButton data={sortButtons[3]} onSort={toggleSort}>
                Date
              </BrownButton>
            </View>
            <View>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: Color.header,
                    paddingHorizontal: 2,
                  }}
                >
                  <Icon
                    name="md-arrow-down"
                    type="ionicon"
                    color="white"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingTop: 20 }}>
            <Text>
              Currently displaying search results for: "{searchInput}"
            </Text>
          </View>

          {/* Vertical Scroll List - Plant Reminders */}

          {/* <View style={{ paddingTop: 20, flex: 1 }}>
            {searchInput.length == 0 &&
              plantEntries.map((name) => (
                <PlantEntry
                  key={name.key}
                  id={name.key}
                  classification={[...name.classification]}
                  nickname={name.nickname}
                  species={name.species}
                  date={formatDate(name.date)}
                  image={name.image}
                  onModal={launchModalHandler}
                  onToggleDelete={toggleDeleteHandler}
                />
              ))}

            {searchInput.length != 0 &&
              filteredArray.map((name) => (
                <PlantEntry
                  key={name.key}
                  id={name.key}
                  classification={[...name.classification]}
                  nickname={name.nickname}
                  species={name.species}
                  date={formatDate(name.date)}
                  image={name.image}
                  onModal={launchModalHandler}
                  onToggleDelete={toggleDeleteHandler}
                />
              ))}
          </View> */}
        </View>

        {plantEntries.length == 0 && (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>
              You are currently not watching any plants.
            </Text>
            <Text style={{ fontSize: 16 }}>
              Add a plant in New Entry Tab to have seach history.
            </Text>
          </View>
        )}

        {/* Delete Button */}
        {plantEntries.length != 0 && (
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            {checkCount == 0 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: Color.theme,
                  flexDirection: "row",
                  borderRadius: 5,
                  alignItems: "center",
                  width: 170,
                  paddingVertical: 5,
                }}
                onPress={() => launchModalHandler()}
              >
                <Icon
                  name="md-close"
                  type="ionicon"
                  color="white"
                  style={{ paddingLeft: 10 }}
                />
                <Text style={{ paddingLeft: 10, color: "white", fontSize: 16 }}>
                  Delete Selected
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: Color.theme,
                  flexDirection: "row",
                  borderRadius: 5,
                  alignItems: "center",
                  width: 180,
                  paddingVertical: 5,
                }}
                onPress={() => launchModalHandler()}
              >
                <Icon
                  name="md-close"
                  type="ionicon"
                  color="white"
                  style={{ paddingLeft: 10 }}
                />
                <Text style={{ paddingLeft: 10, color: "white", fontSize: 16 }}>
                  Delete Selected ({checkCount})
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* <Button title = "TestButton" onPress = {() => setUsername("Dusty")} /> */}
      {/* <Button title = "Output" onPress = {() => console.log(plantEntries)} /> */}
    </ScrollView>
  );

  function findEntryIndex(id) {
    for (let i = 0; i < plantEntries.length; i++) {
      if (plantEntries[i].key == id) return i;
    }

    console.log("Could not find index in findEntry function");

    return -1;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.background,
    marginTop: 25,
    // borderWidth:5, borderColor:'purple',
    paddingBottom: 25,
    alignItems: "center",
  },
  searchContainer: {
    // borderWidth:5, borderColor:'blue',
    paddingTop: 19,
    width: "90%",
  },
  sortingContainer: {
    // orderWidth:5, borderColor:'red',
    width: "95%",
    flex: 1,
  },
  container: {
    paddingTop: 30,
    // borderWidth:5, borderColor:'purple',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

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

function convertDate(givenDate) {
  let tempDate = givenDate.split("-");

  console.log(tempDate[0]);
  console.log(tempDate[1]);
  console.log(tempDate[2]);

  let month = tempDate[1];
  let day = tempDate[2];
  let year = tempDate[0];

  let date = `${month}/${day}/${year}`;

  return date;
}

export { Search };
