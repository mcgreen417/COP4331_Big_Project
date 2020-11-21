import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


function Widget(props)
{
    return (
        <View>
            <FontAwesomeIcon icon = "check-square" size = {50} color = 'blue'/>
        </View>
    )
}

export {Widget}


