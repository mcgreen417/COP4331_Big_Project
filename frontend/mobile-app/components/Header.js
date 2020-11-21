import React from 'react'
import {StyleSheet, View, Text, Modal,Button, Image, ImageBackground} from 'react-native';

function Header()
{
    return(
        <Text style = {styles.headerText}>Welcome to Flower Power!</Text>
    )
}

const styles = StyleSheet.create({
    headerText:{
        color:'#816868',
        fontSize:32,
        fontStyle:"italic",
        fontWeight:'bold',
        // borderWidth:2,
        width:'60%',
        textAlign:'center'
    }
})

export {Header}