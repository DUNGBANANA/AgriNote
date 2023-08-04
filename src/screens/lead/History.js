import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import useFetch from '../../hook/useFetch';
import {s} from '../Styled';
import {useEffect} from 'react';
import Header from '../../components/header';

const {width, height} = Dimensions.get('window');

const RenderTime = ({data}) => {
  return data.map((item) => (
    <View
      key={item.id} // Sử dụng index của mảng để làm key
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <View style={{ width: width * 0.5 }}>
        <Text style={{ color: 'black', padding: 15 }}>
          {item.checklist_name}
        </Text>
      </View>
      <View style={{ width: width * 0.45 }}>
        <Text style={{ color: 'red', padding: 10 }}>
          Thời gian: {item.create_time.substring(0, 10)}
        </Text>
      </View>
    </View>
  ));
};

const History = () => {
  const id = useSelector(state => state.infor.session_id);
  const {data, isLoading, error} = useFetch('/qr/gethistoryofworker', {
    session_id: id,
  });
  const [newData, setData] = React.useState([]);

  useEffect(() => {
    if (data.list_history_worker !== undefined && data.list_history_worker.length > 0) {
      setData(data.list_history_worker);
    }
  }, [data]);
  const renderItem = (item, index) => {
    return (
      <ScrollView style={[s.container]} key={index}>
        <Text style={s.h3}>{item.plot_name}</Text>
        <View
          style={[s.item1, s.shadown, {width: width * 0.9, marginBottom: 20}]}>
          <RenderTime data={item?.list_diary} key={item.index} />
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={{width: width, height: height * 0.92}}>
      <Header name="Lịch sử" back={true} />
      {isLoading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color={'green'} />
        </View>
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <View>
          <FlatList
            data={newData}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()} 
          />
        </View>
      )}
    </View>
  );
};

export default History;
