import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import React from 'react';

import Header from '../../components/header';
import {s} from '../Styled';
import {Controller, useForm} from 'react-hook-form';
import ImagePick from '../../components/ImagePicker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');
const Batthuong = () => {
  const {handleSubmit, control} = useForm();
  const [image, setImage] = React.useState([]);
  const area = ['Test2', 'Test1', 'Test124', 'Khu vực dưa lưới'];
  const getImage = response => {
    // console.log('NCD===== ======>', response);
    setImage([...image, response?.path]);
  };
  
  const [isImagePickerVisible, setIsImagePickerVisible] = React.useState(false);
  const handleAvatarPress = () => {
    setIsImagePickerVisible(true);
  };
  const handleImagePickerClose = () => {
    setIsImagePickerVisible(false);
  };

  const Submit = async data => {
    console.log('ABC====>', data);
  };

  const handleRomove = (id) =>{
    const updatedImage = [...image];
    updatedImage.splice(id, 1);
    setImage(updatedImage);
  }
  return (
    <View>
      <Header name="Phản ánh bất thường" back={true} />
      <View style={[s.item2, {width: width * 0.95}, s.shadown]}>
        <Text style={s.h3}>Hình ảnh</Text>

        {image?.length > 1 ? (
          <View
            style={[
              {
                width: width * 0.86,
                height: height * 0.16,
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 10,
              },
            ]}>
            <FlatList
              horizontal
              data={image}
              // keyExtractor={i => i.toString()}
              renderItem={({item, index}) => (
                <View style={{borderRadius: 10, margin: 5}}>
                  {item !== undefined && (
                    <>
                      <ImageBackground
                        source={{uri: item}}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          resizeMode: 'cover',
                          justifyContent: 'flex-end',
                          flexDirection: 'row'
                        }}
                      > 
                      <TouchableOpacity onPress={()=>handleRomove(index)}>

                        <Icon1 name="closecircle" size={20} color={'white'} style={{marginTop: 0}}/>
                      </TouchableOpacity>
                      </ImageBackground>
                    </>
                  )}
                </View>
              )}
            />
            <View
              style={[
                {
                  width: width * 0.2,
                  height: height * 0.15,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Icon
                name="plus"
                size={20}
                color={'green'}
                onPress={handleAvatarPress}
              />
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={handleAvatarPress}>
            <View
              style={[
                s.item1,
                s.shadown,
                {height: 100, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Icon name="camera" size={30} style={{color: 'black'}} />
            </View>
          </TouchableOpacity>
        )}

        <ImagePick
          getImage={getImage}
          openCamera={true}
          isVisible={isImagePickerVisible}
          onClose={handleImagePickerClose}
        />
        <View style={s.item}>
          <Text style={s.h3}>Khu vực</Text>
          <SelectDropdown
            data={area}
            onSelect={(selectedItem, index) => {
              console.log('NCD======>>', selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={[styles.select, s.shadown]}
            dropdownStyle={{borderRadius: 5}}
            search={true}
            searchInputStyle={{height: 40}}
            searchPlaceHolder="Nhập tên khu vực"
            renderDropdownIcon={() => {}}
            buttonTextStyle={{color: 'red', fontSize: 15}}
          />
        </View>
        <Text style={s.h3}>Mô tả</Text>
        <Controller
          control={control}
          name="Mt"
          render={({field: {value, onBlur, onChange}}) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[styles.desc, s.shadown]}
            />
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(Submit)}
          style={[s.button2, s.shadown]}>
          <Text style={[s.h2, {padding: 3}]}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    marginLeft: 20,
    width: 200,
    borderRadius: 10,
    height: 40,
  },
  desc: {
    width: width * 0.85,
    height: height * 0.3,
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    borderRadius: 10,
    color: 'black',
  },
});
export default Batthuong;
