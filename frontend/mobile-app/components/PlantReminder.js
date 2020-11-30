import React, {useState} from 'react'
import {Text, View, Button, StyleSheet,StatusBar, Image, ImagePropTypes} from 'react-native'
import Color from '../constants/colors';
import Dash from 'react-native-dash';
import { Icon } from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native';


function PlantReminder(props)
{
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const navigation = useNavigation();

    return(
        <View>
            <Dash style = {{width:'100%',height:1}} dashLength = {7}  dashThickness = {1} dashColor = {Color.HeaderText} dashGap = {5}/>

            <View style = {{paddingVertical:15}}>
                <View style = {{flexDirection:'row'}}>
<<<<<<< Updated upstream
                    <Image source = {props.plantImage} style = {{borderRadius:10}} />
                    <View style = {{flex:1, paddingLeft:5, paddingRight:5}}>
                        <Text><Text style = {styles.plantLabel}>Nickname:</Text> {props.nickname}</Text>
                        <Text><Text style = {styles.plantLabel}>Species:</Text> {props.species}</Text>
                        <Text><Text style = {styles.plantLabel} >Reminder:</Text> Water in {props.numOfDays} days</Text>
=======
                    <Image source = {props.plantImage} style = {{borderRadius:5, resizeMode:'stretch', width:64, height:64}} />
                    <View style = {{flex:1, paddingLeft:5, paddingRight:5}}>
                        <Text><Text style = {styles.plantLabel}>Nickname:</Text> {props.nickname}</Text>
                        <Text><Text style = {styles.plantLabel}>Species:</Text> {props.species}</Text>
                        <Text><Text style = {styles.plantLabel} >Reminder:</Text> Water in {props.numberOfDays} days</Text>
>>>>>>> Stashed changes
                        <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style = {{flexDirection:'row', alignItems:'center', paddingTop:5}}>
                            <CheckBox
                                checked = {toggleCheckBox}
<<<<<<< Updated upstream
                                onPress = {() => setToggleCheckBox(!toggleCheckBox)}
=======
                                onPress = {() => {props.onToggleCompletedTask(props.id,!toggleCheckBox); setToggleCheckBox(!toggleCheckBox)}}
>>>>>>> Stashed changes
                                containerStyle = {{color:'green', padding:0, margin:0}}
                                checkedColor = "green"
                            />
                                <Text>I completed this task</Text>
                            </View>
                            <View style = {{flexDirection:'row', alignItems:'center'}}>
                                <Text style = {{paddingRight:5}}>View Entry Here</Text>
<<<<<<< Updated upstream
                                <Icon name = 'long-arrow-right' type = 'font-awesome' color = {Color.header} onPress = {() => navigation.navigate("ViewEntry")} />
=======
                                <Icon 
                                    name = 'long-arrow-right' 
                                    type = 'font-awesome' 
                                    color = {Color.header} 
                                    onPress={() => {
                                        /* 1. Navigate to the Details route with params */
                                        navigation.navigate('ViewEntry', {
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
    plantLabel:{
        color:Color.darkGreen, 
        textDecorationLine:'underline'
    }
})

export {PlantReminder}