import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';

import {
  iconLogout,
  iconDulieu,
  iconReport,
  iconPhananh,
} from '../constant/image';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Header from '../components/header';
import {COLORS} from '../constant/theme';
import {apiList} from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const ShowMore = ({navigation}) => {
  const [infor, setInfor] = React.useState('');
  const data = useSelector(state => state.infor.session_id);

  React.useEffect(() => {
    axios
      .post(apiList.getProfile, {
        session_id: data,
      })
      .then(response => {
        setInfor(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const logOut = () => {
    AsyncStorage.removeItem('session_id');
    AsyncStorage.removeItem('user_type');
    navigation.replace('Login');
  };
  return (
    <ScrollView>
      <Header name="Mở rộng" back={true} />
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('Xemthongtin', {item: infor})}>
        <View
          style={styles.imgContainer}>
          <Image
            source={{uri: infor.avatar}}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 100,
            }}
          />
        </View>
        <Text style={styles.avatar}>{infor.full_name}</Text>
      </TouchableOpacity>
      <View>
        {infor.type == 0 && (
          <View>
            <TouchableOpacity
              style={{marginTop: -50}}
              onPress={() => navigation.navigate('DulieuOff')}>
              <View style={styles.item}>
                <Image source={iconDulieu} style={styles.img} />
                <Text style={styles.text}>Dữ liệu lưu trữ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginBottom: 50}}
              onPress={() => navigation.navigate('Batthuong')}>
              <View style={styles.item}>
                <Image source={iconPhananh} style={styles.img} />
                <Text style={styles.text}>Phản ánh bất thường</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {infor.type == 1 && (
          <TouchableOpacity
            style={{marginTop: -50, marginBottom: 50}}
            onPress={() => navigation.navigate('Nguyenlieu')}>
            <View style={styles.item}>
              <Image source={iconDulieu} style={styles.img} />
              <Text style={styles.text}>Danh sách lô nguyên liệu</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{marginTop: -50}}
          onPress={() => navigation.navigate('Phanhoi')}>
          <View style={styles.item}>
            <Image source={iconReport} style={styles.img} />
            <Text style={styles.text}>Phản hồi góp ý</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Chatbox')}>
            <View style={styles.item}>
              <Image source={l1} style={styles.img} />
              <Text style={styles.text}>ChatBox</Text>
            </View>
          </TouchableOpacity> */}
        <TouchableOpacity onPress={() => logOut()}>
          <View style={styles.item}>
            <Image source={iconLogout} style={styles.img} />
            <Text style={styles.text}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 25,
    marginVertical: 20,
  },
  avatar: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    // marginHorizontal: 40,
    marginTop: 45,
    marginLeft: 15,
  },
  text: {
    top: 27,
    color: COLORS.main,
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 17,
    marginHorizontal: 10,
  },

  back: {
    backgroundColor: COLORS.main,
    width: width,
    height: 170,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    width: width * 0.94,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    elevation: 4,
  },
  img: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: 70,
    height: 70,
  },
});

export default ShowMore;
