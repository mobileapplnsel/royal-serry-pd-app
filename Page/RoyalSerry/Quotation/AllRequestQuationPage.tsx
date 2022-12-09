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
import RoyalSerryPickedOrder from '../../../Entity/RoyalSerryPickedOrder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {OrderType} from '../../../Entity/RoyalSerryOrderDetails.';
import Quotion from '../../../Entity/Quotion';
import Icon5 from 'react-native-vector-icons/FontAwesome';

export class AllOrderViewModel extends BaseViewModel {
  user_id: string = '';
  branch_id: string = '';
  quoteList: Quotion[] = [];
  OrderTypeList: OrderType[] = [];
  OrderTypes: OrderType;
  coordinates?: map[];

  AllQuation: Quotion[] = [];
}
export class map {
  name: string = '';
  latitude?: number;
  longitude?: number;
}
export default class AllRequestQuationPage extends BaseComponent<
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
    // model.branch_id = value.branch_id;
    console.log(model);
    const formData = new FormData();
    formData.append('pdboy_user_id', model.user_id);
    // formData.append('branch_id', model.branch_id);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      //'http://staging-rss.staqo.com/api/pdboyRequsetquoteList',
      'https://irpl.biz/royal-serry-dev/api/pdboyRequsetquoteList',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.quoteList = res.data?.quoteList as Quotion[];
        console.log(JSON.stringify(res.data, null, 4));
        // this.ShowToastMesage(res.data?.message, 'warning', 5000);
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        // this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  // loadPickupOrderlist = async () => {
  //   var model = this.state.Model;
  //   var value = await SessionHelper.GetSession();
  //   model.user_id = value.user_id;
  //   model.branch_id = value.branch_id;
  //   console.log(model);
  //   const formData = new FormData();
  //   formData.append('user_id', model.user_id);
  //   formData.append('branch_id', model.branch_id);

  //   var config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   this.ShowPageLoader(true);
  //   Axios.post(
  //     'http://staging-rss.staqo.com/api/pickupOrderList',
  //     formData,
  //     config,
  //   )
  //     .then((res) => {
  //       this.ShowPageLoader(false);
  //       model.PickedOrder = res.data?.pickupList as RoyalSerryPickedOrder[];
  //       console.log(JSON.stringify(model.PickedOrder, null, 4));

  //       // this.ShowToastMesage('Login Successfully', 'warning', 5000);

  //       this.UpdateViewModel();
  //     })
  //     .catch((err) => {
  //       this.ShowPageLoader(false);
  //       // this.ShowToastMesage(err.data?.message, 'warning', 5000);
  //     });
  // };
  // loadDeliverOrderlist = async () => {
  //   var model = this.state.Model;
  //   var value = await SessionHelper.GetSession();
  //   model.user_id = value.user_id;
  //   model.branch_id = value.branch_id;
  //   console.log(model);
  //   const formData = new FormData();
  //   formData.append('user_id', model.user_id);
  //   formData.append('branch_id', model.branch_id);

  //   var config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   this.ShowPageLoader(true);
  //   Axios.post(
  //     'http://staging-rss.staqo.com/api/deliveryOrderList',
  //     formData,
  //     config,
  //   )
  //     .then((res) => {
  //       this.ShowPageLoader(false);
  //       model.PickedOrder = res.data?.deliveryList as RoyalSerryPickedOrder[];
  //       console.log(JSON.stringify(model.PickedOrder, null, 4));

  //       // this.ShowToastMesage('Login Successfully', 'warning', 5000);

  //       this.UpdateViewModel();
  //     })
  //     .catch((err) => {
  //       this.ShowPageLoader(false);
  //       // this.ShowToastMesage(err.data?.message, 'warning', 5000);
  //     });
  // };
  // ChangeOrderList = async (event: any) => {
  //   this.SetModelValue(event.name, event.value);
  //   var model = this.state.Model;
  //   var value = await SessionHelper.GetSession();
  //   console.log(model.OrderTypes);
  //   switch (model.OrderTypes) {
  //     case OrderType.Pickup:
  //       return this.loadPickupOrderlist();
  //     case OrderType.Delivery:
  //       return this.loadDeliverOrderlist();
  //     case OrderType.All:
  //       return this.LoadOrderList();
  //     default:
  //       return <></>;
  //   }
  // };
  // Map = () => {
  //   var model = this.state.Model;
  //   model.coordinates = model.PickedOrder.map((i) => { return {name:i.id,latitude:i.latlong?.lat,longitude:i.latlong?.long} });
  //   // console.log(model.coordinates)
  //   // alert('hello')
  //   this.props.navigation.navigate('MapViewPage', {
  //     coordinates: model.coordinates,

  //   });
  // };
  complete = async (item: Quotion) => {
    var model = this.state.Model;
    const formData = new FormData();
    formData.append('quotation_id', item.quotation_id);
    // formData.append('branch_id', model.branch_id);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      //'http://staging-rss.staqo.com/api/requestQuoteCompleted',
      'https://irpl.biz/royal-serry-dev/api/requestQuoteCompleted',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);

        console.log(JSON.stringify(res.data, null, 4));
        this.ShowToastMesage(res.data?.message, 'warning', 5000);
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
        this.LoadOrderList();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };

  Map = async () => {
    var model = this.state.Model;
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();

    // console.log(model);
    const formData = new FormData();
    formData.append('pdboy_user_id', value.user_id);


    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      //'http://staging-rss.staqo.com/api/pdboyRequsetquoteList',
      'https://irpl.biz/royal-serry-dev/api/pdboyRequsetquoteList',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        // console.log('Location', JSON.stringify(res, null, 4));
       
        model.AllQuation = res.data?.quoteList ;
        model.coordinates = model.AllQuation.map((i) => {

          return {
           
            name: i.from_firstname.concat(' ',i.from_lastname,',',i.from_address),
            latitude: parseInt(i.latitude),
            longitude:parseInt( i.longitude),
          };
        // }
        });

        console.log('Location', JSON.stringify(model.coordinates, null, 4));
        this.props.navigation.navigate('QuationMapViewPage', {
          coordinates: model.coordinates,
        });
        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        
      });
  };

  render() {
    var model = this.state.Model;
    // var OrderTypeList = model.OrderTypeList.map((i, k) => {
    //   return <Picker.Item label={i} key={k} value={i} />;
    // });
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
           
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 20,
                    marginLeft: '30%',
                    alignSelf: 'center',
                    fontWeight: '600',
                    color: BaseColor.ColorGreyDeep,
                  }}>
                  All Quote
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

            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Button
                style={{
                  width: '32%',

                  backgroundColor: BaseColor.ColorGreen,
                  marginTop: '4%',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                  No#
                </Text>
              </Button>
              <Button
                // onPress={this.login}
                style={{
                  width: '32%',
                  marginLeft: 1,
                  backgroundColor: BaseColor.ColorGreen,
                  marginTop: '4%',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                  Date
                </Text>
              </Button>
              <Button
                // onPress={this.login}
                style={{
                  width: '32%',
                  marginLeft: 1,
                  backgroundColor: BaseColor.ColorGreen,
                  marginTop: '4%',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                  Action
                </Text>
              </Button>
            </View>
            <FlatList
              data={model.quoteList}
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
                    //   this.props.navigation.navigate('OrderDetailsPage', {

                    //     Type:item.order_type
                    //   })
                    // }
                    style={{
                      width: '32%',
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
                      style={{fontSize: 11, color: BaseColor.ColorGreyDeep}}>
                      {item.quote_no}
                    </Text>
                  </Button>
                  <Button
                    // onPress={() =>
                    //   this.props.navigation.navigate('OrderDetailsPage', {
                    //     // OrderIdId: item.shipment_id,
                    //     Type:item.order_type
                    //   })
                    // }
                    style={{
                      width: '32%',

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
                      style={{fontSize: 11, color: BaseColor.ColorGreyDeep}}>
                      {item.created_date}
                    </Text>
                  </Button>

                  <Button
                    style={{
                      width: '32%',

                      backgroundColor: BaseColor.ColorGrey,
                      //   marginTop: '10%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 0.2,
                      borderColor: BaseColor.ColorWhite,
                    }}>
                    <Icon5
                      name="plus"
                      onPress={() =>
                        this.props.navigation.navigate('AddRequestQuationPage', {
                          quotation_id: item.quotation_id,
                          // Type:item.order_type
                        })
                      }
                      style={{
                        // marginLeft:'5%',
                        fontSize: 22,
                        color: BaseColor.ColorGreen,
                        // alignSelf: 'flex-start',
                      }}
                    />
                    {item.order_type=="0"&&(
                    <Icon5
                      name="check"
                      onPress={() => {
                        this.complete(item);
                      }}
                      style={{
                        marginLeft: '15%',
                        fontSize: 22,
                        color: BaseColor.ColorGreen,
                        // alignSelf: 'flex-start',
                      }}
                    />
                    )}
                    {/* <Text
                      style={{fontSize: 14, color: BaseColor.ColorGreen,fontWeight:'bold'}}>
                      Add Item
                    </Text> */}
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
