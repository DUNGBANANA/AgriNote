import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import RootUser from '../root/rootUser';
import RootLead from '../root/rootLead';
import Details from '../screens/user/Details';
import Phanhoi from '../screens/user/Phanhoi';
import Thongbao from '../screens/user/Thongbao';
import Calendar from '../screens/user/Calendar';
import Khuvuc from '../screens/user/Khuvuc';
import Example from '../components/chatbox';
import Nhatki from '../screens/user/Nhatki';
import Xemthongtin from '../screens/user/Xemthongtin';
import ThongbaoLead from '../screens/lead/ThongbaoLead';
import Thuhoach from '../screens/lead/Thuhoach';
import History from '../screens/lead/History';
import Batthuong from '../screens/lead/Batthuong';
import Xemviec from '../screens/lead/Xemviec';
import LoadingScreen from '../screens/Loading';
import DulieuOff from '../screens/user/DulieuOff';
import Nguyenlieu from '../screens/user/Nguyenlieu';
import InforNguyenlieu from '../screens/user/InforNguyenlieu';
import { enableScreens } from 'react-native-screens';

const Stack = createStackNavigator();

enableScreens(); 
const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false,  gestureEnabled: true, gestureDirection: 'horizontal-inverted'}} initialRouteName='Loading' >
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Loading' component={LoadingScreen}/>

        {/* Type1 */}
        <Stack.Screen name='User' component={RootUser} />
        <Stack.Screen name='Details' component={Details}/>
        <Stack.Screen name='Phanhoi' component={Phanhoi}/>
        <Stack.Screen name='Thongbao' component={Thongbao}/>
        <Stack.Screen name='Calendar' component={Calendar}/>
        <Stack.Screen name='Khuvuc' component={Khuvuc}/>
        <Stack.Screen name='Chatbox' component={Example}/>
        <Stack.Screen name='Nhatki' component={Nhatki}/>
        <Stack.Screen name='Xemthongtin' component={Xemthongtin}/>
        <Stack.Screen name='Nguyenlieu' component={Nguyenlieu}/>
        <Stack.Screen name='InforNguyenlieu' component={InforNguyenlieu}/>

        {/* Type2 */}
        <Stack.Screen name='Lead' component={RootLead}/>
        <Stack.Screen name='ThongbaoLead' component={ThongbaoLead}/>
        <Stack.Screen name='Thuhoach' component={Thuhoach}/>
        <Stack.Screen name='History' component={History}/>
        <Stack.Screen name='Batthuong' component={Batthuong}/>
        <Stack.Screen name='Xemviec' component={Xemviec}/>
        <Stack.Screen name='DulieuOff' component={DulieuOff}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
