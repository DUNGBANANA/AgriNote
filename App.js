import * as React from 'react';
import {Provider} from 'react-redux';
import Route from './src/routes/route';
import {store} from './src/store/store';
import CheckNetWork from './src/components/CheckNetWork';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';




export default function App() {
  React.useEffect(() => {
    // Kiểm tra xem Firebase đã được khởi tạo hay chưa
    // if (!firebase.apps.length) {
    //   firebase.initializeApp({
    //     apiKey: "AIzaSyBr2NBuHDkxyUwMZO8ThkXhRALHDRxUBKY",
    //     authDomain: "agrinote-c5a7a.firebaseapp.com",
    //     projectId: "agrinote-c5a7a",
    //     storageBucket: "agrinote-c5a7a.appspot.com",
    //     messagingSenderId: "225239693894",
    //     appId: "1:225239693894:android:cd3141ea763300bd056847"
    //   });
    // }

    // Nếu bạn sử dụng Firebase Messaging, bạn có thể yêu cầu quyền và lấy token ở đây
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('Token:', token);
        console.log('Authorization status:', authStatus);
      }
    };
    requestUserPermission();
  }, []);

  return (
    <Provider store={store}>
        <StatusBar
          backgroundColor="#fff" // Màu nền của thanh hiển thị giờ
          barStyle="dark-content" // Kiểu chữ trên thanh hiển thị giờ (light-content hoặc dark-content)
        />
        <CheckNetWork />
        <Route />
        <Toast />
    </Provider>
  );
}
