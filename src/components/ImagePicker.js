/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



// const [isImagePickerVisible, setIsImagePickerVisible] = React.useState(false);
// const [response, setResponse] = React.useSate();
// const handleAvatarPress = () => {
//   setIsImagePickerVisible(true);
// };
// const handleImagePickerClose = () => {
//   setIsImagePickerVisible(false);
// };
// const handle = (response) =>{
    // setResponse(response);
// }

{/* <TouchableOpacity style={[styles.avatar]} onPress={handleAvatarPress}>
          <Image source={{uri: avatar}} style={styles.avatarImage} />
        </TouchableOpacity> */}
{/* <ImagePick
isVisible={isImagePickerVisible}
onClose={handleImagePickerClose}
getImage={handle}
onLib={true}
/> */}


import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Modal,
  Alert,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('window');
const ImagePick = ({getImage, onLib, back, isVisible, onClose}) => {
  const [response, setResponse] = React.useState(undefined);
  const [modalVisible, setModal] = React.useState(false);
  const [avatar, setAvatar] = React.useState(undefined);

  const handleImage = type => {
    if (type === 'openCamera') {
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      }).then(response => {
        console.log('Response = ', response);
        setAvatar(response.path);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          onClose();
          setResponse(response);
        }
      });
    } else if (type === 'openPicker') {
      ImagePicker.openPicker({
        width: 104,
        height: 104,
        cropping: true,
      })
        .then(response => {
          console.log('Response = ', response);
          setAvatar(response.path);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            onClose();
            setResponse(response);
          }
        })
        .catch(err => Alert.alert('Bạn chưa chụp ảnh'));
    }
  };
  React.useEffect(() => {
    getImage(response);
  }, [response]);

  // let filename = avatar.split('/').pop();
  // let match = /\.(\w+)$/i.exec(filename);
  // let type = match ? `image/${match[1]}` : 'image';
  // getImage({name: filename, uri: avatar, type});
  // console.log("Checkkkkk=====>", response)

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
        // visible= {modalVisible}
        // onRequestClose={() => {
        //   setModal(!modalVisible);
        // }}
        >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <SafeAreaView style={styles.modalContainer}>
        <View
            style={[
              {
                width: 50,
                height: 5,
                backgroundColor: 'white',
                borderRadius: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: -10,
                marginBottom: 10,
              },
            ]}/>
          {onLib === true && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  handleImage('openPicker');
                }}
                underlayColor="transparent">
                <View style={styles.addButtonModal}>
                  {/* <Image source={add_image} /> */}
                  <Text style={styles.buttonTitle}>Chọn ảnh từ thư viện</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View>
            <TouchableOpacity
              onPress={() => {
                handleImage('openCamera');
              }}
              underlayColor="transparent">
              <View style={styles.addButtonModal}>
                {/* <Image source={camera_image} /> */}
                <Text style={styles.buttonTitle}>Mở máy ảnh</Text>
              </View>
            </TouchableOpacity>
          </View>

        
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu tối và độ mờ của lớp
  },

  buttonTitle: {
    fontSize: 15,
    color: 'black',
    textAlign: 'right',
  },
  uploadedImage: {
    width: 104,
    height: 104,
  },
  addButtonModal: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: 45,
  },
  modalContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    bottom: height * 0.16,
    width: width * 0.9,
    borderRadius: 10,
  }
});

export default ImagePick;
