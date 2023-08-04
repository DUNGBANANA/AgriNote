import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {s} from '../Styled';

const {width, height} = Dimensions.get('window');
const DulieuOff = () => {
  const [data, setData] = useState([]);

  // Lấy dữ liệu từ Async về
  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await AsyncStorage.getItem('offlineTasks');
        setData(JSON.parse(task));
      } catch (error) {
        console.log('Lỗi không lấy được dữ liệu về: ', error);
      }
    };
    fetchData();
  }, []);

  // Đồng bộ công việc khi có mạng
  const postApi = () => {
    console.log('PostAPi');
  };

  // Xóa công việc
  const handleDelete = async index => {
    try {
      const tasks = await AsyncStorage.getItem('offlineTasks');
      const updatedTasks = JSON.parse(tasks);

      // Xóa công việc khỏi danh sách theo chỉ số index
      updatedTasks.splice(index, 1);

      // Cập nhật danh sách công việc mới trong AsyncStorage
      await AsyncStorage.setItem('offlineTasks', JSON.stringify(updatedTasks));

      setData(updatedTasks);
    } catch (error) {
      console.log('Lỗi xóa công việc: ', error);
    }
  };


  return (
    <>
      <Header name="Dữ liệu lưu trữ" back={true} />
      <View style={[s.background]}>
        <View>
          {data?.length > 0 ? (
            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <View style={[s.item2, s.shadown]}>
                  <Text style={[s.text1, s.h3]}>{item.name}</Text>
                  <View style={s.style}>
                    <View style={{margin: 10}}>
                      <Image source={{uri: item.linkImage}} style={t.img} />
                    </View>
                    <View style={[{width: width * 0.5, height: height * 0.18}]}>
                      <Text style={[s.h3, {padding: 5}]}>
                        Mô tả: {item.desc}
                      </Text>
                      <Text style={[s.h3, {padding: 5}]}>Ngày tạo: </Text>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          style={[
                            s.button2,
                            s.shadown,
                            {width: width * 0.2, marginRight: 10},
                          ]}
                          onPress={() => postApi()}>
                          <Text style={[s.h2, {padding: 5}]}>Đồng bộ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[s.button2, s.shadown, {width: width * 0.2}]}
                          onPress={() => handleDelete(index)}>
                          <Text style={[s.h2, {padding: 5}]}>Xóa</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <Text style={[s.h1, {fontSize: 15}]}>Không có bản ghi nào</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const t = StyleSheet.create({
  img: {
    width: width * 0.3,
    height: height * 0.18,
    borderRadius: 10,
  },
});
export default DulieuOff;
