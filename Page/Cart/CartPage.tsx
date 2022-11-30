import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ImageBackground,
} from 'react-native';

import {
  Container,
  Button,
  ListItem,
  Text,
  Left,
  Body,
  Badge,
  Footer,
  FooterTab,
} from 'native-base';

import {connect} from 'react-redux';
// import {RootReduxState} from '../../../Redux/store/Store';
import CartOrderItemViewModel from '../Order/CartOrderItemViewModel';
// import SessionHelper from '../../../Core/SessionHelper';
import * as Animatable from 'react-native-animatable';
import {CustomImage} from '../../Control/Index';
import Swipeout from 'react-native-swipeout';

import PushNotification from 'react-native-push-notification';

import {FromPageToLogin} from '../Login/CustomerLoginViewModel';

// import ProductItemDataAccess from '../../../DataAccess/ProductItemDataAccess';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import BaseViewModel from '../../Core/BaseViewModel';
import BaseComponent from '../../Core/BaseComponent';
import {notificationManager} from '../../NotificationManager/NotificationManager';
import BaseColor from '../../Core/BaseTheme';
import EntityHelperService from '../../Service/EntityHelperService';
import ProductCounterPage from '../Control/ProductCounterPage';
import {AppEnvironmentService} from '../../Service/AppEnvironmentService';
import {EmptyCollectionPage} from '../Control/EmptyCollectionPage';
import {
  OrderItemActionTypes,
  REMOVE_FROM_CART,
} from '../../Redux/actions/OrderItemAction';
import SessionHelper from '../../Core/SessionHelper';
import BaseState from '../../Core/BaseState';
import {RootReduxState} from '../../Redux/store/Store';
import {
  CustomerDeliveryTimeSlot,
  CustomerPaymentMode,
} from '../../Entity/Order';
import ImageStyle from '../../Style/ImageStyle';
import {AppStyles} from '../../Style/Style';
import TextStyle from '../../Style/TextStyle';
import ViewStyle from '../../Style/ViewStyle';
import ProductItemDataAccess from '../../DataAccess/ProductItemDataAccess';
// import EmptyCollectionPage from '../Control/EmptyCollectionPage';

class CartViewModel extends BaseViewModel {
  TotalPayableAmount: number = 0;
  DeliveryChargeAmount: number = 0;
  TotalOrderAmount: number = 0;
  DeliveryTimeSlot: CustomerDeliveryTimeSlot;
  PaymentMode: CustomerPaymentMode;
  OrderItemList: CartOrderItemViewModel[];
  IsRemoveClose: boolean = false;
  IsContainItems: boolean = false;
}

export class DeliveryChargesRequestEntity {
  TotalOrderAmount?: number;
}

