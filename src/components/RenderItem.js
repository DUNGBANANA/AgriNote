import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import c from '../constant/theme';

const {width, height} = Dimensions.get('window');
const RenderItem = ({name, title, Data, text}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{padding: 15, color: '#fff', fontSize: 15, fontWeight: '600'}}>
        {name}
      </Text>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.textItem}>{title}</Text>
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
                <Text style={{color: 'black'}}>Khu vực: {item.plot_name}</Text>
                <Text style={{color: 'black'}}>
                  Nhân viên: {item.user_name}
                </Text>
                <Text style={{color: 'black'}}>Mô tả: {item.comment}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Details', {item: item})}>
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
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: c.COLORS.main,
    width: width,
    height: height * 0.82,
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
    color: '#6d9368',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  img: {
    width: 60,
    height: 60,
  },
});

export default RenderItem;
