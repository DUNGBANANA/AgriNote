import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/header';
import {useDispatch, useSelector} from 'react-redux';
import useFetch from '../../hook/useFetch';
import { s } from '../Styled';
import {COLORS} from '../../constant/theme'
import { Toast } from 'react-native-toast-message/lib/src/Toast';



const {width} = Dimensions.get('window');


const showMessege = () =>{
  Toast.show({
    type: 'success',
    text1: 'Test',
    visibilityTime: 2000,
    autoHide: true,
  });
}
const ThongbaoLead = () => {
  const id = useSelector(state => state.infor.session_id);
  const dispatch = useDispatch();
  const data1 = useSelector(state => state);
  const {data, isLoading} = useFetch('/qr/listActiveJobInComing', {
    session_id: id,
  });


  return (
    <View>
      <Header name="Thông báo" back={true} />
      <View>
        {isLoading == true ? (
          <View style={s.center}>
            <ActivityIndicator size="large" color={'green'} />
          </View>
        ) : data.active_job_list?.length > 0 ? (
          <FlatList
            data={data.active_job_list}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.container} onPress={showMessege}>
                <Icon
                  name="warning"
                  size={40}
                  style={{color: 'white', margin: 15}}
                />
                <View style={{margin: 7}}>
                  <Text style={styles.text}>{item.process_name}</Text>
                  <Text style={styles.text}>Bắt đầu {item.start_time}</Text>
                  <Text style={styles.text}>Thời gian {item.end_time}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 'auto',
              marginTop: 'auto',
              display: 'flex',
            }}>
            <Text style={{color: 'black', fontFamily: '800', fontSize: 15}}>
              Hiện không có bản ghi nhật kí nào
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: width,
    backgroundColor: COLORS.main,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeader: {
    color: 'black',
    color: '#6d9368',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 20,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});
export default ThongbaoLead;
