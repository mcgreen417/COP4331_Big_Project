import React, {useState} from 'react'
import {Text, View, Button, StyleSheet,StatusBar, Image, ImagePropTypes} from 'react-native'
import Color from '../constants/colors';
import Dash from 'react-native-dash';
import { Icon } from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import {RoundButton} from './RoundButton'
import {useNavigation} from '@react-navigation/native';

function PlantEntry(props)
{
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const navigation = useNavigation();

    return(

        // Main Container - Purple
        <View style = {styles.mainContainer}>
            <Dash style = {{width:'100%',height:1}} dashLength = {7}  dashThickness = {1} dashColor = {Color.HeaderText} dashGap = {5}/>

            {/* Plant Reminder Container - Blue*/}
            <View style = {styles.PlantRemindersContainer}>

                <View style = {{flexDirection:'row'}}>
<<<<<<< Updated upstream
                    <Image source = {props.image} style = {{borderRadius:10}}/>
=======
                    <Image source = {props.image} style = {{borderRadius:5, resizeMode:'stretch', height:64, width:64}}/>
>>>>>>> Stashed changes

                    {/* Plant Data Container - DodgerBlue */}
                    <View style = {styles.plantDataContainer}>

                        {/* Plant Info Container Orange */}
                        <View style = {styles.plantInfoContainer}>
                            <Text><Text style = {{color:Color.darkGreen}}>Nickname:</Text> {props.nickname}</Text>
                            <Text><Text style = {{color:Color.darkGreen}}>Species:</Text> {props.species}</Text>
                            <Text><Text style = {{color:Color.darkGreen}}>Date Acquired: </Text>{props.date}</Text>
                            <Text style = {{color:Color.darkGreen}}>Plant Classification: </Text>
<<<<<<< Updated upstream
                            <RoundButton name = {props.classification}/>
=======
                            <View style = {{flexDirection:'row'}}>
                                {props.classification.map((name) => <RoundButton key = {name} name = {name} />)}
                            </View>
>>>>>>> Stashed changes
                        </View>

                        {/* Entry Container - Green */}
                        <View style = {styles.EntryContainer}>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
                            {/* Delete Entry */}
                            <View style = {{flexDirection:'row', alignItems:'center', paddingTop:10}}>
                                <CheckBox
                                    checked = {toggleCheckBox}
<<<<<<< Updated upstream
                                    onPress = {() => {setToggleCheckBox(!toggleCheckBox); props.onModal(props.id)}}
=======
                                    onPress = {() => {props.onToggleDelete(props.id, !toggleCheckBox); setToggleCheckBox(!toggleCheckBox); {/*props.onModal(props.id)*/}}}
>>>>>>> Stashed changes
                                    containerStyle = {{color:'green', padding:0}}
                                    checkedColor = "green"
                                />
                                <Text>Delete Entry</Text>
                            </View>
                            
                            {/* View Entry */}
                            <View style = {{flexDirection:'row', paddingRight:5, alignItems:'center'}}>
                                <Text style = {{paddingRight:5}}>View Entry</Text>
<<<<<<< Updated upstream
                                <Icon name = 'long-arrow-right' type = 'font-awesome' color = {Color.header} onPress = {() => navigation.navigate("ViewEntry")}/>
=======
                                <Icon 
                                    name = 'long-arrow-right' 
                                    type = 'font-awesome' 
                                    color = {Color.header} 
                                    onPress={() => {
                                        /* 1. Navigate to the Details route with params */
                                        navigation.navigate('ViewEntrySearch', {
                                          itemId: props.id,
                                        });
                                      }}
                                    
                                />
>>>>>>> Stashed changes
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
            <Dash style = {{width:'100%',height:1}} dashLength = {7}  dashThickness = {1} dashColor = {Color.HeaderText} dashGap = {5}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        // borderWidth:5, borderColor:'purple'
    },
    PlantRemindersContainer:{
        // borderWidth:5, borderColor:'blue',
        paddingVertical:15, paddingLeft:7
    },
    plantDataContainer:{
        // borderWidth:5, borderColor:'dodgerblue',
        flex:1, 
        paddingLeft:5
    },
    plantInfoContainer:{
        // borderWidth:5, borderColor:'orange'
    },
    EntryContainer:{
        flexDirection:'row', 
        justifyContent:'space-between',alignItems:'center', 
        // borderWidth:5, borderColor:'green'
    }
})

export {PlantEntry}