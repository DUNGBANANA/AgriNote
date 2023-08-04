import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../components/header';
import c from '../../constant/theme';
import {s} from '../../screens/Styled';
import {useSelector} from 'react-redux';
import thuhoach from '../../assets/03_thuhoach.png';
import SearchBar from '../../components/SearchBar';
import useFetch from '../../hook/useFetch';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import requestUserPermission from '../../utils/PushNotify';

const {width, height} = Dimensions.get('window');

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Tháng 1.',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  dayNamesShort: ['T2.', 'T3.', 'T4.', 'T5.', 'T6.', 'T7.', 'CN'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

const HomeLead = ({navigation}) => {
 
  const [selectedArea, setSelectedArea] = React.useState([]);
  const [data1, setData] = React.useState([]);
  const [item, setItem] = React.useState([]);
  const [dataOff, setDataOff] = React.useState([]);
  const [visible, setVisible] = React.useState(false); // Hiển thị lịch
  const [calendar, setCalendar] = React.useState();
  const idOnline = useSelector(state => state.infor.session_id);
  const [isConnected, setIsConnected] = React.useState(true);

  // Trường hợp khi login vào bị mạng nó sẽ lấy sesion cũ trong máy

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // return () => {
    //   unsubscribe(); // Hủy bỏ lắng nghe khi component bị hủy
    // };
  }, []);

  var a = [];
  var b = [];
  var d = [];
  for (let i = 0; i < calendar?.gate_list.length; i++) {
    a.push(calendar.gate_list[i].open_time.substring(0, 10));
    b.push(calendar.gate_list[i].close_time.substring(0, 10));
    d.push(calendar.gate_list[i].task_state);
  }
  const markedDates = {};
  const colors = [
    c.COLORS.main,
    c.COLORS.mainBlue,
    c.COLORS.yellow,
    c.COLORS.darkgray,
  ];
  for (let i = 0; i < a.length; i++) {
    const startDate = a[i];
    const endDate = b[i];
    const task = d[i];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const isStartDate = currentDate === startDate;
      const isEndDate = currentDate === endDate;

      // Tạo khoảng trắng giữa các công việc
      if (!isStartDate && !isEndDate) {
        markedDates[currentDate] = {
          disabled: true,
          disableTouchEvent: true,
          color: 'white', // Màu sắc khoảng trắng
        };
      } else {
        const colorIndex = i % colors.length; // Lấy chỉ số màu dựa trên chỉ số công việc
        const color = colors[colorIndex];
        markedDates[currentDate] = {
          selected: true,
          marked: true,
          color: colors[colorIndex], // Màu sắc cho công việc,
          tasks: task,
        };
      }
      // Tăng currentDate lên 1 ngày
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDate = nextDate.toISOString().split('T')[0];
    }
  }

  const {data, isLoading, error} = useFetch('/qr/listmyActiveJob', {
    session_id: idOnline,
  });

  React.useEffect(() => {
    setItem(data.plot_list);
    {
      data.plot_list !== undefined &&
        data.plot_list.length > 0 &&
        setData(data.plot_list);
    }
  }, [data]);

  React.useEffect(() => {
    const saveData = async data1 => {
      {
        data1.length > 0 &&
          (await AsyncStorage.setItem('Task', JSON.stringify(data1)));
      }
      const task = await AsyncStorage.getItem('Task');
      setDataOff(JSON.parse(task));
    };
    saveData(data1);
  }, [data1]);

  const renderItem = item => {
    const itemStyle = item.index % 2 === 0 ? t.item1 : t.item2;
    return (
      <View>
        <ScrollView style={{width: width}}>
          <TouchableOpacity
            style={itemStyle}
            onPress={() => {
              if (selectedArea.includes(item.index)) {
                setSelectedArea(
                  selectedArea.filter(index => index !== item.index),
                );
              } else {
                setSelectedArea([...selectedArea, item.index]);
              }
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '600',
                marginLeft: 20,
              }}>
              Khu vực: {item.item.plot_name}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Thuhoach', {item: item})}>
              <Image source={thuhoach} style={{width: 60, height: 60}} />
            </TouchableOpacity>
          </TouchableOpacity>
          {selectedArea.includes(item.index) && (
            <FlatList
              data={item.item.active_job_list}
              renderItem={({item}) => (
                <View style={t.modal}>
                  <Text style={t.process_name}>{item.process_name}</Text>
                  <View style={s.item}>
                    <View>
                      <Text style={{color: 'black'}}>
                        Bắt đầu: {item.start_time.substring(0, 16)}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Kết thúc: {item.end_time.substring(0, 16)}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Phiên làm việc: {item.gate_state}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Trạng thái:{' '}
                        {item.time_state == 'Đang hoạt động' ? (
                          <Text style={{color: 'green', fontWeight: '500'}}>
                            {item.time_state}
                          </Text>
                        ) : (
                          <Text style={{color: 'red', fontWeight: '500'}}>
                            {item.time_state}
                          </Text>
                        )}
                      </Text>
                    </View>

                    {item.time_state == 'Đang hoạt động' ? (
                      <View
                        style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Xemviec', {
                              item: item.checklist_list,
                            })
                          }>
                          <View style={[s.button, s.shadown]}>
                            <Text style={[{color: 'white', fontSize: 14}]}>
                              Xem Việc
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setVisible(!visible);
                            setCalendar(item);
                          }}>
                          <View style={[s.button, s.shadown]}>
                            <Text style={[{color: 'white', fontSize: 14}]}>
                              Xem Lịch
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              )}
            />
          )}
        </ScrollView>

        {/* Hiển thị lịch làm việc */}
        <Modal
          animationType="fade"
          visible={visible}
          transparent={false}
          onRequestClose={() => setVisible(!visible)}>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 350,
            }}
            markingType={'period'}
            onDayPress={day => {
              const selectedDate = day.dateString;
              const selectedTasks = markedDates[selectedDate];
              Alert.alert(day.dateString, selectedTasks.tasks);
            }}
            markedDates={markedDates}
          />
        </Modal>
      </View>
    );
  };

  // Hàm trả về kết quả tìm kiếm
  const handleSearch = result => {
    setItem(result);
  };

  
  
  return (
    <View style={{height: height*0.9}}>
      <Header iconHomeLead={true}>
        {/* Tìm kiếm */}
        <SearchBar data={data1} onSearch={handleSearch} />
      </Header>
      {isConnected == false ? (
        <FlatList data={dataOff} renderItem={renderItem} />
      ) : (
        <FlatList data={item} renderItem={renderItem} />
      )}
    </View>
  );
};

const t = StyleSheet.create({
  process_name: {
    color: c.COLORS.main,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
  },
  item1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: c.COLORS.main,
    height: height * 0.08,
    width: width,
    marginBottom: 8,
  },
  item2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: c.COLORS.txtContent,
    height: height * 0.08,
    width: width,
    marginBottom: 8,
  },
  container: {
    backgroundColor: c.COLORS.main,
    width: width,
    position: 'absolute',
  },
  modal: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    width: width * 0.93,
    height: height * 0.19,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
});
export default HomeLead;
