import React from 'react';
import {
  View,
  StatusBar,
  Switch,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  BackHandler,
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

import { color } from 'react-native-reanimated';
import BaseViewModel from '../../../Core/BaseViewModel';
import BaseComponent, { ConfirmBoxResult } from '../../../Core/BaseComponent';
import BaseState from '../../../Core/BaseState';
import CustomModalIndicator from '../../../Control/CustomModalIndicator';
import BaseColor from '../../../Core/BaseTheme';
import ViewStyle from '../../../Style/ViewStyle';
import CustomImage from '../../../Control/CustomImage';
import TextStyle from '../../../Style/TextStyle';
import { FlatGrid } from 'react-native-super-grid';
import { EmptyCollectionPage } from '../../../Control/Index';
import Modal from 'react-native-modal';

const data = [
  {
    icons: require('../../../assets/addproduct.png'),
    name: 'Pending Order',
    page: 'PendingOrderPage',
  },
  {
    icons: require('../../../assets/box.png'),
    name: 'All Order',
    page: 'AllAcceptedOrderPage',
  },
  {
    icons: require('../../../assets/warehouse.png'),
    name: 'Order History',
    page: 'AllOrderHistoryPage',
  },
];
export class DeliveryBoySiginViewModel extends BaseViewModel {
  //   PendingOrderList: OrderDeliveryBoyMapping[] = [];
  //   DeliveryBoyName: string;
}

export default class DasboardPage extends BaseComponent<
  any,
  DeliveryBoySiginViewModel
> {
  constructor(props) {
    super(props);
    this.state = new BaseState(new DeliveryBoySiginViewModel());
    // this.state.Model.IsPageLoading = true;
    console.log("Here i am")
  }

  AllOrder = () => {

    this.props.navigation.navigate('AllOrderPage');

  };
  AllOrderHistory = () => {

    this.props.navigation.navigate('AllOrderHistoryPage');

  };
  AllHoliday = () => {

    this.props.navigation.navigate('holidayPage');

  };
  DutyAllocation = () => {

    this.props.navigation.navigate('DutyAllowcationPage');

  };
  createQuatation = () => {

    this.props.navigation.navigate('QuotationCreatePage');

  };
  AllQuatation = () => {

    this.props.navigation.navigate('AllRequestQuationPage');

  };

  HandleCloseApp = async () => {
    var result = await this.ShowConfirmBox("Do you want to exit?")
    if (result === ConfirmBoxResult.Cancel) {
      return
    }

    BackHandler.exitApp();
  }

  render() {
    var model = this.state.Model;
    return (
      <View style={{ height: '100%', backgroundColor: BaseColor.ColorWhite }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={BaseColor.ColorWhite}
          translucent={true}
        />

        <View
          style={{
            borderTopWidth: 5,
            borderTopColor: BaseColor.ColorRed,
          }}></View>
        <View style={{ height: 100, width: 100 }}>
          <CustomImage
            source={require('../../../assets/banner-home.jpg')}
            style={{ height: '130%', width: '400%' }}
          />
        </View>
        <Modal isVisible={true} coverScreen={false} backdropOpacity={0} onBackButtonPress={this.HandleCloseApp}>
          <View
            style={{
              height: '80%',
              marginTop: '50%',
              backgroundColor: BaseColor.ColorGrey,
            }}>
              <Content>
            <Button
              onPress={this.AllOrder}
              style={{
                borderRadius: 10,
                width: '70%',
                alignSelf: 'center',
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '25%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{ color: BaseColor.ColorWhite, fontWeight: '900' }}>
                My Order List
              </Text>
            </Button>
            <Button
              onPress={this.DutyAllocation}
              style={{
                borderRadius: 10,
                width: '70%',
                alignSelf: 'center',
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '10%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{ color: BaseColor.ColorWhite, fontWeight: '900' }}>
                Duty Allocation List
              </Text>
            </Button>
            <Button
              onPress={this.AllHoliday}
              style={{
                borderRadius: 10,
                width: '70%',
                alignSelf: 'center',
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '10%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{ color: BaseColor.ColorWhite, fontWeight: '900' }}>
                Branch Holiday
              </Text>
            </Button>
            <Button
              onPress={this.AllOrderHistory}
              style={{
                borderRadius: 10,
                width: '70%',
                alignSelf: 'center',
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '10%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{ color: BaseColor.ColorWhite, fontWeight: '900' }}>
                PD History
              </Text>
            </Button>
            <Button
              onPress={this.createQuatation}
              style={{
                borderRadius: 10,
                width: '70%',
                alignSelf: 'center',
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '10%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{ color: BaseColor.ColorWhite, fontWeight: '900' }}>
               Create Quote
              </Text>
            </Button>
            <Button
              onPress={this.AllQuatation}
              style={{
                borderRadius: 10,
                width: '70%',
                alignSelf: 'center',
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '10%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom:'10%'
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{ color: BaseColor.ColorWhite, fontWeight: '900' }}>
               All Quote
              </Text>
            </Button>
            </Content>
          </View>
        </Modal>
      </View>
    );
  }
}
