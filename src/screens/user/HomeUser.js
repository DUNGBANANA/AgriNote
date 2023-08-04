import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';

import React from 'react';

import {TouchableOpacity} from 'react-native-gesture-handler';

import Header from '../../components/header';
import {COLORS} from '../../constant/theme'
import useFetch from '../../hook/useFetch'
import { useSelector } from 'react-redux';


const {width, height} = Dimensions.get('window');


const HomeUser = ({navigation}) => {
  const id = useSelector(state => state.infor.session_id);
  const [newData, setNewData] = React.useState([]);
  const {data, isLoading, error} = useFetch("qr/listabnormalreport", {session_id: id})
  React.useEffect(() => {
   data?.abnormal_list?.length !== undefined && setNewData(data?.abnormal_list)
  }, [data]);
  return (
    <View>
      <Header name="Sự kiện bất thường"  close={false} back={false} icon={true}/>
      <View style={styles.container}>
        <Text
          style={{padding: 15, color: '#fff', fontSize: 15, fontWeight: '600'}}>
          Danh sách sự kiện bất thường
        </Text>
        <FlatList
          data={newData}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.textItem}>Tên sự kiện bất thường</Text> 
              {/* <Text style={{color: 'black'}}>{item.user_name}</Text> */}

              <View style={{display: 'flex', flexDirection: 'row'}}>
                {item.image_url == '' ? (
                  <Image
                    source={{
                      uri: 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG',
                    }}
                    style={{
                      width: 130,
                      height: 130,
                      marginLeft: 20,
                      marginTop: 15,
                    }}
                  />
                ) : (
                  <Image
                    source={{uri: item.image_url}}
                    style={{
                      width: 130,
                      height: 130,
                      marginLeft: 20,
                      marginTop: 15,
                    }}
                  />
                )}
                <View style={{marginTop: 20, marginLeft: 10}}>
                  <Text style={{color: 'black'}}>{item.created_time}</Text>
                  <Text style={{color: 'black'}}>
                    Khu vực: {item.plot_name}
                  </Text>
                  <Text style={{color: 'black'}}>
                    Nhân viên: {item.user_name}
                  </Text>
                  <Text style={{color: 'black'}}>Mô tả: {item.comment}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('Details', {item: item})
                    }>
                    <Text
                      style={{fontSize: 13, fontWeight: '600', color: '#fff'}}>
                      Xem chi tiết
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.main,
    width: width,
    height: height * 0.83,
  },
  item: {
    backgroundColor: '#fff',
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    elevation: 4,
  },
  textItem: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: COLORS.main,
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  img: {
    width: 60,
    height: 60,
  },
  button: {
    marginTop: 18,
    width: 110,
    height: 30,
    backgroundColor: COLORS.main,
    color: '#fff',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 2, height: 5},
    shadowRadius: 5,
    elevation: 4,
  },
  bell: {
    backgroundColor: COLORS.main,
    height: 35,
    width: 35,
    borderRadius: 5,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeUser;
