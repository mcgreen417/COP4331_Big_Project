import React, {useState,useEffect} from 'react'
import {Text, View, Button, StyleSheet,StatusBar, Image,TouchableOpacity, TextInput, ScrollView, FlatList, Modal} from 'react-native'
import Color from '../constants/colors';
import {Line} from '../components/Line'
import {DottedLine} from '../components/DottedLine'
import Dash from 'react-native-dash';
import { Input } from 'react-native-elements';
import {BrownButton} from '../components/BrownButton'
import {Icon} from 'react-native-elements'
import {myPlants, plantReminders} from '../constants/plants'
import {PlantEntry} from '../components/PlantEntry'
import { DialogueBox } from '../components/DialogueBox';
import { CheckBox } from 'react-native-elements'


function Search({navigation})
{
    const [modalVisible, setModalVisible] = useState(false);
    const [plantEntries, setPlantEntries] = useState([...plantReminders]);
    const [currentEntry, setCurrentEntry] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    
    const [sortButtons, setSortButtons] = useState([
        {id:1, backgroundColor:Color.header, color:'white'},
        {id:2, backgroundColor:Color.background, color:Color.header},
        {id:3, backgroundColor:Color.background, color:Color.header},
        {id:4, backgroundColor:Color.background, color:Color.header},
    ]);


    var tempArray = [];

    React.useEffect(() =>{
        filterTable();
    },[searchInput])

    React.useEffect(() =>{

        if(searchInput.length != 0)
            filterTable();
    },[plantEntries])

    function filterTable()
    {
        tempArray = [];
        for(let i = 0; i < plantEntries.length; i++)
        {
            if(plantEntries[i].nickname.toLowerCase().includes(searchInput.toLowerCase()))
                tempArray.push (plantEntries[i]);
        }

        setFilteredArray([...tempArray]);
    }

    function cancelHandler()
    {
        console.log("Cancel pressed");
        setModalVisible(false);
    }

    function deleteHandler()
    {
        let id = parseInt(currentEntry);
        setPlantEntries(currentPlants => {return (currentPlants.filter((name) => parseInt(name.key) != id))})
        console.log("Delete Pressed");
        // alert('Entry has been deleted');
        setModalVisible(false);
    }

    function launchModalHandler(id)
    {
        setModalVisible(true);
        setCurrentEntry(id);
    }

    function toggleSort(id)
    {
        let tempObject = [...sortButtons];

        if(id == 1)
        {
            sortByNickName();
        }
        else if(id == 2)
        {
            sortBySpecies();
        }
        else if(id == 3)
        {
            sortByClassification();
        }
        else
        {
            sortByDate();
        }

        for(let i = 0; i < tempObject.length; i++)
        {
            if(tempObject[i].id == id)
            {
                tempObject[i].backgroundColor = Color.header;
                tempObject[i].color = 'white';
            }
            else
            {
                tempObject[i].backgroundColor = Color.background;
                tempObject[i].color = Color.header;
            }
        }

        setSortButtons(tempObject);
    }

    // Sorts By NickName
    function sortByNickName()
    {
        let tempEntries = [...plantEntries];


        tempEntries = tempEntries.sort((a,b) =>{
            if(a.nickname.toLowerCase() > b.nickname.toLowerCase())
                return 1;
            else if(a.nickname.toLowerCase() < b.nickname.toLowerCase())
                return -1;
            else
                return 0;
        })

        setPlantEntries([...tempEntries]);
  
    }
  
    function sortBySpecies()
    {
        let tempEntries = [...plantEntries];


        tempEntries = tempEntries.sort((a,b) =>{
            if(a.species.toLowerCase() > b.species.toLowerCase())
                return 1;
            else if(a.species.toLowerCase() < b.species.toLowerCase())
                return -1;
            else
                return 0;
        })

        setPlantEntries([...tempEntries]);
  
    }
  
    function sortByClassification()
    {
        let tempEntries = [...plantEntries];

        tempEntries = tempEntries.sort((a,b) =>{
            if(a.classification.toLowerCase() > b.classification.toLowerCase())
                return 1;
            else if(a.classification.toLowerCase() < b.classification.toLowerCase())
                return -1;
            else
                return 0;
        })

        setPlantEntries([...tempEntries]);
  
    }

    function sortByDate()
    {
        let tempEntries = [...plantEntries];


        tempEntries = tempEntries.sort((a,b) => {
            return new Date(convertDate(a.date)) - new Date(convertDate(b.date));
        });

        setPlantEntries([...tempEntries]);
    }


        

    return (
        <ScrollView nestedScrollEnabled = {true}>
            <View style = {styles.mainContainer}>
                <StatusBar barstyle = "dark-content" hidden = {false} backgroundColor = {Color.theme} translucent = {true}/>

                <Modal visible = {modalVisible} animationType = "slide" transparent = {true}>
                    <View style = {{...styles.container}}>
                        <DialogueBox onCancel = {cancelHandler} onDelete = {deleteHandler}/>
                    </View>
                </Modal>

                {/* Search Container - Blue */}
                <View style = {styles.searchContainer}>
                    <View>   
                        <Text style = {{color: Color.header, fontSize:16}}>
                            Enter a phrase below to search through your saved plants. Plants with a nickname or species matching the search name will be shown
                        </Text>
                    </View>
                    <View style = {{paddingTop:10, alignItems:'center'}}>
                        <TextInput 
                            placeholder = "Search Criteria"
                            style = {{borderColor:'#a5dfb2', borderWidth:2,borderRadius:5,backgroundColor:'white',paddingLeft:10, width:'100%'}}
                            placeholderTextColor = 'black'
                            onChangeText = {text => {
                                                    setSearchInput(text); 
                            }}
                        />
                    </View>
                    <View style = {{flexDirection:'row',paddingBottom:10, justifyContent:'space-between', alignItems:'center'}}>
                        <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <CheckBox
                                checked = {toggleCheckBox}
                                onPress = {() => setToggleCheckBox(!toggleCheckBox)}
                            />
                            <Text style = {{textAlign:'center'}}>Display partial matches</Text>
                        </View>
                        <View style = {{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                            <Icon name = 'search' type = "material" color = {Color.header}/>
                            <Text style = {{color:Color.header}}>Search</Text>
                        </View>
                    </View>
                </View>

                <Line/>

                {/* Sorting Container - Red */}
                <View style = {styles.sortingContainer}>
                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text>Sort results by: </Text>
                        <View style = {{flexDirection:'row',alignItems:'flex-start'}}>
                        <BrownButton data = {sortButtons[0]} onSort = {toggleSort}>Nickname</BrownButton>
                        <BrownButton data = {sortButtons[1]} onSort = {toggleSort}>Species</BrownButton>
                        <BrownButton data = {sortButtons[2]} onSort = {toggleSort}>Classification</BrownButton>
                        <BrownButton data = {sortButtons[3]} onSort = {toggleSort}>Date</BrownButton>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <View style = {{backgroundColor: Color.header,paddingHorizontal:2}}>
                                    <Icon name ='md-arrow-down' type = 'ionicon' color = "white" size = {20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style = {{paddingTop:20}}>
                        <Text>Currently displaying search results for: "Silly"</Text>
                    </View>

                    {/* Vertical Scroll List - Plant Reminders */}

                    <View style = {{paddingTop:20, flex:1}}>
                    {searchInput.length == 0 ?
                        <FlatList data = {plantEntries} renderItem = {itemData => (
                            <PlantEntry
                                    id = {itemData.item.key} 
                                    classification = {itemData.item.classification} 
                                    nickname = {itemData.item.nickname} 
                                    species = {itemData.item.species} 
                                    date = {itemData.item.date} 
                                    image = {itemData.item.image} 
                                    onModal = {launchModalHandler}/>
                        )} 
                        />
                            :
                        <FlatList data = {filteredArray} renderItem = {itemData => (
                                <PlantEntry
                                        id = {itemData.item.key} 
                                        classification = {itemData.item.classification} 
                                        nickname = {itemData.item.nickname} 
                                        species = {itemData.item.species} 
                                        date = {itemData.item.date} 
                                        image = {itemData.item.image} 
                                        onModal = {launchModalHandler}/>
                            )} 
                            />
                    }
                        
                    </View>
                    
                </View>
            </View>
        </ScrollView>
    ) 
}

const styles = StyleSheet.create({
    mainContainer:
    {
        flex:1,
        backgroundColor: Color.background,
        marginTop:25,
        // borderWidth:5, borderColor:'purple',
        alignItems:'center'
    },
    searchContainer:{
        // borderWidth:5, borderColor:'blue',
        paddingTop:19,
        width:'90%',
    },
    sortingContainer:
    {
        // orderWidth:5, borderColor:'red',
        width: '95%',
        flex:1
    },
      container: {
    paddingTop:30, 
    // borderWidth:5, borderColor:'purple',
    flex:1, 
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.5)'
  }
})


function convertDate(givenDate)
{

    let tempDate = givenDate.split(" ");

    console.log(tempDate[0]);
    console.log(tempDate[1]);
    console.log(tempDate[2]);

    let month = "";
    let day = "";
    let year = tempDate[2];
    let date = "";

    // Gets the Month
    switch(tempDate[0].toLowerCase())
    {
        case 'january':
            month = 1;
            break;
        case 'february':
            month = 2
            break;
        case 'march':
            month = 3;
            break;
        case 'april':
            month = 4;
            break;
        case 'may':
            month = 5;
            break;
        case 'june':
            month = 6;
            break;
        case 'july':
            month = 7
            break;
        case 'auguest':
            month = 8
            break;
        case 'september':
            month = 9;
            break;
        case 'october':
            month = 10;
            break;
        case 'november':
            month = 11;
            break;
        case 'december':
            month = 12;
            break;
    }

    // Gets the day
    for(let i = 0; i < tempDate[1].length; i++)
    {
        if(isNaN(parseInt(tempDate[1].charAt(i))))
            break;
        else
            day += tempDate[1].charAt(i);
    }

    date = `${month}/${day}/${year}`;

    return date;

}

export {Search}