export class CartPage extends BaseComponent<any, CartViewModel> {
  constructor(props: any) {
    super(props);
    const {OrderItemList} = props;
    var model = new CartViewModel();

    model.OrderItemList = OrderItemList;

    this.state = new BaseState(model);

    PushNotification.configure({
      onRegister: function () {
        //console.log("TOKEN:", token);
      },
      onNotification: function () {
        //console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }

  testNotification = () => {
    PushNotification.localNotification({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  };
  testNorti = () => {
    var notification = notificationManager;
    var senderID = '717896799169';
    notification.configure(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
      senderID,
    );
    notification.showNotification(
      1,
      AppEnvironmentService.GetCurrentApp(),
      'Order taken thank you.',
      {}, //data
      {}, //options
    );
  };

  onRegister(token) {
    console.log('[NotificationManager] Registered', token);
  }

  onNotification(notify) {
    console.log('[NotificationManager] onNotification', notify);
  }

  onOpenNotification(notify) {
    console.log('[NotificationManager] onOpenNotification', notify);
    alert('Open Notification');
  }

  removeFromCart = (order: CartOrderItemViewModel) => {
    var finalData: OrderItemActionTypes = {
      type: REMOVE_FROM_CART,
      Data: order.OrderItemId,
    };
    this.props.dispatch(finalData);
    this.state.Model.IsRemoveClose = true;
    this.UpdateViewModel();
  };

  HandleCheckOut = async () => {
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();

    if (!value) {
      this.ShowToastMesage(
        'You are not logged in, redirecting you to login',
        'warning',
        5000,
      );

      this.props.navigation.navigate({
        name: 'CustomerLoginPage',
        params: {FromPage: FromPageToLogin.Order},
      });
      return;
    }

    var OrderItemList = this.props.OrderItemList as CartOrderItemViewModel[];

    if (!OrderItemList?.length) {
      this.ShowToastMesage(
        'Please add some items before proceed',
        'danger',
        5000,
      );
      return;
    }

    this.props.navigation.navigate({
      name: 'CartCustomerAddressPage',
      params: {
        OrderItemList: this.props.OrderItemList,
        TotalPayableAmount: model.TotalPayableAmount,
        TotalProductAmount: model.TotalOrderAmount,
        DeliveryChargeAmount: model.DeliveryChargeAmount,
      },
    });
  };

  componentDidMount() {
    this.HandleTotalOrderAmount(this.props);
  }
  componentDidUpdate(prevProps: any, prevState: BaseState<CartViewModel>) {
    this.HandleTotalOrderAmount(this.props);
  }

  HandleCalculateDeliveryChargesAmount = async () => {
    var model = this.state.Model;
    var requestEntity = new DeliveryChargesRequestEntity();
    requestEntity.TotalOrderAmount = model.TotalOrderAmount;
    var res = await ProductItemDataAccess.GetDeliveryChargeAmount<number>(
      requestEntity,
    );
    if (!res.IsSuccess) {
      return;
    }
    model.DeliveryChargeAmount = res.Data;
    model.TotalPayableAmount =
      model.TotalOrderAmount + model.DeliveryChargeAmount;
    this.UpdateViewModel();
  };
  HandleTotalOrderAmount = (props: any) => {
    var model = this.state.Model;
    model.OrderItemList = props.OrderItemList as CartOrderItemViewModel[];
    var NetAmount = 0;

    model.OrderItemList.forEach((i) => {
      NetAmount += i.TotalAmount;
    });

    if (NetAmount === model.TotalOrderAmount) {
      return;
    }

    model.TotalOrderAmount = NetAmount;
    model.IsContainItems = NetAmount !== 0;
    this.HandleCalculateDeliveryChargesAmount();
    this.UpdateViewModel();
  };
  EmptyColletionView = () => {
    var model = this.state.Model;
    return (
      <EmptyCollectionPage
        EmptyText="No item in cart!!"
        IconName="shopping-basket"
        Child={
          <View
            style={{
              marginTop: 10,
              backgroundColor: BaseColor.ColorGreen,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <FontAwesome5Icon.Button
              onPress={() => {
                this.props.navigation.navigate({
                  name: 'AppShowCase',
                });
              }}
              name={'shopping-bag'}
              style={{
                alignSelf: 'center',
                backgroundColor: BaseColor.ColorGreen,
              }}>
              Let's do some shopping!!
            </FontAwesome5Icon.Button>
          </View>
        }
      />
    );
  };
  render() {
    var model = this.state.Model;

    return (
      <Container>
        {/* <ImageBackground
                    source={require('../../assets/pages-08.jpg')}
                    style={ImageStyle.BackgroundImage}> */}
        <FlatList
          data={model.OrderItemList}
          extraData={model.IsPageLoading}
          keyExtractor={(item) => item.OrderItemId}
          scrollEnabled={true}
          ListEmptyComponent={this.EmptyColletionView}
          renderItem={({item}) => {
            var i = item;
            var IsDiscountAvailable = EntityHelperService.IsOfferPercentageAvaialble(
              i.ProductItem,
            );
            return (
              <View
                key={i.ProductItem.ProductItemId}
                // style={{backgroundColor: BaseColor.ColorWhite}}
              >
                <Swipeout
                  close={model.IsRemoveClose}
                  right={[
                    {
                      text: 'Remove',
                      backgroundColor: BaseColor.ColorGreen,
                      onPress: () => {
                        this.removeFromCart(i);
                      },
                    },
                  ]}>
                  <ImageBackground
                    source={require('../../assets/pages-08.jpg')}
                    style={ImageStyle.BackgroundImage}>
                    {/* <View style={{backgroundColor: BaseColor.ColorWhite}}> */}
                    <ListItem key={i.OrderItemId}>
                      <Left>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate(
                              'ProductItemDetailsPage',
                              {
                                ProductItemId: i.ProductItem.ProductItemId,
                              },
                            )
                          }>
                          {IsDiscountAvailable && (
                            <Badge style={AppStyles.BadgeStyle}>
                              <Text style={{color: 'white', fontSize: 10}}>
                                {i.ProductItem.OfferPercentage} % Off
                              </Text>
                            </Badge>
                          )}
                          <CustomImage
                            source={{
                              uri: i.ProductItem.Documents[0].DocumentUrl,
                            }}
                            style={ImageStyle.CartImageStyle}
                          />
                        </TouchableOpacity>
                      </Left>

                      <Body>
                        <Text style={TextStyle.CartProductNameStyle}>
                          {i.ProductItem.Name}
                        </Text>
                        <View style={{flexDirection: 'row', marginLeft: 5}}>
                          {IsDiscountAvailable && (
                            <Text style={TextStyle.CartProductPriceStyle}>
                              {'\u20B9'}
                              {i.ProductItem.Price}
                            </Text>
                          )}

                          <Text style={TextStyle.CartProductOfferPrice}>
                            {'\u20B9'}
                            {i.ProductItem.OfferPrice}
                          </Text>
                        </View>
                        <Text style={TextStyle.CartProductOfferPrice}>
                          Total {'\u20B9'}
                          {i.ProductItem.OfferPrice * i.Count}
                        </Text>
                        <ProductCounterPage ProductItem={i.ProductItem} />
                      </Body>
                    </ListItem>
                    {/* </View> */}
                  </ImageBackground>
                </Swipeout>
              </View>
            );
          }}
        />

        {model.IsContainItems && (
          <View>
            <Footer>
              <FooterTab style={{backgroundColor: BaseColor.BackgroundColor}}>
                <Text style={ViewStyle.CartsafeTextHeader}>
                  Payment Details
                </Text>
              </FooterTab>
            </Footer>
            <Footer style={ViewStyle.CartFooterStyle}>
              <FooterTab style={ViewStyle.CartTotalAmountFooter}>
                <Text style={TextStyle.CartsafeText}>Total Amount</Text>
              </FooterTab>

              <FooterTab style={ViewStyle.CartNetAmountFooter}>
                <Text style={TextStyle.CartValueTxt}>
                  ₹{model.TotalOrderAmount}
                </Text>
              </FooterTab>
            </Footer>
            <Footer style={ViewStyle.CartFooterStyle}>
              <FooterTab style={{backgroundColor: BaseColor.ColorWhite}}>
                <SafeAreaView style={{marginBottom: 5}}>
                  <Text style={TextStyle.CartsafeText}>Delivery Charges</Text>
                </SafeAreaView>
              </FooterTab>
              <FooterTab style={TextStyle.CartTotalAmountStyle}>
                <SafeAreaView style={{marginBottom: 5}}>
                  <Text style={TextStyle.CartValueTxt}>
                    ₹{model.DeliveryChargeAmount}
                  </Text>
                </SafeAreaView>
              </FooterTab>
            </Footer>

            <Footer style={ViewStyle.CartTopFooter}>
              <Text style={TextStyle.CartPayableamount}>
                Amount Payable : ₹{model.TotalPayableAmount}
              </Text>

              <Button
                style={TextStyle.BtnTxt}
                onPress={() => this.HandleCheckOut()}>
                <Text
                  style={{
                    color: BaseColor.ColorGreen,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  CHECKOUT
                </Text>
              </Button>
            </Footer>
          </View>
        )}
        {/* </ImageBackground> */}
      </Container>
    );
  }
}

//mapping state
const mapStateToProps = (state: RootReduxState) => {
  return {
    OrderItemList: state.OrderItemList.OrderItemList,
  };
};

export default connect(mapStateToProps, null)(CartPage);
