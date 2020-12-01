import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import Color from "../constants/colors";
import { Line } from "../components/Line";
import { Icon } from "react-native-elements";
import { PlantReminder } from "../components/PlantReminder";
import { GlobalContext } from "../context/GlobalContext";
import { ConfirmationBox } from "../components/ConfirmationBox";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home({ navigation, route }) {
  // States and Intial values
  const [checkCount, setCheckCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameVal, setUsernameVal] = useState("");

  const { plantEntriesContext } = useContext(GlobalContext);
  const { photoObjectsContext } = useContext(GlobalContext);

  const [plantEntries, setPlantEntries] = plantEntriesContext;
  const [photoObjects, setPhotoObjects] = photoObjectsContext;

  React.useEffect(() => {
    async function fetchImages() {
      const accessToken = await AsyncStorage.getItem("@storage_Key");
      fetch("https://myflowerpower.net/protected/fetchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsernameVal(data.Username);
          let photoObjectss = data.photoObjects.map((item, idx) => {
            item.key = idx.toString();
            return item;
          });
          setPhotoObjects(photoObjectss);
        });
      // .catch((_) => localStorage.clear() && this.props.history.push("/"));
    }

    async function fetchReminders() {
      const accessToken = await AsyncStorage.getItem("@storage_Key");
      fetch("https://myflowerpower.net/protected/fetchReminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPlantEntries(data.reminders);
        });
    }
    fetchImages();
    fetchReminders();
  }, []);

  // Function that updates global when check box is selected.
  // The  idea is that you modify the local global from the server
  // But once we press complete selected, make the server call.
  function toggleCompletedTask(id, checkboxState) {
    let tempArray = [...plantEntries];

    let index = findEntryIndex(id);

    if (checkboxState == true) {
      tempArray[index].completedTask[0] = true;
      setCheckCount(checkCount + 1);
    } else {
      tempArray[index].completedTask[0] = false;
      setCheckCount(checkCount - 1);
    }

    setPlantEntries([...tempArray]);
  }

  // Function that will make the server call (Modal Confirmation Button)
  function completeSelectedTask() {
    let tempArray = [...plantEntries];

    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].completedTask[0] == true)
        tempArray[i].completedTask[1] = true;
    }

    setPlantEntries([...tempArray]);
    setCheckCount(0);
    setModalVisible(false);
  }

  // Cancel Button for confirmation dialogue
  function cancelHandler() {
    console.log("Cancel pressed");
    setModalVisible(false);
  }

  // Launches our Modal when Complete Selected is Pressed.
  function launchModalHandler() {
    setModalVisible(true);
  }

  return (
    // Main Container - Purple
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
            <ConfirmationBox
              onCancel={cancelHandler}
              onDelete={completeSelectedTask}
            />
          </View>
        </Modal>

        {/*Greeting Container */}
        <View style={styles.greetingContainer}>
          <View style={{ justifyContent: "center" }}>
            <Text style={[styles.HeaderText]}>
              Good afternoon, {"\n"}
              {usernameVal}!
            </Text>
            <Text>
              Ready for another day of gardening? {"\n"}Let Flower Power land
              you a hand!
            </Text>
          </View>
          <View>
            <Image source={require("../assets/plant.png")} />
          </View>
        </View>

        <Line />

        {/* Plant Info Container- Horizontal Scroll */}
        <View style={styles.plantInfoContainer}>
          {photoObjects.length !== 0 && (
            <Text>Check Information about your plants below!</Text>
          )}
          {photoObjects.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 150,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                You are currently not watching any plants.
              </Text>
              <Text style={{ fontSize: 16 }}>
                Click New Entry in Tab Bar to add a plant to watch.
              </Text>
            </View>
          ) : (
            <FlatList
              style={{ flexDirection: "row", paddingVertical: 5 }}
              horizontal={true}
              data={photoObjects}
              renderItem={(itemData) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ViewEntry", {
                      itemId: itemData.item.plantId,
                    });
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 5,
                      marginRight: 10,
                      resizeMode: "stretch",
                      height: 100,
                      width: 100,
                    }}
                    source={{ uri: itemData.item.url }}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        {plantEntries.length != 0 && (
          <View>
            <Line />

            <View style={{ paddingVertical: 10 }}>
              <Text>
                You have the following reminders for the following plants...
              </Text>
            </View>
          </View>
        )}

        {/* Plant Reminder Container - Vertical Scroll */}
        <View style={styles.plantReminderContainer}>
          {plantEntries.map((name) => (
            <PlantReminder
              key={name.PlantID}
              plantImage={name.plantUrl}
              nickname={name.Nickname}
              species={name.Species}
              numberOfDays={name.Reminders.watered}
              id={name.PlantID}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  // Function that will grab will return the index of
  // the element in our global array.
  function findEntryIndex(id) {
    for (let i = 0; i < plantEntries.length; i++) {
      if (plantEntries[i].key == id) return i;
    }

    return -1;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.background,
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 20,
    // borderWidth:5, borderColor:'purple'
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth:5, borderColor:'teal'
  },
  plantInfoContainer: {
    paddingVertical: 5,
    // borderWidth:5, borderColor:'red'
  },
  plantReminderContainer: {
    paddingVertical: 10,
    flex: 1,
    // borderWidth:5, borderColor:'red'
  },
  HeaderText: {
    fontSize: 25,
    color: Color.header,
    fontWeight: "bold",
  },
  container: {
    paddingTop: 30,
    // borderWidth:5, borderColor:'purple',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  StatusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: Color.theme,
  },
});

export { Home };
