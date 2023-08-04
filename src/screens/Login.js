import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import { apiList } from '../api/api';
import {setSessionId} from '../features/getInfor';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { bannerLogin, logo1 } from '../constant/image';
import {s} from '../screens/Styled';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {handleSubmit, control} = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSignIn = async data => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        apiList.login,
        data,
      );
      if (response.data.code === 200) {
        dispatch(setSessionId(response.data.session_id));
        setIsLoading(false);
        AsyncStorage.setItem('user_type', response.data.user_type.toString());
        AsyncStorage.setItem('session_id', response.data.session_id);

        if (response.data.user_type === 0) {
          navigation.replace('Lead');
        } else if (response.data.user_type === 1) {
          navigation.replace('User');
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Sai thông tin đăng nhập',
          setVisibility: 1500,
          autoHide: true,
        })
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Không có kết nối mạng',
        visibilityTime: 2000,
        autoHide: true,
      });
      console.log(error);
    }
  };
  return isLoading == true ? (
    <View style={[s.center]}>
      <ActivityIndicator size="large" color={'green'} />
    </View>
  ) : (
    <ScrollView>
      <StatusBar
        backgroundColor="#e3f3f0" // Màu nền của thanh hiển thị giờ
        barStyle="dark-content" // Kiểu chữ trên thanh hiển thị giờ (light-content hoặc dark-content)
      />
      <Image source={bannerLogin} style={{width: width, height: height * 0.3}} />
      <Image source={logo1} style={styles.logo1} />
      <Text style={styles.text}>
        Giúp người nông dân quản lý công việc tốt hơn
      </Text>
      <View style={{marginTop: 60, flex: 1}}>
        <Controller
          control={control}
          name="user_name"
          render={({field: {value, onBlur, onChange}}) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Tài khoản"
              style={[styles.input, styles.placeholderStyle]}
              placeholderTextColor="black"
            />
          )}
        />
        <Controller
          control={control}
          name="user_password"
          render={({field: {value, onBlur, onChange}}) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Mật khẩu"
              style={[styles.input, styles.placeholderStyle]}
              placeholderTextColor="black"
              secureTextEntry
            />
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(onSignIn)}
          style={styles.container}>
          <Text style={styles.button}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo1: {
    width: 120,
    height: 145,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -50,
  },
  text: {
    color: 'black',
    fontSize: 11,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  input: {
    color: 'black',
    backgroundColor: '#e6f2d9',
    width: width * 0.8,
    height: 50,
    borderRadius: 50,
    marginTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingHorizontal: 30,
  },
  placeholderStyle: {
    fontStyle: 'italic',
  },
  container: {
    height: 50,
    width: width * 0.8,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    backgroundColor: '#90af72',
    borderRadius: 50,
    alignItems: 'center',
    padding: 13,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Login;
