import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import React from 'react';
import Header from '../../components/header';
import {s} from '../Styled';
import {COLORS} from '../../constant/theme';
import {Controller, set, useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const Thuhoach = ({route}) => {
  const id = useSelector(state => state.infor.session_id);
  const {item} = route.params;
  const [modal, setModal] = React.useState(false); // Modal tạo mẻ mới
  const [itemVisible, setItemVisible] = React.useState(false); //Modal khi click "Xem chi tiet"
  const [iTem, setItem] = React.useState();
  const {handleSubmit, control,   formState: {errors},} = useForm();
  const [data, setData] = React.useState();


  //Lấy ra mẻ đã tạo
  React.useEffect(() => {
    try {
      axios
        .post('http://1.55.212.49:5555/AgriNoteAPIs//lot/listmylotbyobject', {
          session_id: id,
          mngtobj_id: item?.item.plot_id,
        })
        .then(response => {
          console.log(response.data);
          setData(response.data.lot_list);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  }, []);

  // Tạo mẻ thu hoạch
  const sendApi = async data => {
    try {
      const response = await axios.post(
        'http://1.55.212.49:5555/AgriNoteAPIs//lot/createlot',
        {
          session_id: id,
          lot_name: data.lot_name,
          desc: data.desc,
          lot_weight: data.lot_weight,
          mngtobj_id: item.item.plot_id,
          lotunit_id: 1,
        },
      );
      if (response.data.code === 200) {
        Alert.alert('Tạo mẻ thành công');
        navigation.goBack();
      } else {
        Alert.alert('Tạo mẻ thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={s.background}>
      <Header name="Thu hoạch" back={true} />
      <View>
        <View style={[t.container, s.shadown, {height: height * 0.3}]}>
          <View style={s.item}>
            <Text style={s.title}>Danh sách mẻ</Text>
            <TouchableOpacity
              onPress={() => {
                setModal(!modal);
                setItemVisible(false);
              }}>
              <View style={[t.add, s.shadown]}>
                <Text style={[s.h1, {color: COLORS.main}]}>
                  Thêm mẻ thu hoạch
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: width * 0.2}}>
                  <Text style={{color: 'black'}}>{item.name}</Text>
                </View>
                <TouchableOpacity
                  style={[s.button, s.shadown]}
                  onPress={() => {
                    setItemVisible(true);
                    setModal(false);
                    setItem(item);
                  }}>
                  <Text style={{color: 'white', fontSize: 14}}>
                    Xem chi tiết
                  </Text>
                </TouchableOpacity>
                {/* {itemVisible && } */}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled={true}
          />
        </View>
        {itemVisible && (
          <View
            style={[s.container, {marginTop: 'auto', marginBottom: 'auto'}]}>
            <Text style={s.h3}>Chi tiết mẻ thu hoạch</Text>
            <View style={[s.modal, {marginBottom: 20}]}>
              <Text style={s.text1}>{iTem?.name}</Text>
              <Text style={s.h1}>
                Khu vực:
                <Text style={{color: 'red'}}>{iTem?.plot_name}</Text>
              </Text>
              <Text style={s.h1}>
                Mô tả:{' '}
                <Text style={{color: 'red', fontWeight: '400'}}>
                  {iTem?.desc}
                </Text>
              </Text>
              <Text style={s.h1}>
                Người tạo:{' '}
                <Text style={{color: 'red'}}>{iTem?.create_by_name}</Text>
              </Text>
              <Text style={s.h1}>
                Thời gian tạo:{' '}
                <Text style={{color: 'red'}}>{iTem?.create_time}</Text>
              </Text>
              <Text style={s.h1}>
                Khối lượng:{' '}
                <Text style={{color: 'red'}}>{iTem?.weight} kg</Text>
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Modal thêm mẻ thu hoạch */}

      {modal && (
        <ScrollView style={[s.container]}>
          <Text style={s.h3}>Thực hiện thu hoạch</Text>
          <View style={[s.item1, s.shadown, {width: width * 0.9}]}>
            <Text style={s.text1}>Thu hoạch</Text>
            <Text style={{color: 'black', marginLeft: 10}}>Tên mẻ</Text>
            <Controller
              control={control}
              name="lot_name"
              rules ={{required: "Chưa nhập tên mẻ"}}
              render={({field: {value, onChange, onBlur}}) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nhập tên mẻ..."
                  placeholderTextColor="#ccc"
                  style={[t.input, {marginLeft: 'auto', marginRight: 'auto'}]}
                />
              )}
            />
            {errors.lot_name && (
                  <Text style={{color: 'red', marginLeft: 'auto', marginRight: 'auto', marginTop: -5}}>{errors.lot_name.message}</Text>
                )}
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'black', marginLeft: 10}}>                
                Khối lượng:
              </Text>
              <Controller
                control={control}
                name="lot_weight"
                rules={{required:'Chưa nhập khối lượng'}}
                render={({field: {value, onChange, onBlur}}) => (
                  <TextInput
                    keyboardType="numeric"                    
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholderTextColor="black"
                    style={[t.input, {width: width * 0.15, }]}
                  />
                )}
              />
              <Text style={{color: 'black', marginLeft: 10}}>kg</Text>
            </View>
            {errors.lot_weight && <Text style={{color: 'red', marginLeft: 'auto', marginRight: 'auto'}}>{errors.lot_weight.message}</Text>}
            <Text style={{color: 'black', marginLeft: 10}}>Mô tả</Text>
            <Controller
              control={control}
              name="desc"
              rules={{required: 'Chưa nhập mô tả'}}
              render={({field: {value, onChange, onBlur}}) => (
                <TextInput
                  // keyboardType="numeric"
                  
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor="black"
                  style={[t.input, {marginLeft: 'auto', marginRight: 'auto', height: height*0.2}]}
                />
              )}
            />
            {errors.desc && <Text style={{color: 'red', marginLeft: 'auto', marginRight: 'auto'}}>{errors.desc.message}</Text>}
            <TouchableOpacity
              onPress={handleSubmit(sendApi)}
              style={[
                s.button,
                s.shadown,
                {marginLeft: 'auto', marginRight: 'auto', marginTop: 10},
              ]}>
              <Text style={{color: 'white'}}>Tạo mẻ</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const t = StyleSheet.create({
  input: {
    width: width * 0.8,
    height: 35,
    borderColor: COLORS.main,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    color: 'black',
    padding: 5,
  },
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    // height: height * 0.3,
    width: width * 0.9,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  add: {
    margin: 10,
    width: width * 0.45,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

export default Thuhoach;
