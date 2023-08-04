import {View, Image, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux'
import {setSessionId} from '../features/getInfor';
import { bannerLoading } from '../constant/image';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const LoadingScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    const checkSavedLogin = async () => {
      try {
        const session = await AsyncStorage.getItem('session_id');
        const type = await AsyncStorage.getItem('user_type');
        if ( session !== null && type !== null) {
          dispatch(setSessionId(session));
           if (type == 0) {
            Toast.show({
              type: 'success',
              text1: 'Đăng nhập thành công',
              visibility: 1500,
              autoHide: true,
              topOffset: 30,
            })
            navigation.replace('Lead');
          }
          else if (type == 1) {
            Toast.show({
              type: 'success',
              text1: 'Đăng nhập thành công',
              visibility: 1500,
              autoHide: true,
            })
            navigation.replace('User');
          }
        }
        else{
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log('Lỗi khi kiểm tra thông tin đăng nhập: ', error)
      } finally {
        setLoading(false);
      }
    };

    setTimeout(checkSavedLogin, 1500);
  }, []);

  return (
    loading && <SafeAreaView>
      <View>
        <StatusBar
          backgroundColor="#e3f3f0" // Màu nền của thanh hiển thị giờ
          barStyle="dark-content" // Kiểu chữ trên thanh hiển thị giờ (light-content hoặc dark-content)
        />
        <Image source={bannerLoading} style={{width: '100%', height: '100%'}} />
      </View>
    </SafeAreaView>
    
  );
};

export default LoadingScreen;
