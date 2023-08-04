import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {request, PERMISSIONS} from 'react-native-permissions';

import {LogBox} from "react-native";

LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])

const QRScanner = ({navigation}) => {
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await request(PERMISSIONS.ANDROID.CAMERA); // Thay PERMISSIONS.IOS.CAMERA bằng PERMISSIONS.ANDROID.CAMERA cho Android

      if (granted === 'granted') {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log('Error requesting camera permission:', error);
    }
  };

  const handleBarcodeScan = ({data}) => {
    // Xử lý mã QR đã quét
    const qr_code = data.slice(-18)
    navigation.navigate('InforNguyenlieu', {qr_code: qr_code});
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        onBarCodeRead={handleBarcodeScan}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
      >
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Hướng điện thoại vào mã QR</Text>
          <View style={styles.rectangle}>
            <View style={styles.crosshair}>
              <Text style={{fontSize: 30, color: 'white'}}>+</Text>
            </View>
          </View>
        </View>
      </RNCamera>
    </View>
  );
};

const overlayColor = 'rgba(0, 0, 0, 0.5)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    // backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  rectangle: {
    width: 130,
    height: 130,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crosshair: {
    // width: 30,
    // height: 30,
    // backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'white',
    // borderRadius: 15,
  },
});

export default QRScanner;
