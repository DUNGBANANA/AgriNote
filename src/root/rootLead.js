import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';


import HomeLead from '../screens/lead/HomeLead';
import ShowMore from '../screens/ShowMore';
import {Dimensions } from 'react-native';



const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

function RootLead() {
  // Xử lý khi người dùng vào trang chủ nhưng ấn nút back quay lại.
  // React.useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
  //     return true;
  //   });
  //   return () => backHandler.remove(); // Hủy lắng nghe sự kiện khi component unmount
  // }, []);

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
        component={HomeLead}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={30} color={color} style={{marginTop: 10}}/>
          ),
        }}
  
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

      />
    </Tab.Navigator>
  );
}

export default RootLead;
