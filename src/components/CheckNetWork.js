import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import NetInfo from "@react-native-community/netinfo";

const { width} = Dimensions.get('window');

const CheckNetWork = () => {
  const [isConnected, setIsConnected] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe(); // Hủy bỏ lắng nghe khi component bị hủy
    };
  }, []);

  return (
    <View>
      {isConnected == false && (
        <View style={{ width: width, backgroundColor: 'red', height: 25, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[{ color: 'white'}]}>
            Mất kết nối mạng
          </Text>
        </View>
      )}
    </View>
  );
};

export default CheckNetWork;
