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
  Picker,
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
import {CustomPicker, EmptyCollectionPage} from '../../../Control/Index';
import Modal from 'react-native-modal';
import SessionHelper from '../../../Core/SessionHelper';
import Axios from 'axios';
import RoyalSerryPickedOrder, {
  MapOrder,
} from '../../../Entity/RoyalSerryPickedOrder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {OrderType} from '../../../Entity/RoyalSerryOrderDetails.';

export class AllOrderViewModel extends BaseViewModel {
  user_id: string = '';
  branch_id: string = '';
  PickedOrder: RoyalSerryPickedOrder[] = [];
  OrderTypeList: OrderType[] = [];
  OrderTypes: OrderType;
  coordinates?: map[];
  Sendcoordinates?: map[];
  AllOrder: any[] = [];
}
export class map {
  name: string = '';
  latitude?: number;
  longitude?: number;
}
export default class AllOrderPage extends BaseComponent<
  any,
  AllOrderViewModel
> {
  constructor(props) {
    super(props);
    var model = new AllOrderViewModel();

    model.OrderTypeList = Object.values(OrderType).map((i) => i);
    // this.state.Model.IsPageLoading = true;
    this.state = new BaseState(model);
  }

  componentDidMount() {
    this.LoadOrderList();
  }

  LoadOrderList = async () => {
    // alert('hello')
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
    model.user_id = value.user_id;
    model.branch_id = value.branch_id;
    console.log(model);
    const formData = new FormData();
    formData.append('user_id', model.user_id);
    formData.append('branch_id', model.branch_id);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/pdboyallorderlist',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log("map",res.data?.allOrderList)
        model.PickedOrder = res.data?.allOrderList as RoyalSerryPickedOrder[];
        console.log(JSON.stringify(model.PickedOrder, null, 4));
        // this.ShowToastMesage(res.data?.message, 'warning', 5000);
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        // this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  loadPickupOrderlist = async () => {
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
    model.user_id = value.user_id;
    model.branch_id = value.branch_id;
    console.log(model);
    const formData = new FormData();
    formData.append('user_id', model.user_id);
    formData.append('branch_id', model.branch_id);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/pickupOrderList',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.PickedOrder = res.data?.pickupList as RoyalSerryPickedOrder[];
        console.log(JSON.stringify(model.PickedOrder, null, 4));

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        // this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  loadDeliverOrderlist = async () => {
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
    model.user_id = value.user_id;
    model.branch_id = value.branch_id;
    console.log(model);
    const formData = new FormData();
    formData.append('user_id', model.user_id);
    formData.append('branch_id', model.branch_id);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/deliveryOrderList',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.PickedOrder = res.data?.deliveryList as RoyalSerryPickedOrder[];
        console.log(JSON.stringify(model.PickedOrder, null, 4));

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        // this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  ChangeOrderList = async (event: any) => {
    this.SetModelValue(event.name, event.value);
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
    console.log(model.OrderTypes);
    switch (model.OrderTypes) {
      case OrderType.Pickup:
        return this.loadPickupOrderlist();
      case OrderType.Delivery:
        return this.loadDeliverOrderlist();
      case OrderType.All:
        return this.LoadOrderList();
      default:
        return <></>;
    }
  };
  Map = async () => {
    var model = this.state.Model;
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();

    // console.log(model);
    const formData = new FormData();
    formData.append('user_id', value.user_id);
    formData.append('branch_id', value.branch_id);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/pdboyallorderlist',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        // model.PickedOrder = res.data?.allOrderList as RoyalSerryPickedOrder[];
       
        model.AllOrder = res.data?.allOrderList ;
        model.coordinates = model.AllOrder.map((i) => {
          // if(i.latitude && i.longitude){
          return {
            name: i.shipment_no,
            latitude: parseInt(i.latitude),
            longitude:parseInt( i.longitude),
          };
        // }
        });
//         model.coordinates.forEach((i)=>{
//           // if(i){
// model.Sendcoordinates.push(i)
// return;
//           // }
//         })
        // this.UpdateViewModel();
        console.log('Location', JSON.stringify(model.coordinates, null, 4));
        this.props.navigation.navigate('MapViewPage', {
          coordinates: model.coordinates,
        });
        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        // this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };

  render() {
    var model = this.state.Model;
    var OrderTypeList = model.OrderTypeList.map((i, k) => {
      return <Picker.Item label={i} key={k} value={i} />;
    });
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
        <Modal
          isVisible={true}
          coverScreen={false}
          backdropOpacity={0}
          onBackButtonPress={() => {
            this.props.navigation.goBack();
          }}>
          <View
            style={{
              height: '80%',
              marginTop: '50%',
              backgroundColor: BaseColor.ColorGrey,
            }}>
            <View style={{flexDirection: 'row'}}>
              {/* <Ionicons
      name="arrow-back"
      size={35}
      style={{marginLeft:'2%',marginTop:'2%'}}
      color={BaseColor.ColorRed}
      onPress={() => {
        this.props.navigation.navigate('DasboardPage');
      }}
    /> */}
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    marginLeft: '30%',
                    alignSelf: 'center',
                    fontWeight: '600',
                    color: BaseColor.ColorGreyDeep,
                  }}>
                  My Order List
                </Text>
              </TouchableOpacity>
              <Button
                onPress={this.Map}
                // onPress={this.login}
                style={{
                  width: '30%',
                  height: '80%',
                  backgroundColor: BaseColor.ColorRed,
                  marginTop: '5%',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '5%',
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                  Map
                </Text>
              </Button>
            </View>
            <CustomPicker
              Name="OrderTypes"
              LabelText=""
              selectedValue={model.OrderTypes}
              onValueChange={this.ChangeOrderList}
              Data={OrderTypeList}
            />
            <View>
             
            </View>
            <View>
              {/* {model.PickedOrder && ( */}
                <View>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
            <Button
              // onPress={this.login}
              style={{
         
                width: '25%',
           
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '7%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{color: BaseColor.ColorWhite, fontSize:10}}>
              Order#
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
                marginLeft:1,
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{color: BaseColor.ColorWhite, fontSize:10}}>
              Location
              </Text>
            </Button>
            <Button
              // onPress={this.login}
              style={{
         
                width: '25%',
                marginLeft:1,
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '7%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{color: BaseColor.ColorWhite, fontSize:10}}>
            Type
              </Text>
            </Button>
            <Button
              // onPress={this.login}
              style={{
         
                width: '25%',
                marginLeft:1,
                backgroundColor: BaseColor.ColorGreen,
                marginTop: '7%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
              <Text style={{color: BaseColor.ColorWhite, fontSize:10}}>
              Date & Time
              </Text>
            </Button>
            </View>
                  <FlatList
                    data={model.PickedOrder}
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
                          onPress={() =>
                            this.props.navigation.navigate('OrderDetailsPage', {
                              OrderIdId: item.shipment_id,
                              Type: item.order_type,
                            })
                          }
                          style={{
                         
                  width: '25%',
                  backgroundColor: BaseColor.ColorGrey,
                 //   marginTop: '10%',
                   alignContent: 'center',
                   alignItems: 'center',
                   justifyContent: 'center',
                   borderWidth:0.2,
                   borderColor:BaseColor.ColorWhite
                          }}>
                          {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                          <Text
                            style={{
                              fontSize:9,color:BaseColor.ColorGreyDeep
                            }}>
                            {item.shipment_no}
                          </Text>
                        </Button>
                        <Button
                          onPress={() =>
                            this.props.navigation.navigate('OrderDetailsPage', {
                              OrderIdId: item.shipment_id,
                              Type: item.order_type,
                            })
                          }
                          style={{
                            width: '25%',
             
                  backgroundColor: BaseColor.ColorGrey,
                //   marginTop: '10%',
                  // alignContent: 'center',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  borderWidth:0.2,
                  borderColor:BaseColor.ColorWhite
                          }}>
                          {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                          <Text
                            style={{
                              fontSize:9,color:BaseColor.ColorGreyDeep, height: '80%',
                            }}>
                            {item.from_address}
                          </Text>
                        </Button>

                        <Button
                          onPress={() =>
                            this.props.navigation.navigate('OrderDetailsPage', {
                              OrderIdId: item.shipment_id,
                              Type: item.order_type,
                            })
                          }
                          style={{
                            width: '25%',
             
                            backgroundColor: BaseColor.ColorGrey,
                          //   marginTop: '10%',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth:0.2,
                            borderColor:BaseColor.ColorWhite
                          }}>
                          {item.order_type == '1' && (
                            <Text
                              style={{
                                fontSize: 9, color: BaseColor.ColorGreyDeep
                              }}>
                              Pickup
                            </Text>
                          )}
                          {item.order_type == '2' && (
                            <Text
                              style={{
                                fontSize: 9, color: BaseColor.ColorGreyDeep
                              }}>
                              Delivery
                            </Text>
                          )}
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
                  borderWidth:0.2,
                  borderColor:BaseColor.ColorWhite
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{ fontSize:9,color:BaseColor.ColorGreyDeep}}>
              {item.created_date}
                </Text>
              </Button>
                      </View>
                    )}
                  />
                   {!model.PickedOrder && (
                <View style={{justifyContent:'center'}}>
                  <Text style={{alignSelf:'center',marginTop:'10%'}}>No Order found</Text>
                </View>
              )}
                </View>
              {/* )} */}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
