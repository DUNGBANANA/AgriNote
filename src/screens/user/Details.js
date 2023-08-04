import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';

import {COLORS} from '../../constant/theme';
import {s} from '../Styled';
import Header from '../../components/header';

const {width, height} = Dimensions.get('window');
const Details = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <>
      <Header name="Chi tiết bất thường" back={true} />
      <ScrollView style={s.background}>
        <View style={[styles.container, s.shadown]}>
          <Text style={styles.text}>Tên sự kiện bất thường</Text>
          <Text style={s.h3}> Hình ảnh</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={{uri: item.image_url}} style={[styles.img]} />
          </View>
          <Text style={s.h3}>Mô tả</Text>
          <View style={[styles.item, s.shadown]}>
            <Text style={s.h1}>Thời gian: {item.created_time}</Text>
            <Text style={s.h1}>Khu vực: {item.plot_name}</Text>
            <Text style={s.h1}>Nhân viên ghi nhận: {item.user_name}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: 500,
    backgroundColor: COLORS.main,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    marginBottom: 10
  },
  text: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#fff',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  img: {
    height: 300,
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'cover',
    aspectRatio: 1,
  },
  item: {
    padding: 10,
    height: 80,
    width: width * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
});
export default Details;
