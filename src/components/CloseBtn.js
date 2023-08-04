import { TouchableOpacity, Image} from 'react-native';
import React from 'react';
import close from '../assets/close.png'
import { useNavigation } from '@react-navigation/native';


const CloseBtn = ({onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
      <Image source={close} style={{height: 60, width: 60, marginRight: 10}} />
    </TouchableOpacity>
  );
};

export default CloseBtn;
