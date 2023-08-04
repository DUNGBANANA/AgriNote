import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import banner from '../../assets/02_bg.png';
import {COLORS} from '../../constant/theme';
import {s} from '../Styled';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import axios from 'axios';

import ImagePick from '../../components/ImagePicker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const {width, height} = Dimensions.get('window');

const Xemthongtin = ({route}) => {
  const {item} = route.params;
  const {handleSubmit, control} = useForm();
  const id = useSelector(state => state.infor.session_id);
  const [avatar, setAvatar] = React.useState(item.avatar);

  const [fullName, setFullName] = React.useState(item.full_name);
  const [email, setEmail] = React.useState(item.email);

  const [isImagePickerVisible, setIsImagePickerVisible] = React.useState(false);
  const handleAvatarPress = () => {
    setIsImagePickerVisible(true);
  };
  const handleImagePickerClose = () => {
    setIsImagePickerVisible(false);
  };
  const Submit = async data => {
    data.fullname == undefined ? (data.fullname = fullName) : data.fullname;
    data.mail == undefined ? (data.mail = email) : data.mail;

    try {
      const formData = new FormData();
      var attach = {
        fullname: data.fullname,
        mail: data.mail,
        session_id: id,
      };

      //Xử lý ảnh trước khi gửi lên formData
      let filename = avatar.split('/').pop();
      let match = /\.(\w+)$/i.exec(filename);
      let type = match ? `image/${match[1]}` : 'image';

      formData.append('attach', JSON.stringify(attach));
      // File ảnh gồm có đủ các trường
      formData.append('file', {uri: avatar, name: filename, type});
      axios
        .post(
          'http://1.55.212.49:5555/AgriNoteAPIs/user/updatemyprofile',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(response => {
          console.log('Response:', response.data);
          Toast.show({
            type: 'success',
            text1: 'Cập nhật thông tin thành công',
            setVisibility: 1500,
            autoHide: true,
          })
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handle = response => {
    response !== undefined && setAvatar(response?.path)
  };

  
  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={banner} style={{width: width, height: height * 0.3}} />
        <TouchableOpacity style={[styles.avatar]} onPress={handleAvatarPress}>
          <Image source={{uri: avatar}} style={styles.avatarImage} />
        </TouchableOpacity>

        <ImagePick
          isVisible={isImagePickerVisible}
          onClose={handleImagePickerClose}
          getImage={handle}
          onLib={true}
        />
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            fontWeight: '700',
            marginTop: 20,
          }}>
          {item.full_name}
        </Text>
        <Text style={{color: '#000', opacity: 0.5}}>{item.org_name}</Text>
      </View>
      <View>
        <View style={styles.infor}>
          <Text style={{color: 'red'}}>Tên đầy đủ:</Text>
          <Controller
            control={control}
            name="fullname"
            render={({field: {onBlur, onChange}}) => (
              <TextInput
                value={fullName}
                onChangeText={text => {
                  setFullName(text);
                  onChange(text);
                }}
                onBlur={onBlur}
                placeholder=""
                style={{color: 'black'}}
                placeholderTextColor="black"
              />
            )}
          />
        </View>
        <View style={styles.infor}>
          <Text style={{color: 'red'}}>Email:</Text>
          <Controller
            control={control}
            name="mail"
            render={({field: {onBlur, onChange}}) => (
              <TextInput
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  onChange(text);
                }}
                onBlur={onBlur}
                placeholder=""
                style={{color: 'black'}}
                placeholderTextColor="black"
              />
            )}
          />
        </View>
        <View style={styles.infor}>
          <Text style={{color: 'red'}}>Chức vụ</Text>
          <Text style={{color: 'black', marginTop: 7}}>{item.role}</Text>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
          <TouchableOpacity onPress={handleSubmit(Submit)}>
            <View style={[styles.button, s.shadown, {marginBottom: 10}]}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
                Cập nhật
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  cancelButtonTitle: {
    fontSize: 15,
    color: 'black',
    textAlign: 'right',
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
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ccc',
    marginTop: -60,
  },
  infor: {
    marginTop: 20,
    width: width * 0.92,
    height: height * 0.08,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  button: {
    width: width * 0.4,
    height: height * 0.06,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Xemthongtin;
