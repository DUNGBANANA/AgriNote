import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';




//Cấu hình FireBase InitializeApp
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBr2NBuHDkxyUwMZO8ThkXhRALHDRxUBKY',
    authDomain: 'agrinote-c5a7a.firebaseapp.com',
    projectId: 'agrinote-c5a7a',
    storageBucket: 'agrinote-c5a7a.appspot.com',
    messagingSenderId: '225239693894',
    appId: '1:225239693894:android:cd3141ea763300bd056847',
  });
}
//Tạo kênh
PushNotification.createChannel(
  {
    channelId: 'default-channel',
    channelName: 'Default Channel',
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);
//
// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('Notification:', notification);

//     // Hiển thị thông báo trượt xuống
//     PushNotification.localNotification({
//       channelId: 'default-channel',
//       title: notification.title,
//       message: notification.message,
//     });
//   },
// });

// Cấu hình xử lý push notification khi ứng dụng ở trạng thái background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message (Background):', remoteMessage);
  PushNotification.localNotification({
    channelId: 'default-channel',
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
  });
});

// Cấu hình xử lý push notification khi ứng dụng đang mở và nhận được push notification
messaging().onMessage(async remoteMessage => {
  console.log('Message (Foreground):', remoteMessage);
  PushNotification.localNotification({
    channelId: 'default-channel',
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
  });
});

AppRegistry.registerComponent(appName, () => App);
