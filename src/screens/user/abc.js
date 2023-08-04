import React from 'react';
import { StyleSheet, Image, Platform, View, Text, StatusBar, ScrollView, Dimensions, Alert, TouchableOpacity,AppState } from 'react-native';
import HeaderTab from '../components/HeaderTab';
import { COLORS, SIZES } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _, { isBuffer } from 'lodash';
import actions from '../redux/MainRedux';
import Toast from 'react-native-toast-message'
import { iconAbnormal, iconDataOffLine, iconHarvest, iconLogout, iconRP, logoApp } from '../constants/images';
import { apiList } from '../sevices/api';

const { width, height } = Dimensions.get("window");

const ProfileItem = ({ icon, name, image }) => (
    <View style={styles.itemContainer}>
        {/* <Icon name={icon} size={30} color={COLORS.main} /> */}
        <Image 
            source={image}
            resizeMethod='resize'
            resizeMode='contain'
            style={{width:70, height:70, marginHorizontal:15}}
        />
        <View>
            <Text style={[styles.itemText, { marginLeft: icon ? 15 : 0 }]}>{name}</Text>
        </View>
    </View>
);

export class ProfileScreen extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loadFont: false,
            isLoading: false,
            Avatar: "",
            Fullname: "",
            appState: AppState.currentState
        };
        this.GetMyProfile = this.GetMyProfile.bind(this)
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.GetMyProfile()
         })
        
      }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("NextProps:----------->" ,nextProps)
        // console.log("NextState:----------->" ,nextState)
        if(this.state.Avatar === nextState .avatar ||
           this.state.Fullname === nextState. Fullname) {
          return false;
        }
        return true
      }

   
      
    PressLogout = async () => {
        await AsyncStorage.removeItem('sessionID')
        await this.props.navigation.replace("Manhinh_Login")
    };

    GetMyProfile =  () => {
        // Alert.alert("RẺeeddđ");
        fetch(apiList.getProfile, 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "session_id": this.props.sessionID,
            })

        }).then((response) => response.json()

        ).then((response) => {
            if (response.code == 200) {
                this.setState({ 
                    Avatar: response.avatar,
                    Org: response.org_name,
                    Fullname: response.full_name,
Email: response.email,
                    Mobile: response.mobile,
                    userType: response.login_name,
                });
            }else{
                Alert.alert(response.desc)
            }

        }).catch((error) => {
            this.setState({Connected: false})
            console.log("error", error.toString())
        });
    }

    render() {
        const imageURL = this.state.Avatar || this.props.avatar
        console.log("check img: ----->", imageURL)
        return (
            <View style={styles.screenContainer}>
                {/* */}
                <HeaderTab title="Mở rộng" />
                {/*  */}
                <View style={styles.bodyContainer}>
                    <ScrollView
                        contentContainerStyle={{paddingBottom:10}}
                        showsVerticalScrollIndicator={false}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('MyProfile')}>
                            <View style={styles.userContainer}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                    
                                        // fadeDuration={}
                                        resizeMethod='resize'
                                        resizeMode="contain"
                                        source={{uri:imageURL ? imageURL : null}}
                                        style={{ width: 0.12 * width, height: 0.12* height, borderRadius: 100, aspectRatio:1 }} />
                                </View>
                                <View style={styles.textContainer}>
                                    {/* <Text style={styles.welcomeText}>Trang cá nhân</Text> */}
                                    <Text style={styles.authText}>{this.props.userName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*  */}
                        {
                            this.props.userType == 0 ?
                                <View style={{marginTop:-0.1*height, padding:10}}>
                                    {/* <View style={styles.divider} />
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('QuanLyMeThuHoach')}>
                                        <ProfileItem image={iconHarvest} name='Quản lý mẻ thu hoạch' />
                                    </TouchableOpacity> */}
                                    {/*  */}
                                    <View style={styles.divider} />
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('AllDataSaved')}>
                                        <ProfileItem image={iconDataOffLine} name="Quản lý dữ liệu Offline" />
</TouchableOpacity>
                                    {/*  */}
                                    <View style={[styles.divider]} />
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('BatThuong')}>
                                        <ProfileItem  image={iconAbnormal} name="Phản ánh bất thường" />
                                    </TouchableOpacity>
                                    {/*  */}
                               
                                    {/*  */}

                                </View>
                                :
                                this.props.userType == 1
                                    ?
                                    <View style={{marginTop:-0.1*height, padding:10}}>
                                        <View style={styles.divider} />
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Shopping')}>
                                            <ProfileItem image={iconHarvest}  name='Danh sách lô sản phẩm' />
                                        </TouchableOpacity>
                                        {/* <View style={styles.divider} /> */}
                                        {/* <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('ListAbnormalRP',{hasPlot: false})}>
                                            <ProfileItem image={iconAbnormal} name='Danh sách bất thường' />
                                        </TouchableOpacity> */}
                                        {/*  */}
                                        {/* <View style={[styles.divider]} />
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('ListChecklistHistory')}>
                                            <ProfileItem image={iconDataOffLine} name="Nhật ký công việc" />
                                        </TouchableOpacity> */}
                                        {/*  */}
                                  

                                    </View>
                                    :
                                    <View style={{padding:10, marginTop:-0.1*height}}>
                                        <View style={styles.divider} />
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Shopping')}>
                                            <ProfileItem image={iconHarvest}   name='Danh sách lô sản phẩm' />
                                        </TouchableOpacity>
                                        {/* <View style={styles.divider} />
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('ListAbnormalRP',{hasPlot: false})}>
<ProfileItem image={iconAbnormal} name='Danh sách bất thường' />
                                        </TouchableOpacity> */}
                                    </View>
                        }
                        
                        <View style={{paddingHorizontal:10}}>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')}>
                            <ProfileItem image={logoApp} name="ChatBot" />
                        </TouchableOpacity>
                        <View style={[styles.divider]} /> */}
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Hỗ trợ')}>
                                <ProfileItem image={iconRP} name="Góp ý cho nhà phát triển" />
                            </TouchableOpacity>
                        <View style={[styles.divider]} />
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { this.PressLogout() }}>
                                <ProfileItem image={iconLogout} desc={null} name="Đăng xuất" />
                            </TouchableOpacity>
                            </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}


export default connect(state => _.pick(state.main, ['sessionID', 'userName', 'userType', 'ConnectStatus','avatar']),
    dispatch => bindActionCreators(actions, dispatch))(ProfileScreen);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.lightGray
    },
    bodyContainer: {
        flex: 1,
        // padding: 15,
        backgroundColor: COLORS.lightGray,
    },
    //
    userContainer: {
        backgroundColor: COLORS.main,
        flexDirection: 'row',
        height: 0.25*height,
        padding:20
    },
    avatarContainer: {
        width: width / 4,
        height: width / 4,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderWidth: 3,
        borderColor: "#fff",
        overflow: "hidden"
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    welcomeText: {
        color: COLORS.black,
        fontSize: width / 22,
        textTransform: "uppercase"
    },
    authText: {
        color: COLORS.white,
        fontSize: SIZES.h2,
        fontWeight: '500',
        top:30
    },
    //
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems:'center',
        minHeight:100,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

elevation: 5,
    },
    itemText: {
        color: COLORS.main,
        fontSize: SIZES.h3,
        fontWeight:'bold',
    },
    divider: {
        height: 10,
    },
});
