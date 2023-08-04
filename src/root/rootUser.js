import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import HomeUser from '../screens/user/HomeUser';
import ScanPage from '../screens/ScanPage';
import ShowMore from '../screens/ShowMore';
import { Dimensions } from 'react-native';



const {height} = Dimensions.get('window')
const Tab = createBottomTabNavigator();

function RootUser() {

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: height*0.09,
          backgroundColor: '#fff',
          borderTopColor: '#eaeaea',
        },
        tabBarInactiveTintColor: '#ccc',
        tabBarActiveTintColor: 'green',
      }}
      >
      <Tab.Screen
        name="Home"
        component={HomeUser}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={30} color={color} style={{marginTop: 10}}/>
          ),
        }}
        headerStyleInterpolator={false}
      />
      <Tab.Screen
        name="Scan"
        component={ScanPage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="qrcode" size={30} color={color} style={{marginTop: 10}}/>
          ),
        }}
        headerStyleInterpolator={false}
      />
      <Tab.Screen
        name="Show"
        component={ShowMore}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="th-list" size={size} color={color} style={{marginTop: 10}}/>
          ),
        }}
        headerStyleInterpolator={false}
      />
    </Tab.Navigator>
  );
}

export default RootUser;
