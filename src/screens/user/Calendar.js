import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import Header from '../../components/header';
import {COLORS} from '../../constant/theme';
import Chart from '../../components/Chart';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {s} from '../Styled';
import SelectDropdown from 'react-native-select-dropdown';

const {width, height} = Dimensions.get('window');
const Calendar = () => {
  const [selected, setSelected] = React.useState(undefined);
  const [newData, setNewData] = React.useState(null);
  const [newData1, setNewData1] = React.useState(null);
  const id = useSelector(state => state.infor.session_id);
  const area = ['Tổng', 'Đã làm'];
  React.useEffect(() => {
    axios
      .post(
        'http://1.55.212.49:5555/AgriNoteAPIs//qr/getReportListJobByObject',
        {
          session_id: id,
        },
      )
      .then(response => {
        if (response.data) {
          setNewData(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  React.useEffect(() => {
    axios
      .post(
        'http://1.55.212.49:5555/AgriNoteAPIs//qr/listabnormalreportbytime',
        {
          session_id: id,
        },
      )
      .then(response => {
        if (response.data) {
          setNewData1(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  if (!newData || !newData1) {
    // Khi newData là null (chưa có dữ liệu)
    return (
      <>
        <Header name="Báo cáo" back={true} />
        <ActivityIndicator size={'large'} color={'green'} style={s.center} />
      </>
    );
  }
  const MAX_LABEL_LENGTH = 10;
  const truncateLabel = label => {
    if (label.length <= MAX_LABEL_LENGTH) {
      return label;
    }
    const firstChar = label.slice(0, MAX_LABEL_LENGTH / 2);
    const lastChar = label.slice(-MAX_LABEL_LENGTH / 2);
    return `${firstChar}...${lastChar}`;
  };
  let truncatedLabels = [];
  if (Array.isArray(newData.chart_label_day)) {
    truncatedLabels = newData.chart_label_day.map(label =>
      truncateLabel(label),
    );
  } else if (newData.chart_label_day) {
    truncatedLabels = [newData.chart_label_day]; // Chuyển đổi thành một mảng đơn lẻ
  }

  let truncatedLabels1 = [];
  if (Array.isArray(newData1.chart_label_day)) {
    truncatedLabels1 = newData1.chart_label_day.map(label =>
      truncateLabel(label),
    );
  } else if (newData1.chart_label_day) {
    truncatedLabels1 = [newData1.chart_label_day]; // Chuyển đổi thành một mảng đơn lẻ
  }
  const data = {
    labels: truncatedLabels,
    datasets: [
      {
        data: newData.chart_label_total,
      },
    ],
  };
  const data1 = {
    labels: truncatedLabels1,
    datasets: [
      {
        data: newData1.chart_label_report,
      },
    ],
  };
  return (
    <>
      <Header name="Báo cáo" back={true} />
      <ScrollView>
        {/* <View style={{flex: 1}}>
        <Dropdown label={'Tong'} data={data} onSelect={setSelected} />
        <ScrollView>
          {!!selected && <Image source={selected.value} style={{width: '100%', height: 500, resizeMode: 'contain' }}/>}
        </ScrollView>
      </View> */}
        <View style={styles.chart1}>
          <Text style={styles.text}>Tiến độ thực hiện theo khu vực</Text>
          <View style={s.item}>
            <Text style={s.h3}>Công việc</Text>
            <SelectDropdown
              data={area}
              onSelect={(selectedItem, index) => {
                console.log('NCD======>>', selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
              buttonStyle={[{borderRadius: 10, height: 35, marginLeft: 20}, s.shadown]}
              dropdownStyle={{borderRadius: 5}}
              search={true}
              searchInputStyle={{height: 40}}
              searchPlaceHolder="Nhập tên khu vực"
              buttonTextStyle={{color: 'green', fontSize: 15}}
            />
          </View>
          <Chart data={data} style={styles.chart} />
        </View>
        <View style={styles.chart2}>
          <Text style={styles.text}>Biểu đồ bất thường theo khu vực</Text>
          <Chart data={data1} style={styles.chart} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 15,
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  chart1: {
    marginBottom: 30,
    with: width,
    height: height * 0.5,
    backgroundColor: COLORS.main,
  },
  chart2: {
    with: width * 0.8,
    height: height * 0.4,
    backgroundColor: COLORS.main,
  },
});
export default Calendar;
