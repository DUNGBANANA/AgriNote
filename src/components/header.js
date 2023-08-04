import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

import c from '../constant/theme';
import CloseBtn from './CloseBtn';
import BackBtn from './BackBtn';


const {width, height} = Dimensions.get('window');

const Header = ({back, name, close, icon, iconHomeLead ,children}) => {
  const navigation = useNavigation();

 
  // const renderItem = ({ item }) => (
  //   <Text>{item.name}</Text>
  // );

  return (
    <View style={t.header}>
    {children}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          left: 10,
        }}>
        {back == true ? <BackBtn /> : null}
        <Text style={t.text}>{name}</Text>
        {/* {props.search == true ? <SearchBar onSearch={handleSearch} /> : null} */}
      </View>

      {/* <Image
        resizeMode="contain"
        source={bannerLogin}
        style={{
          width: 1.35 * width,
          height: 0.3 * height,
          position: 'absolute',
          left: width / 100,
        }}
      /> */}
      {close == true ? <CloseBtn /> : null}

      {/* icon HomeUser */}
      {icon == true ? (
        <View style={t.icon}>
          <TouchableOpacity
            style={t.bell}
            onPress={() => navigation.navigate('Thongbao')}>
            <Icon name="bell" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={t.bell}
            onPress={() => navigation.navigate('Calendar')}>
            <Icon2 name="graph" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={t.bell}
            onPress={() => navigation.navigate('Khuvuc')}>
            <Icon1 name="location" size={23} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : null}
      
      {/* iconHomeLead */}
      {iconHomeLead == true ? (
        <View style={t.icon}>
          <TouchableOpacity
            style={t.bell}
            onPress={() => navigation.navigate('ThongbaoLead')}>
            <Icon name="bell" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={t.bell}
            onPress={() => navigation.navigate('History')}>
            <Icon name="history" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : null}
      
    </View>
  );
};

const t = StyleSheet.create({
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: width,
    height: 60,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: c.COLORS.main,
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
  },
  bell: {
    backgroundColor: c.COLORS.main,
    height: 35,
    width: 35,
    borderRadius: 5,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
