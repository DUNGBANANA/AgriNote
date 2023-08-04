import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import back from '../assets/back.png';
import { useNavigation } from '@react-navigation/native';

const BackBtn = (onPress) => {
  const navigation = useNavigation();
  return(
    <TouchableOpacity onPress={()=> navigation.goBack()}>
      <Image source={back} style={{height: 55, width: 55, marginRight: -10}} />
    </TouchableOpacity>
  );
};

export default BackBtn;
