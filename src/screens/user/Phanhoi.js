import {View, Text, Image, TextInput, Dimensions, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {s} from '../Styled'

import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../components/header';

const {height, width} = Dimensions.get('window');

const Phanhoi = () => {
  const sesionID = useSelector(state => state?.infor.session_id);
  const navigation = useNavigation();
  const {handleSubmit, control} = useForm();


  const sendFeedback = async (data) => {
    try {
      const response = await axios.post(
        'http://1.55.212.49:5555/AgriNoteAPIs/feedback/createfeedback',
        {comment: data.comment, session_id: sesionID},
      );
      console.log('-------->', response.data);
      if (response.data.code === 200) {
        Alert.alert('Gửi phản hồi thành công');
        navigation.navigate('User');
      } else {
        Alert.alert('Gửi phản hồi thất bại');
      }
    } 
    catch (error) {
      Alert.alert('Không thể gửi phản hồi');
    }
  };
  return (
    <>
    <Header name="Gửi phản hồi, góp ý" back={true}/>
    <View style={s.background}>
      <Controller
        control={control}
        name="comment"
        render={({field: {value, onBlur, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Comment"
            style={styles.input}
          />
        )}
      />

      <TouchableOpacity onPress={handleSubmit(sendFeedback)} style={s.style}>
        <View style={[s.button, s.shadown, {margin: 10}]}>
          <Text style={{color: '#fff'}}>
            Gửi phản hồi
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  input:{
    borderWidth: 0.5,
    borderColor: '#000',
    width: width * 0.9,
    height: height * 0.28,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    color: '#000',
  },  
});
export default Phanhoi;
