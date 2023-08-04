import Icon from 'react-native-vector-icons/FontAwesome';
import * as React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



import { levelDown, levelUp } from '../features/getData';
import { useDispatch, useSelector } from 'react-redux';



const BaseURL = 'http://eyecheck.vn';

export default function Home() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const level = data?.newData[0]?.level;

  console.log(data.newData);
  // const [newdata, setNewData] = React.useState(data);
  // const [level, setLevel] = React.useState(0);

  // const LevelUp = (item) => {
  //   setLevel(level + 1);
  //   setNewData(item.children);
  //   for(var i=0; i<item.children.length; i++){
  //     item.children[i].parent = newdata;
  //   }
  // };
  // const LevelDown = () => {
  //   setLevel(level - 1);
  //   setNewData(newdata[0].parent);
  // }

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <StatusBar
        backgroundColor="#fff" // Màu nền của thanh hiển thị giờ
        barStyle="dark-content" // Kiểu chữ trên thanh hiển thị giờ (light-content hoặc dark-content)
      />
      {level > 0 && (
        <TouchableOpacity onPress={() => dispatch(levelDown(data.newData))}>
          <Icon
            name="chevron-circle-left"
            size={35}
            color="green"
            style={{marginLeft: 20, marginTop: 15}}
          />
        </TouchableOpacity>
      )}
      <FlatList
        data={data.newData}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text style={styles.name}>Khu vực: {item.name}</Text>
            <View style={{display: 'flex', flexDirection: 'row', margin: 15}}>
              <View>
                {item.children.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => dispatch(levelUp(item))}>
                    <Text style={{color: 'black', marginTop: 5}}>
                      Số khu vực con: {item.children.length}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <Text style={{color: 'black', marginTop: 5}}>
                  Bất thường: {item.abnormal_counter}
                </Text>
                <Text style={{color: 'black', marginTop: 5}}>Delete Area</Text>
              </View>

              <Image
                style={{
                  width: 130,
                  height: 100,
                  marginLeft: 50,
                }}
                source={{uri: BaseURL + item.image_url}}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '94%',
    height: 200,
    borderWidth: 1.5,
    borderRadius: 10,
    margin: 10,
    marginTop: 20,
    borderColor: 'green',
  },
  area: {
    color: 'black',
  },
  name: {
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});
