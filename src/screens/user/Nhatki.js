import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../components/header';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';


const {width, height} = Dimensions.get('window');
const Nhatki = ({route}) => {
  const [newData, setNewData] = React.useState('');
  const data = useSelector(state => state.infor.session_id);
  console.log(data);
  console.log(route.params.item.id);
  React.useEffect(() => {
    axios
      .post('http://1.55.212.49:5555/AgriNoteAPIs/mngtobj/getDiaryOfObject', {
        session_id: data,
        mngtobj_id: route.params.item.id,
      })
      .then(response => {
        setNewData(response.data.checklist_history_list);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  console.log(newData);
  return (
    <View style={styles.container}>
      <Header name="Danh sách nhật kí" back={true}/>
      {newData.length> 0 ? <FlatList
        data={newData}
        renderItem={({item}) => (
          <View style={styles.itemT}>
            <Text style={styles.textItem}>{item.checklist_name}</Text>
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
                  style={styles.img}
                />
              )}
              <View style={{marginTop: 20, width: width*0.6}}>
                <Text style={{color: 'black'}}>Công việc: {item.process_name}</Text>
                <Text style={{color: 'black'}}>
                  Mô tả: {item.comment}
                </Text>
                <Text style={{color: 'black'}}>Khu vực: {item.object_name}</Text>
                <Text style={{color: 'black'}}>Khu vực: {item.created_time.substring(0, 16)}</Text>
                <Text style={{color: 'black'}}>Khu vực: {item.user_name}</Text>
              </View>
            </View>
          </View>
        )}
      />: <View style={{justifyContent:'center', alignItems:'center', marginBottom: 'auto', marginTop: 'auto'}}>
        <Text style={{color:'black', fontFamily: '800', fontSize: 15}}>Hiện không có bản ghi nhật kí nào</Text>
      </View>}
     
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      marginRight: 10,
      width: 90,
      height: 30,
      backgroundColor: '#6d9368',
      color: '#fff',
      borderRadius: 5,
      padding: 5,
      alignItems: 'center',
      textAlign: 'center',
    },
    img: {
      width: 110,
      height: 110,
      marginLeft: 10,
      marginTop: 15,
      marginRight: 10,
      borderRadius: 10,
      borderColor: '#6d9368',
      borderWidth: 1,
    },
    header: {
      width: width,
      height: 60,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#fff',
      width: width,
      height: height,
    },
    itemT: {
        marginTop: 10,
      backgroundColor: '#fff',
      width: width * 0.95,
      marginLeft: 'auto',
      marginRight: 'auto',
      height: 180,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowRadius: 10,
      elevation: 12,
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
  
  
export default Nhatki;
