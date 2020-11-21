import React from 'react'
import {Text, View, Button, StyleSheet,StatusBar, Image, ScrollView, FlatList, TextInput} from 'react-native'
import Color from '../constants/colors';
import {Line} from '../components/Line'
import Dash from 'react-native-dash';
import {plantImages, myPlants} from '../constants/plants'
import {Icon} from 'react-native-elements'
import {PlantReminder} from '../components/PlantReminder'

function Home({navigation})
{  
    return (
    // Main Container - Purple
    <ScrollView nestedScrollEnabled = {true}>
        <View style = {styles.mainContainer}>
            <StatusBar barstyle = "dark-content" hidden = {false} backgroundColor = {Color.theme} translucent = {true}/>

            {/*Greeting Container - Teal */}    
            <View style = {styles.greetingContainer}>
                <View style = {{justifyContent:'center'}}>
                    <Text style = {[styles.HeaderText]}>Good afternoon, {'\n'}Username!</Text>
                    <Text>Ready for another day of gardening? {'\n'}Let Flower Power land you a hand!</Text>
                </View>
                <View>
                    <Image source = {require('../assets/plant.png')} />
                </View>
            </View>

            <Line/>

            {/* Plant Info Container Red - Horizontal Scroll */}
            <View style = {styles.plantInfoContainer}>
                <Text>Check Information about your plants below!</Text>
                <FlatList style = {{flexDirection:'row',paddingVertical:5}} horizontal = {true} data = {plantImages} 
                        renderItem = {itemData =>  <Image style = {{borderRadius:10, marginRight:10}} source = {itemData.item.value} />}
                />

            {/* Search */}
            <View style = {{flexDirection:'row', justifyContent:'flex-end'}}>
                <TextInput style = {{textAlign:'right'}} placeholder = "Or click here to search for a specific plant..." placeholderTextColor = "black"/> 
                <Icon name = 'search' type = "material" color = {Color.header}/>
            </View>
            </View>

            <Line />

            <View style = {{paddingVertical:10}}>
                <Text>You have the following reminders for the following plants...</Text>
            </View>
            
            {/* Plant Reminder Container Red - Vertical Scroll */}
            <View style = {styles.plantReminderContainer}>
                <FlatList 
                        data = {myPlants} 
                        renderItem = {itemData => 
                        <PlantReminder plantImage = {itemData.item.image}  nickname = {itemData.item.nickname} species = {itemData.item.species} numberOfDays = {itemData.item.numberOfDays}/>}
                />
            </View>

        </View>
    </ScrollView>
    ) 
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Color.background,
        paddingTop:20,
        paddingLeft:10,
        // borderWidth:5, borderColor:'purple'
    },
    greetingContainer:{
        flexDirection:'row', 
        justifyContent:'space-between',
        // borderWidth:5, borderColor:'teal'
    },
    plantInfoContainer:{
        paddingVertical:5,
        // borderWidth:5, borderColor:'red'
    },
    plantReminderContainer:{
        paddingVertical:10,
        flex:1,
       // borderWidth:5, borderColor:'red'
    },
    HeaderText:
    {
        fontSize:25,
        color: Color.header,
        fontWeight:'bold'
    },
})

export {Home}


