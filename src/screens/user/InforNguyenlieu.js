import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Header from '../../components/header';
import {s} from '../Styled';
import useFetch from '../../hook/useFetch';
import {useSelector} from 'react-redux';



const {width, height} = Dimensions.get('window');
const InforNguyenlieu = ({route}) => {
  const item = route.params;
  const {qr_code} = route.params;
  const [newData, setNewData] = React.useState([]);

  const id = useSelector(state => state.infor.session_id);

  const {data, isLoading, error} = useFetch('/batch/getbatchinfo', {
    session_id: id,
    plot_id: 0,
    qr_code: qr_code,
  });
  React.useEffect(() => {
    {
      data.product_info==undefined ? setNewData(item.item): setNewData(data.product_info);
    }
  }, [data]);

  return (
    <>
      <Header name="Thông tin lô nguyên liệu" back={true} />
      
      {isLoading == true ? (
        <ActivityIndicator size={'large'} color={'green'} style={s.center} />
      )  : (
        <View style={s.background}>
          <View style={[s.modal, s.shadown]}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
              }}>
              <Image
                source={{uri: newData?.image_url}}
                style={{width: width * 0.25, height: height * 0.13}}
              />
              <View>
                <Text style={t.text}>Mã: {newData?.qr_code}</Text>
                <Text style={t.text}>Tên: {newData?.name}</Text>
                <Text style={t.text}>Khu SX: {newData?.plot_name}</Text>
                <Text style={t.text}>
                  NSX: {newData?.create_time?.substring(0, 10)}
                </Text>
                <Text style={t.text}>
                  Khối lượng: {newData?.weight}
                  {newData?.unit_name}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={s.modal}>
            <Text style={s.text1}>CÁC CHỨNG CHỈ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.modal}>
            <Text style={s.text1}>NHẬT KÍ NUÔI TRỒNG</Text>
          </TouchableOpacity>
          <View style={s.modal}>
            <View>
              {/* <Icon name="fas fa-location" color="green" size={20}/> */}
              <Text style={s.text1}>DOANH NGHIỆP SỞ HỮU</Text>
            </View>
            <Text style={t.text}>
              Địa chỉ: <Text style={t.text1}>CDIT</Text>
            </Text>
            <Text style={t.text}>
              Điện thoại <Text style={t.text1}>0376018099</Text>
            </Text>
            <Text style={t.text}>
              Email: <Text style={t.text1}>cdit@gmail.com</Text>
            </Text>
            <Text style={t.text}>
              Website <Text style={t.text1}>Chưa cập nhật</Text>
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const t = StyleSheet.create({
  imgContainer: {
    width: width * 0.3,
    height: height * 0.16,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'green',
    fontSize: 14,
  },
  text1: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
export default InforNguyenlieu;
