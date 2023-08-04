import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Header from '../../components/header';
import {s} from '../Styled';
import {COLORS} from '../../constant/theme';
import useFetch from '../../hook/useFetch';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');
const Khuvuc = ({navigation}) => {
  const [newData, setNewData] = React.useState('');
  const id = useSelector(state => state.infor.session_id);
  const {data, isLoading, error} = useFetch('/mngtobj/getmngtobjtree', {
    session_id: id,
  });
  useEffect(() => {
    setNewData(data?.mngtobj_tree);
  }, [data]);
  console.log(newData)
  return (
    <>
      <Header name="Khu vực sản xuất" back={true} />
      {isLoading == true ? (
        <ActivityIndicator color={'green'} style={s.center} size={'large'} />
      ) : (
        <View>
          <View style={styles.container}>
            <Text style={[s.h3, {padding :10}]}>
              Thông tin khu vực sản xuất
            </Text>
            <FlatList
              data={newData}
              renderItem={({item}) => (
                <View style={styles.item} key={item.index}>
                  <Text style={styles.textItem}>
                    Thông tin thực hiện của {item.name}
                  </Text>

                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    {item.logo == '' ? (
                      <Image
                        source={{
                          uri: 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG',
                        }}
                        style={styles.img}
                      />
                    ) : (
                      <Image source={{uri : item.logo}} style={styles.img} />
                    )}
                    <View>
                      <Text style={{color: 'black'}}>{item.created_time}</Text>
                      <Text style={{color: 'black'}}>
                        Sô công việc đã thực hiện: {item.success_counter}/
                        {item.process_counter}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Số sự kiện bất thường: {item.abnormal_counter}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Số công việc quá hạn: {item.pass_session_counter}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Thu hoạch: {item.comment}
                      </Text>

                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            navigation.navigate('Nhatki', {item: item});
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '600',
                              color: '#fff',
                            }}>
                            Nhật kí
                          </Text>
                        </TouchableOpacity>
                        {item.children.length > 0 && (
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => setNewData(item.children)}>
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: '600',
                                color: '#fff',
                              }}>
                              Khu vực con
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    width: 90,
    height: 30,
    backgroundColor: COLORS.main,
    color: '#fff',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    elevation: 8,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
  },
  img: {
    width: 110,
    height: 110,
    marginLeft: 10,
    marginTop: 15,
    marginRight: 10,
    borderRadius: 10,
    borderColor: COLORS.main,
    borderWidth: 1,
  },
  container: {
    backgroundColor: COLORS.main,
    width: width,
    height: height * 0.92,
  },
  item: {
    backgroundColor: '#fff',
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  textItem: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#6d9368',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  bell: {
    backgroundColor: '#6d9368',
    height: 35,
    width: 35,
    borderRadius: 5,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Khuvuc;
