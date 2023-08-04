import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../constant/theme'



const {width, height} = Dimensions.get('window')
export const s = StyleSheet.create({
  h1: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  h2:{
    color: COLORS.main,
    fontSize: 15,
    padding: 10,
    fontWeight: '500',
  },
  h3:{
    color: 'white',
    padding: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  
  text1: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: COLORS.main,
    fontSize: 14,
    fontWeight: '500'
  },
  text2:{
    color: 'black',
    fontSize: 14,
  },
  shadown: {
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  item:{
    display: 'flex',
    flexDirection: 'row',
     justifyContent: 'space-between',
    alignItems: 'center'
  },
  style: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: COLORS.main,
    fontSize: 16,
    fontWeight: '500',
    padding: 10
  },
  container:{
    marginBottom: 10,
    backgroundColor: COLORS.main,
    width: width,
  },
  item1:{
    backgroundColor: 'white',
    width: width*0.85,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    borderRadius: 8
  },
  item2:{
    backgroundColor: COLORS.main,
    width: width*0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    borderRadius: 8
  },
  modal: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    width: width * 0.93,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  button:{
    width: 90, 
    height: 35,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2:{
    color: 'black',
    width: 90,
    height: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    borderRadius: 8
  },
  center: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style1:{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  }
});
