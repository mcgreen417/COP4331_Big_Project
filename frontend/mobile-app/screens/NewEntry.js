import React,{useState} from 'react'
import {Text, View, Button, StyleSheet, TextInput,Image,StatusBar, TouchableOpacity, ImageBackground, ScrollView} from 'react-native'
import Color from '../constants/colors';
import {Header} from '../components/Header'
import { Input } from 'react-native-elements';
import {RoundButton} from '../components/RoundButton'
import { RoundButtonLarge } from '../components/RoundButtonLarge';


function NewEntry()
{
    const[roundButtons, setRoundButtons] = useState([
        {id:0,name: "Algae", backgroundColor:Color.theme},
        {id:1,name: "Flower", backgroundColor:Color.theme},
        {id:2,name: "Fruit", backgroundColor:Color.theme},
        {id:3,name: "Grass", backgroundColor:Color.theme},
        {id:4,name: "Herb", backgroundColor:Color.theme},
        {id:5,name: "Moss", backgroundColor:Color.theme},
        {id:6,name: "Orchid", backgroundColor:Color.theme},
        {id:7,name: "Root", backgroundColor:Color.theme},
        {id:8,name: "Shrub", backgroundColor:Color.theme},
        {id:9,name: "Succulent", backgroundColor:Color.theme},
        {id:10,name: "Tree", backgroundColor:Color.theme},
        {id:11,name: "Veggie", backgroundColor:Color.theme},
        {id:12,name: "Vine", backgroundColor:Color.theme},
        {id:13,name: "Other", backgroundColor:Color.theme},

    ]);

    const[buttonSet,setButtonSet] = useState([]);

    console.log(buttonSet.length);

    function toggleButton(id)
    {
        let tempArray = [...roundButtons];
        let tempButton = {...roundButtons[id]};

        if(tempArray[id].backgroundColor == Color.theme)
            tempArray[id].backgroundColor = Color.darkGreen;
        else
            tempArray[id].backgroundColor = Color.theme;

        console.log(buttonSet.length);

        // if(buttonSet.length == 3)
        // {
        //     alert("Button is now length 3");
        // }
        
        setButtonSet(currentButtons => [...currentButtons, tempButton]);

        setRoundButtons(tempArray);
    }

    return(
        <ScrollView contentContainerStyle = {{flexGrow:1}}>
            {/* // Main Container - Purple */}
            <View style = {styles.mainContainer}>
                <StatusBar barstyle = "dark-content" hidden = {false} backgroundColor = {Color.theme} translucent = {true}/>

                {/* Secondary Container Header - Blue */}
                <View style = {styles.secondaryContainerHeader}>
                    <Image source = {require('../assets/header.png')} />
                    
                    {/* Header Container - Red */}
                    <View style = {styles.headerContainer}>

                        {/* Image Upload Container - Brown */}
                    <View style = {{height:260, width:260, borderWidth:2, borderColor:'#816868', borderRadius:10, justifyContent:'center', alignItems:'center'}}>
                        <Image source = {require('../assets/path1.png')} style = {{resizeMode:'contain', height:50, width:50}} />
                        <Text style = {{textAlign:'center'}}>Click this Panel to upload an image of your plant</Text>
                        </View>
                    </View>
                </View>

                {/* Form Container */}
                <View style = {styles.formContainer}>
                    <View>
                        <View style = {{marginBottom:5}}>
                            <Text style = {{fontSize:16,color:'#816868'}}>Plant Nickname</Text>
                            <TextInput 
                                    placeholder = "Plant nickname"
                                    style = {{borderColor:'#a5dfb2', borderWidth:2,borderRadius:5,backgroundColor:'white', width:'100%', paddingLeft:10}}
                                    placeholderTextColor = 'black'
                            />
                        </View>
                        <View>
                            <Text style = {{fontSize:16, color:'#816868'}}>Plant Species</Text>
                            <TextInput 
                                    placeholder = "Plant Species"
                                    style = {{borderColor:'#a5dfb2', borderWidth:2,borderRadius:5,backgroundColor:'white',paddingLeft:10}}
                                    placeholderTextColor = 'black'
                                />
                        </View>
                    </View>
                </View>

                {/* Plant Classification Container */}
                <View style = {styles.plantClassificationContainer}>
                    <Text style = {{fontSize:16, color:'#816868'}}>Plant Classification (Select up to 3)</Text>
                    <View style = {{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
                        <RoundButtonLarge name = {roundButtons[0].name} highlightColor = {roundButtons[0].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[0].id)} />
                        <RoundButtonLarge name = {roundButtons[1].name} highlightColor = {roundButtons[1].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[1].id)}/>
                        <RoundButtonLarge name = {roundButtons[2].name} highlightColor = {roundButtons[2].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[2].id)}/>
                        <RoundButtonLarge name = {roundButtons[3].name} highlightColor = {roundButtons[3].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[3].id)}/>
                        <RoundButtonLarge name = {roundButtons[4].name} highlightColor = {roundButtons[4].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[4].id)}/>
                        <RoundButtonLarge name = {roundButtons[5].name} highlightColor = {roundButtons[5].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[5].id)}/>
                        <RoundButtonLarge name = {roundButtons[6].name} highlightColor = {roundButtons[6].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[6].id)}/>
                        <RoundButtonLarge name = {roundButtons[7].name} highlightColor = {roundButtons[7].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[7].id)}/>
                        <RoundButtonLarge name = {roundButtons[8].name} highlightColor = {roundButtons[8].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[8].id)}/>
                        <RoundButtonLarge name = {roundButtons[9].name} highlightColor = {roundButtons[9].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[9].id)}/>
                        <RoundButtonLarge name = {roundButtons[10].name} highlightColor = {roundButtons[10].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[10].id)}/>
                        <RoundButtonLarge name = {roundButtons[11].name} highlightColor = {roundButtons[11].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[11].id)}/>
                        <View style = {{flexDirection:'row', justifyContent:'space-between', width:'66%'}}>
                            <RoundButtonLarge name = {roundButtons[12].name} highlightColor = {roundButtons[12].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[12].id)}/>
                            <RoundButtonLarge name = {roundButtons[13].name} highlightColor = {roundButtons[13].backgroundColor} onToggle = {toggleButton.bind(this,roundButtons[13].id)}/>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    mainContainer:{
        flex:1, 
        // borderWidth:5, borderColor:'purple',
        backgroundColor:Color.background,
        alignItems:'center'
    },
    secondaryContainerHeader:{
        marginTop:11,
        // borderWidth:5, borderColor:'blue', 
        alignItems:'center', 
        height:290,
        width:'100%'
      },
    headerContainer:{
        position:'absolute', 
        // borderWidth:5, borderColor:'red',
        alignItems:'center',
        justifyContent:'center', 
        width:'100%',height:'100%'
    },
    formContainer:{
        // borderWidth:5, borderColor:'teal', 
        width:'80%'
    },
    plantClassificationContainer:{
        // borderWidth:5, borderColor:'teal',
         marginTop:10, 
        width:'80%'
    },
    HeaderText:
    {
        fontSize:25,
        color: Color.header,
        fontWeight:'bold'
    },
})


export {NewEntry}