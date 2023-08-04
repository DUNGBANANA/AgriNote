import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

async function getFCMToken() {
  let fcmtoken = AsyncStorage.getItem('fcmtoken');

  if (!fcmtoken) {
    try {
        const fcmtoken = await messaging().getToken()
      if (fcmtoken) {
        console.log("CHECK=====>", fcmtoken)
        await AsyncStorage.setItem('fcmtoken', fcmtoken)
      } 
    } catch (error) {
      console.log(error);
    }
  }
}

export default  requestUserPermission;