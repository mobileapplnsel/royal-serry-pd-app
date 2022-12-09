import React from 'react';
import {
  View,
  StatusBar,
  Switch,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  ListItem,
  Body,
  Left,
  Footer,
  FooterTab,
  Right,
  ActionSheet,
  Card,
  CardItem,
  Icon as NativeBaseIcon,
  Thumbnail,
  Content,
  Container,
  Icon,
} from 'native-base';

import {color} from 'react-native-reanimated';
import BaseViewModel from '../../../Core/BaseViewModel';
import BaseComponent from '../../../Core/BaseComponent';
import BaseState from '../../../Core/BaseState';
import CustomModalIndicator from '../../../Control/CustomModalIndicator';
import BaseColor from '../../../Core/BaseTheme';
import ViewStyle from '../../../Style/ViewStyle';
import CustomImage from '../../../Control/CustomImage';
import TextStyle from '../../../Style/TextStyle';
import {FlatGrid} from 'react-native-super-grid';
import {EmptyCollectionPage} from '../../../Control/Index';
import Modal from 'react-native-modal';
import SessionHelper from '../../../Core/SessionHelper';
import Axios from 'axios';
import RoyalSerryPickedOrder from '../../../Entity/RoyalSerryPickedOrder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Holiday from '../../../Entity/Holiday';

const data = [
  {
    OrderNo: '123',
    Location: 'kolkata',
    Type: 'Pickup',
  },
  {
    OrderNo: '123',
    Location: 'kolkata',
    Type: 'Pickup',
  },
  {
    OrderNo: '123',
    Location: 'kolkata',
    Type: 'Pickup',
  },





];
export class holidayViewModel extends BaseViewModel {
  user_id:string='';
  branch_id:string='';
  holidayList:Holiday[]=[];
}

export default class holidayPage extends BaseComponent<
  any,
  holidayViewModel
> {
  constructor(props) {
    super(props);
    this.state = new BaseState(new holidayViewModel());
    // this.state.Model.IsPageLoading = true;
  }

  componentDidMount() {
    this.LoadOrderList();
  }

  LoadOrderList = async () => {
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
  
    model.branch_id=value.branch_id;
    console.log(model)
    const formData = new FormData();
  
    formData.append("branch_id", model.branch_id)
   

    var config= {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    this.ShowPageLoader(true);
    Axios.post(
      //'http://staging-rss.staqo.com/api/holidayList', 
      'https://irpl.biz/royal-serry-dev/api/holidayList',
    formData,
    config)
    .then((res)=>{
      this.ShowPageLoader(false);
      model.holidayList=res.data?.holidayList as Holiday[];
      console.log(JSON.stringify(res.data,null,4))
      
      // this.ShowToastMesage('Login Successfully', 'warning', 5000);
     
      this.UpdateViewModel();
    }).catch((err=>{
      this.ShowPageLoader(false);
      this.ShowToastMesage(err.data?.message, 'warning', 5000);
    })
       
    );
   
    }

  render() {
    var model = this.state.Model;
    return (
     
      <View style={{height: '100%', backgroundColor: BaseColor.ColorWhite}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={BaseColor.ColorWhite}
          translucent={true}
        />
 <CustomModalIndicator IsLoading={model.IsPageLoading} />
        <View
          style={{
            borderTopWidth: 5,
            borderTopColor: BaseColor.ColorRed,
          }}></View>
        <View style={{height: 100, width: 100}}>
          <CustomImage
            source={require('../../../assets/banner-home.jpg')}
            style={{height: '130%', width: '400%'}}
          />
        </View>
        <Modal isVisible={true} coverScreen={false} backdropOpacity={0} onBackButtonPress={() => { this.props.navigation.goBack() }}>
          <View
            style={{
              height: '80%',
              marginTop: '50%',
              backgroundColor: BaseColor.ColorGrey,
            }}>
                <View style={{flexDirection:'row',}}>
         
         <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                marginLeft:'35%',
                alignSelf: 'center',
                fontWeight: '600',
                color: BaseColor.ColorGreyDeep,
              }}>
              Holiday List
            </Text>
            {/* <Button
              // onPress={this.login}
              style={{
         
                width: '30%',
           height:'80%',
                backgroundColor: BaseColor.ColorRed,
                marginTop: '5%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft:'4%'
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              {/* <Text style={{color: BaseColor.ColorWhite, fontSize:11}}>
              Map
              </Text>
            </Button> */} 
            </View>
            <View style={{flexDirection:'row',alignSelf:'center'}}>
            <Button
              // onPress={this.login}
              style={{
         
                width: '32%',
           
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '7%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{color: BaseColor.ColorWhite, fontSize:11}}>
              Name
              </Text>
            </Button>
            <Button
              // onPress={this.login}
              style={{
         
                width: '32%',
           
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '7%',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft:1,
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{color: BaseColor.ColorWhite, fontSize:11}}>
              From
              </Text>
            </Button>
            <Button
              // onPress={this.login}
              style={{
         
                width: '32%',
           
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '7%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft:1,
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{color: BaseColor.ColorWhite, fontSize:11}}>
               To
              </Text>
            </Button>
            </View>
            <FlatList
            data={model.holidayList}
            // style={ViewStyle.ThreegridView}
            extraData={model.IsPageLoading}
            // horizontal={true}
            // staticDimension={900}
            // fixed
          
            // spacing={16}
            //  refreshControl={
            //    <RefreshControl
            //        refreshing={model.IsPageLoading}
            //        onRefresh={this.LoadBrandList}
            //    />}
            renderItem={({item}) => (
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                   
                <Button
                  // onPress={() =>
                  //   this.props.navigation.navigate('OrderDetailsPage')
                  // }
                style={{
           
                  width: '32%',
                 backgroundColor: BaseColor.ColorGrey,
                //   marginTop: '10%',
                //   alignContent: 'center',
                //   alignItems: 'center',
                //   justifyContent: 'center',
                  borderWidth:0.2,
                  borderColor:BaseColor.ColorWhite
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{ fontSize:11,color:BaseColor.ColorGreyDeep}}>
              {item.name}
                </Text>
              </Button>
              <Button
                  //  onPress={() =>
                  //   this.props.navigation.navigate('OrderDetailsPage')
                  // }
                style={{
           
                  width: '32%',
             
                  backgroundColor: BaseColor.ColorGrey,
                //   marginTop: '10%',
                  // alignContent: 'center',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  borderWidth:0.2,
                  borderColor:BaseColor.ColorWhite
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{ fontSize:11,color:BaseColor.ColorGreyDeep}}>
            {item.from_date}
                </Text>
              </Button>
              <Button
                  // onPress={() =>
                  //   this.props.navigation.navigate('OrderDetailsPage')
                  // }
                style={{
           
                  width: '32%',
             
                  backgroundColor: BaseColor.ColorGrey,
                //   marginTop: '10%',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth:0.2,
                  borderColor:BaseColor.ColorWhite
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{fontSize:11,color:BaseColor.ColorGreyDeep}}>
              {item.to_date}
                </Text>
              </Button>
           
              </View>
                )}
              
              />
    
          </View>
        </Modal>
      </View>
    );
  }
}
