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

function Home({ navigation, route }) {
  // States and Intial values
  const [checkCount, setCheckCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { plantEntriesContext } = useContext(GlobalContext);

  const [plantEntries, setPlantEntries] = plantEntriesContext;

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
              Good afternoon, {"\n"}Username!
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
          {plantEntries.length != 0 && (
            <Text>Check Information about your plants below!</Text>
          )}
          {plantEntries.length == 0 ? (
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
              data={plantEntries}
              renderItem={(itemData) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ViewEntry", {
                      itemId: itemData.item.key,
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
                    source={itemData.item.image}
                  />
                </TouchableOpacity>
              )}
            />
          )}

          {/* Search */}
          {plantEntries.length != 0 && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TextInput
                style={{ textAlign: "right" }}
                placeholder="Or click here to search for a specific plant..."
                placeholderTextColor="black"
              />
              <Icon name="search" type="material" color={Color.header} />
            </View>
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
          {plantEntries.map(
            (name) =>
              name.completedTask[1] == false && (
                <PlantReminder
                  key={name.key}
                  plantImage={name.image}
                  nickname={name.nickname}
                  species={name.species}
                  numberOfDays={name.reminders.watered}
                  id={name.key}
                  onToggleCompletedTask={toggleCompletedTask}
                />
              )
          )}
        </View>

        {plantEntries.length != 0 && (
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            {/* Complete Selected Button */}
            {checkCount == 0 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: Color.theme,
                  flexDirection: "row",
                  borderRadius: 5,
                  alignItems: "center",
                  width: 180,
                  paddingVertical: 5,
                  zIndex: 1,
                }}
              >
                <Icon
                  name="check"
                  type="entypo"
                  color="white"
                  style={{ paddingLeft: 5 }}
                />
                <Text style={{ paddingLeft: 5, color: "white", fontSize: 16 }}>
                  Complete Selected{" "}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: Color.theme,
                  flexDirection: "row",
                  borderRadius: 5,
                  alignItems: "center",
                  width: 200,
                  paddingVertical: 5,
                  zIndex: 1,
                }}
                onPress={() => launchModalHandler()}
              >
                <Icon
                  name="check"
                  type="entypo"
                  color="white"
                  style={{ paddingLeft: 5 }}
                />
                <Text style={{ paddingLeft: 5, color: "white", fontSize: 16 }}>
                  Complete Selected{" "}
                  {checkCount > 0 && <Text>({checkCount})</Text>}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* <Button title = "TestButton" onPress = {() => setUsername("Dusty")} /> */}
        {/* <Button title = "Output" onPress = {() => console.log(plantEntries)} /> */}
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
