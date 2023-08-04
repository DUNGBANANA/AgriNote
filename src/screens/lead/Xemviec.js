import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import React from 'react';
import Header from '../../components/header';
import ImagePicker from '../../components/ImagePicker';
import {s} from '../Styled';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Controller, useForm} from 'react-hook-form';
import {Image} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Icon } from 'react-native-vector-icons/icon';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');
const Xemviec = ({route}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const {item} = route.params;
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState();
  const [id, setId] = React.useState();
  const [avatar, setAvatar] = React.useState(undefined);
  const [plotName, setPlotName] = React.useState();

  // Lưu công việc khi mất mạng
  const saveTaskOffline = async task => {
    try {
      // Lấy danh sách công việc đã lưu trữ
      const savedTasks = await AsyncStorage.getItem('offlineTasks');

      // Nếu danh sách công việc đã lưu trữ không tồn tại, khởi tạo một mảng trống
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];

      // Thêm công việc mới vào danh sách
      tasks.push(task);
      // Lưu danh sách công việc mới vào AsyncStorage
      await AsyncStorage.setItem('offlineTasks', JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = item => {
    setData(item);
    {
      visible == true && item.id == id ? setVisible(false) : setVisible(true);
    }
    // setVisible(!visible);
  };

  const handle = response => {
    setAvatar(response?.path);
  };

  const Submit = async data => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        // Mất mạng
        if (avatar === undefined) {
          Alert.alert('Tạo thất bại', 'Bạn chưa nhập ảnh');
        } else {
          saveTaskOffline({desc: data.Mt, linkImage: avatar, name: plotName});
          setVisible(false);
        }
      }
    });
  };

  const [isImagePickerVisible, setIsImagePickerVisible] = React.useState(false);
  const handleAvatarPress = () => {
    setIsImagePickerVisible(true);
  };
  const handleImagePickerClose = () => {
    setIsImagePickerVisible(false);
  };
  return (
    <View style={s.background}>
      <Header name="Quản lý công việc" back={true} />
      <View style={[s.item1, s.shadown]}>
        <Text style={s.h2}>Danh sách công việc</Text>
        <FlatList
          data={item}
          renderItem={({item}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={{width: 170}}>
                <Text style={{color: 'black', marginLeft: 10}}>
                  {item.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handlePress(item);
                  setPlotName(item.name);
                  setId(item.id);
                }}>
                <View style={[s.button, s.shadown]}>
                  <Text style={{color: 'white'}}>Thực hiện</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {visible && (
        <View
          style={[
            s.container,
            s.shadown,
            {height: height * 0.5, marginTop: 30, marginBottom: 10},
          ]}>
          <Text style={s.h3}>Thực hiện công việc</Text>
          <View
            style={[s.item1, s.shadown, {width: width * 0.95, marginTop: 20}]}>
            <Text style={[s.h2, {marginLeft: 'auto', marginRight: 'auto'}]}>
              {data.name}
            </Text>
            <View style={[s.item, {paddingBottom: 50}]}>
              <View style={{width: width * 0.45}}>
                {avatar == undefined ? (
                  <>
                    <TouchableOpacity onPress={handleAvatarPress}>
                      <View style={[t.back, {justifyContent: 'center', alignItems: 'center'}]}>
                      <Icon name="camera" size={30} style={{color: 'black'}} />
                      </View>
                    </TouchableOpacity>
                    <ImagePicker
                      getImage={handle}
                      isVisible={isImagePickerVisible}
                      onClose={handleImagePickerClose}
                    />
                  </>
                ) : (
                  <Image source={{uri: avatar}} style={t.img} />
                )}
              </View>
              <View style={[s.style1, {width: width * 0.45}]}>
                <Text style={{color: 'black'}}>Mô tả</Text>
                <Controller
                  control={control}
                  name="Mt"
                  rules={{required: 'Bạn chưa nhập mô tả'}}
                  render={({field: {value, onBlur, onChange}}) => (
                    <TextInput
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={t.desc}
                    />
                  )}
                />
                {errors.Mt && (
                  <Text style={{color: 'red'}}>{errors.Mt.message}</Text>
                )}
                <TouchableOpacity onPress={handleSubmit(Submit)}>
                  <View
                    style={[
                      s.button,
                      {width: width * 0.3, height: 25, marginTop: 10},
                    ]}>
                    <Text style={{color: 'white'}}>Xác nhận</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const t = StyleSheet.create({
  back: {
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 0.5,
    width: width * 0.33,
    height: height * 0.2,
    borderRadius: 10,
  },
  desc: {
    width: width * 0.35,
    height: height * 0.15,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  img: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
export default Xemviec;
