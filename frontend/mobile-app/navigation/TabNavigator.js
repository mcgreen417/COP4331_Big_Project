import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';
import {Icon} from 'react-native-elements'

import {Home} from '../Screens/Home'
import {Search} from '../Screens/Search'
import Nursery from '../Screens/Nursery'
import Account from '../Screens/Account'
import {NewEntry} from '../Screens/NewEntry'
import Color from '../constants/colors';

const Tab = createBottomTabNavigator();

import MainStackNavigator from './MainStackNavigator'

function BottomTabNavigator() {

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions = {({route}) => ({
        tabBarIcon: ({focused, color, size}) =>{
          
          if(route.name === 'Home'){

            return <Icon name = 'home' type = 'font-awesome' size = {size} color = {color}/>
          }
          else if(route.name === 'Search')
          {
            return <Icon name = "search" type = 'font-awesome' size = {size} color = {color}/>
          }
          else if(route.name === 'Nursery')
          {
            return <Icon name = 'flower' type = "material-community" size = {30} color = {color} />
          }
          else if(route.name === 'Account')
          {
            return <Icon name ='md-menu' type = 'ionicon' size = {30} color = {color} />
          }
          else if(route.name === 'NewEntry')
          {
            return <Icon name ='plus' type = 'evilicon' size = {50} color = {color}  />
          }
        }
      })}

      tabBarOptions={{
        activeTintColor: Color.darkGreen,
        inactiveTintColor: 'white',
        style: {backgroundColor:Color.theme},
        keyboardHidesTabBar:true,
      }}
    >
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name = "NewEntry" component = {NewEntry} />
      <Tab.Screen name = "Nursery" component = {Nursery} />
      <Tab.Screen name = "Account" component = {Account}
        listeners = {{
          tabPress:e=>{
              e.preventDefault();
              navigation.openDrawer();
          }
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;



