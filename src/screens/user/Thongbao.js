import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import React from 'react';

import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/header';
import {useDispatch, useSelector} from 'react-redux';
import useFetch from '../../hook/useFetch';
import { setNotify } from '../../features/getNotify';
import {s} from '../../screens/Styled'

const {width, height} = Dimensions.get('window');

const Thongbao = () => {
  const id = useSelector(state => state.infor.session_id);
  const dispatch = useDispatch();
  const data1 = useSelector(state => state.data.data);
  // console.log(data1);

 
  const {data, isLoading} = useFetch(
    '/qr/listabnormalreportNotification',
    {
      session_id: id,
    },
  );
  console.log(data)
  React.useEffect(()=>{dispatch(setNotify(data.abnormal_list))}, [data])

  return (
    <View>
      <Header name="Thông báo" back={true} />
      <View>
        {isLoading == true ? <View style={s.center}>
          <ActivityIndicator size="large" color={'green'} />
        </View>
        :
        data.abnormal_list?.length > 0 ? (
          <FlatList
            data={data.abnormal_list}
            renderItem={({item}) => (
              <View style={styles.container}>
                <Icon
                  name="warning"
                  size={40}
                  style={{color: 'white', margin: 15}}
                />
                <View style={{margin: 7}}>
                  <Text style={styles.text}>
                    Bất thường khu vực {item.plot_name}
                  </Text>
                  <Text style={styles.text}>Người tạo {item.user_name}</Text>
                  <Text style={styles.text}>Thời gian {item.created_time}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 'auto',
              marginTop: 'auto',
              display: 'flex', marginTop: 20
            }}>
            <Text style={{color: 'black', fontFamily: '800', fontSize: 15}}>
              Hiện không có bản ghi nhật kí nào
            </Text>
          </View>
        )
        }
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: width,
    backgroundColor: '#6d9368',
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
export default Thongbao;
