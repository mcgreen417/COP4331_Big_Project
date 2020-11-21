import React from 'react'
import {Text, View, Button, StyleSheet,StatusBar, Image} from 'react-native'
import Color from '../constants/colors'


function DottedLine()
{
    return(
        <View style = {{borderColor: Color.header, borderStyle:'dotted', borderRadius:4, borderWidth:4}}/>
    )

}

export {DottedLine}