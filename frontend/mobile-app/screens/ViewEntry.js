import React from 'react'
import {Text, View, Button, StyleSheet, TextInput,Image,StatusBar, TouchableOpacity, ImageBackground} from 'react-native'
import Color from '../constants/colors';
import {Header} from '../components/Header'
import { Input } from 'react-native-elements';
import {RoundButton} from '../components/RoundButton'


function ViewEntry()
{
    return(
        // Main Container
        <View style = {styles.mainContainer}>
            <StatusBar barstyle = "dark-content" hidden = {false} backgroundColor = {Color.theme} translucent = {true}/>

                {/* Secondary Container Header - Blue */}
                <View style = {styles.secondaryContainerHeader}>
                    <Image source = {require('../assets/header.png') } />

                    {/* Header Container - Red */}
                    <View style = {styles.headerContainer}>

                        {/* Tree Image */}
                        <Image source = {require('../assets/image4.png')} style = {{borderRadius:10}}/> 

                    </View>

                </View>

                {/* Content Container - Blue */}
                <View style = {styles.contentContainer}>
                 
                    <View>
                        <View>
                            <View style = {{flexDirection:'row'}}>
                                <Text style = {[styles.contentText, styles.ContentTextHeader]}>Plant's Nickname:</Text>
                                <Text style = {styles.contentText}> Apple Bee's</Text>
                            </View>
                            <View style = {{flexDirection:'row'}}>
                                <Text style = {[styles.contentText,styles.ContentTextHeader]}>Plant Species: </Text>
                                <Text style = {styles.contentText}>Apple Tree</Text>
                            </View>
                        </View>

                        <View style = {{marginTop:10}}>
                            <Text style = {[styles.contentText, styles.ContentTextHeader]}>Plant Classification:</Text>
                            <View style = {{flexDirection:'row'}}>
                                <RoundButton name = "Flower"/>
                                <RoundButton name = "Fruit"/>
                                <RoundButton name = "Tree"/>
                            </View>
                        </View>
                    </View>

                    <View style = {{paddingTop:20, width:'90%'}}>

                        {/* Sunlight Set */}
                        <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                            <View>
                                <Text style = {[styles.contentText, styles.ContentTextHeader]}>Sunlight Needed: </Text>
                                <View style = {{flexDirection:'row'}}>
                                    <Image source = {require('../assets/sun.png')} resizeMode = 'cover' style = {{width: 30, height:30}}  />
                                    <Image source = {require('../assets/sun.png')} resizeMode = 'cover' style = {{width: 30, height:30}}  />
                                    <Image source = {require('../assets/dimmedSun.png')} resizeMode = 'cover' style = {{width: 30, height:30}}  />
                                </View>
                            </View>

                        {/* Water Set */}
                            <View>
                                <Text style = {[styles.contentText, styles.ContentTextHeader]}>Water Needed:</Text>
                                <View style = {{flexDirection:'row'}}>
                                    <Image source = {require('../assets/cloud.png')} resizeMode = 'stretch' style = {{width:30, height:24}}  />
                                    <Image source = {require('../assets/cloud.png')} resizeMode = 'stretch' style = {{width:30, height:24}} />
                                    <Image source = {require('../assets/dimmedCloud.png')} resizeMode = 'stretch' style = {{width:30, height:24}} />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Date and Reminders */}
                    <View style = {{flexDirection:'row', marginTop:10}}>
                        <Text style = {[styles.contentText, styles.ContentTextHeader]}>Date Acquired: </Text>
                        <Text style = {styles.contentText}>November 27th, 2008</Text>
                    </View>

                    <View style = {{marginTop:10}}>
                        <Text style = {[styles.contentText, styles.ContentTextHeader]}>Reminders:</Text>
                        <Text style = {[styles.contentText, {fontSize:12}]}>The plant needs to be watered every 30 days.</Text>
                    </View>
                </View>
        </View>

    )
}


const styles = StyleSheet.create({
    mainContainer:
    {
        flex:1, 
        // borderWidth:5, borderColor:'purple',
        backgroundColor:Color.background,
        alignItems:'center'
    },
    secondaryContainerHeader:{
        marginTop:11,
        // borderWidth:5, borderColor:'blue', 
        alignItems:'center', 
        width:'100%', height:307
    },
    headerContainer:{
        position:'absolute', 
        // borderWidth:5, borderColor:'red',
        alignItems:'center',
        justifyContent:'center', 
        width:'100%',height:'100%'
    },
    contentContainer:{
        // borderWidth:5, borderColor:'blue',
        width:'80%'
    },
    HeaderText:
    {
        fontSize:25,
        color: Color.header,
        fontWeight:'bold'
    },
    roundButton:
    {
        backgroundColor:Color.theme,
        borderRadius:10,
        borderWidth:1,
        borderColor:'red', 
        height:25,
        width:100     
    },
    contentText:{
        fontSize:16
    },
    ContentTextHeader:{
        color: '#358B59',
        textDecorationLine:'underline'
    }
})


export {ViewEntry}