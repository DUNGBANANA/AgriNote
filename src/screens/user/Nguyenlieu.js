import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Header from '../../components/header';
import useFetch from '../../hook/useFetch';
import {useSelector} from 'react-redux';

import {s} from '../Styled';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Nguyenlieu = () => {
  const [newData, setNewData] = React.useState();
  const navigation = useNavigation();
  const id = useSelector(state => state.infor.session_id);
  console.log(id);
  const {data, isLoading, error} = useFetch('/batch/listbatch', {
    session_id: id,
    plot_id: 0,
  });

  React.useEffect(() => {
    setNewData(data.batch_list);
  }, [data]);
  return (
    <>
      <Header back={true} name="Quản lý nguyên liệu" />
      {isLoading == true ? (
        <ActivityIndicator size={'large'} style={s.center} color={'green'} />
      ) : (
        <View style={s.background}>
          <View>
            <FlatList
              data={newData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('InforNguyenlieu', {item: item})
                  }>
                  <View style={[s.modal, s.shadown]}>
                    <Text style={[s.text1, {padding: 10}]}>{item.name}</Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                      }}>
                      <View style={t.imgContainer}>
                        <Image
                          source={{uri: item.qr_image_url}}
                          style={{width: width * 0.25, height: height * 0.15}}
                        />
                      </View>
                      <View>
                        <Text style={s.text2}>Khu vực: {item.name}</Text>
                        <Text style={s.text2}>
                          Người tạo: {item.created_by_name}
                        </Text>
                        <Text style={s.text2}>
                          Khối lượng: {item.weight}
                          {item.unit_name}
                        </Text>
                        <Text style={s.text2}>
                          Thời gian: {item.create_time.substring(0, 10)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    </>
  );
};

const t = StyleSheet.create({
  imgContainer: {
    width: width * 0.3,
    height: height * 0.16,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Nguyenlieu;
