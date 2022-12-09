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
import {DutyAllowcation, dutyAreaList} from '../../../Entity/DutyAllowcation';

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
export class DutyAllowcationViewModel extends BaseViewModel {
  user_id: string = '';
  branch_id: string = '';
  DutyAllowcationList: DutyAllowcation[] = [];
  dutyAreaList: dutyAreaList[] = [];
}

export default class DutyAllowcationPage extends BaseComponent<
  any,
  DutyAllowcationViewModel
> {
  constructor(props) {
    super(props);
    this.state = new BaseState(new DutyAllowcationViewModel());
    // this.state.Model.IsPageLoading = true;
  }

  componentDidMount() {
    this.LoadDutyAllowcationList();
  }

  LoadDutyAllowcationList = async () => {
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();

    model.user_id = value.user_id;
    console.log(model);
    const formData = new FormData();

    formData.append('user_id', model.user_id);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      //'http://staging-rss.staqo.com/api/duty_allocation',
      'https://irpl.biz/royal-serry-dev/api/duty_allocation',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.DutyAllowcationList = res.data?.dutyList as DutyAllowcation[];
        model.dutyAreaList = res.data?.dutyAreaList as dutyAreaList[];
        console.log(JSON.stringify(model.dutyAreaList, null, 4));

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };

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
            <Content>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    marginLeft: '30%',
                    alignSelf: 'center',
                    fontWeight: '600',
                    color: BaseColor.ColorGreyDeep,
                  }}>
                  Duty Allocation List
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
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
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
                  <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                    Shift Name
                  </Text>
                </Button>
                <Button
                  // onPress={this.login}
                  style={{
                    width: '24%',

                    backgroundColor: BaseColor.ColorGreen,
                    marginTop: '7%',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 1,
                  }}>
                  {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                  <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                    From
                  </Text>
                </Button>
                <Button
                  // onPress={this.login}
                  style={{
                    width: '24%',

                    backgroundColor: BaseColor.ColorGreen,
                    marginTop: '7%',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 1,
                  }}>
                  {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                  <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                    To
                  </Text>
                </Button>
                <Button
                  // onPress={this.login}
                  style={{
                    width: '25%',

                    backgroundColor: BaseColor.ColorGreen,
                    marginTop: '7%',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 1,
                  }}>
                  {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                  <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                    Day
                  </Text>
                </Button>
              </View>
              <View>
                <FlatList
                  data={model.DutyAllowcationList}
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
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
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
                          borderWidth: 0.2,
                          borderColor: BaseColor.ColorWhite,
                        }}>
                        {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                        <Text
                          style={{fontSize: 9, color: BaseColor.ColorGreyDeep}}>
                          {item.shift_name}(
                          {item.time_from.substring(0, 5) +
                            '-' +
                            item.time_to.substring(0, 5)}
                          )
                        </Text>
                      </Button>
                      <Button
                        //  onPress={() =>
                        //   this.props.navigation.navigate('OrderDetailsPage')
                        // }
                        style={{
                          width: '24%',

                          backgroundColor: BaseColor.ColorGrey,
                          //   marginTop: '10%',
                          // alignContent: 'center',
                          // alignItems: 'center',
                          // justifyContent: 'center',
                          borderWidth: 0.2,
                          borderColor: BaseColor.ColorWhite,
                        }}>
                        {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                        <Text
                          style={{fontSize: 8, color: BaseColor.ColorGreyDeep}}>
                          {item.from_date}
                        </Text>
                      </Button>
                      <Button
                        // onPress={() =>
                        //   this.props.navigation.navigate('OrderDetailsPage')
                        // }
                        style={{
                          width: '24%',

                          backgroundColor: BaseColor.ColorGrey,
                          //   marginTop: '10%',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 0.2,
                          borderColor: BaseColor.ColorWhite,
                        }}>
                        {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                        <Text
                          style={{fontSize: 8, color: BaseColor.ColorGreyDeep}}>
                          {item.to_date}
                        </Text>
                      </Button>
                      <Button
                        // onPress={() =>
                        //   this.props.navigation.navigate('OrderDetailsPage')
                        // }
                        style={{
                          width: '25%',

                          backgroundColor: BaseColor.ColorGrey,
                          //   marginTop: '10%',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 0.2,
                          borderColor: BaseColor.ColorWhite,
                        }}>
                        {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                        <Text
                          style={{fontSize: 8, color: BaseColor.ColorGreyDeep}}>
                          {item.day}
                        </Text>
                      </Button>
                    </View>
                  )}
                />
              </View>
              <View style={{borderWidth: 0.5, marginTop: '10%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: '5%',
                    // alignSelf: 'center',
                    fontWeight: '600',
                    color: BaseColor.ColorGreyDeep,
                  }}>
                  Area Covered
                </Text>
              </View>
              <View style={{marginBottom: '5%'}}>
                <FlatList
                  data={model.dutyAreaList}
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
                    <ListItem>
                      <Text
                        style={{fontSize: 12, color: BaseColor.ColorGreyDeep}}>
                        {item.place_name} , {item.state_name} ,{' '}
                        {item.county_name} , {item.postal_code}
                      </Text>
                    </ListItem>
                  )}
                />
              </View>
            </Content>
          </View>
        </Modal>
      </View>
    );
  }
}
