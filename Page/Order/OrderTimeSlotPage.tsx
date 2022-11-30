import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet, ImageBackground} from 'react-native';
import {
  Button,
  Text,
  Footer,
  FooterTab,
  Segment,
  Container,
  Item,
  Label,
  Input,
  Radio,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Toast,
  Content,
} from 'native-base';


import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import CartOrderItemViewModel from './CartOrderItemViewModel';

import {connect} from 'react-redux';
// import EnumResponseModel, {
//   EnumResponseModelCore,
// } from '../../../Core/EnumResponseModel';
// import OrderDataAccess from '../../../DataAccess/OrderDataAccess';

// import OrderTimeSlotResponseEntity, {
//   OrderTimeSlotRequestEntity,
// } from '../../../Entity/Custom/OrderTimeSlotEntity';
import {format, parseISO} from 'date-fns';
import {
  CustomIndicator,
  CustomInput,
  CustomModalIndicator,
} from '../../Control/Index';
// import {CartRequestEntity} from '../Cart/CartRequestEntity';




import PayuMoney, {HashGenerator} from 'react-native-payumoney';
// import PaymentHelperService from '../../../Service/PaymentHelperService';
// import PayUMoneyDataAccess from '../../../DataAccess/PayUMoneyDataAccess';
// import {
//   PayUMoneyTransaction,
//   PayUMoneyTransactionCheckSumEntity,
// } from '../../../Entity/PayUMoneyTransaction';
// import {RooPayUMoneyTransactionRequestEntity} from '../../../Entity/Custom/PayUMoneyTransactionRequestEntity';

import {AppStyles} from '../../Style/Style';
import BaseViewModel from '../../Core/BaseViewModel';
import { CustomerAddress } from '../../Entity/Customer';
import { EnumResponseModelCore } from '../../Core/EnumResponseModel';
import BaseComponent from '../../Core/BaseComponent';
import BaseState from '../../Core/BaseState';
import KSUtility from '../../Core/KSUtility';
import { AppEnvironmentService } from '../../Service/AppEnvironmentService';
import SessionHelper from '../../Core/SessionHelper';
import { CLEAR_All_FROM_CART, OrderItemActionTypes } from '../../Redux/actions/OrderItemAction';
import BaseColor from '../../Core/BaseTheme';
import EntityHelperService from '../../Service/EntityHelperService';
import { RootReduxState } from '../../Redux/store/Store';
import OrderDataAccess, { CartRequestEntity, OrderTimeSlotRequestEntity, OrderTimeSlotResponseEntity } from '../../DataAccess/OrderDataAccess';
import Order, { CustomerDeliveryTimeSlot, CustomerPaymentMode } from '../../Entity/Order';
import { Coupon } from '../../Entity/Coupon';
import ImageStyle from '../../Style/ImageStyle';

// import CouponDataAccess, {
//   IsValidCouponRequestEntity,
// } from '../../../DataAccess/CouponDataAccess';
// import {Coupon, CouponDiscountType} from '../../../Entity/Coupon';
// var IsPeeppeep = AppEnvironmentService.IsPeepPeep();
class PaymentTypeDisplay {
  Display: string;
  Value: CustomerPaymentMode;
}

class OrderTimeSlotPageViewModel extends BaseViewModel {
  CustomerAddress: CustomerAddress;
  CustomerDeliveryTimeSlot?: CustomerDeliveryTimeSlot = null;
  CustomerDeliveryTimeSlotList: EnumResponseModelCore<
    CustomerDeliveryTimeSlot
  >[] = [];
  ExpectedDeliveryDate: Date;
  OrderItemList: CartOrderItemViewModel[] = [];
  CustomerPaymentMode?: CustomerPaymentMode = null;
  PaymentTypeDisplayList: PaymentTypeDisplay[] = [];
  PlaceOrderButtonText: string = 'Place Order';
  ActualTotalPayableAmount: number;
  TotalPayableAmount: number;
  TotalProductAmount:number;
  DeliveryChargeAmount:number;
  CouponCode: string;
  Coupon: Coupon;
}

export class OrderTimeSlotPage extends BaseComponent<
  any,
  OrderTimeSlotPageViewModel
> {
  constructor(props: any) {
    super(props);
    var model = new OrderTimeSlotPageViewModel();
    model.OrderItemList = this.props.route?.params?.OrderItemList;
    model.CustomerAddress = this.props.route?.params?.CustomerAddress;
    model.TotalPayableAmount = this.props.route?.params?.TotalPayableAmount;
    model.TotalProductAmount=this.props.route?.params?.TotalProductAmount;
    model.DeliveryChargeAmount=this.props.route?.params?.DeliveryChargeAmount;
    model.ActualTotalPayableAmount = model.TotalPayableAmount;
    console.log( model.TotalPayableAmount);
    model.IsPageLoading = true;
    this.state = new BaseState(model);
  }
  async componentDidMount() {
    this.LoadDeliverySlot();
    this.LoadPaymentTypeDisplayList();
  }
  LoadPaymentTypeDisplayList = () => {
    var model = this.state.Model;
    var CashOnDelivery = new PaymentTypeDisplay();
    CashOnDelivery.Display = 'Cash on delivery';
    CashOnDelivery.Value = CustomerPaymentMode.CashOnDelivery;

    model.PaymentTypeDisplayList.push(CashOnDelivery);

    var payUMoney = new PaymentTypeDisplay();
    payUMoney.Display = 'PayUMoney';
    payUMoney.Value = CustomerPaymentMode.PayUMoney;

    model.PaymentTypeDisplayList.push(payUMoney);
    //this.HandlePaymentModeChanged(CashOnDelivery.Value);
  };

  LoadDeliverySlot = async () => {
    var model = this.state.Model;
    var result = await OrderDataAccess.GetAllDeliveryTimeSlot<
      EnumResponseModelCore<CustomerDeliveryTimeSlot>[]
    >();
    this.ShowPageLoader(false);
    this.ProcessResponseData(result, false);
    if (result.IsSuccess) {
      model.CustomerDeliveryTimeSlotList = result.Data;

      // this.HandleDeliverySlotChange(
      //   model.CustomerDeliveryTimeSlotList.find((i) => i).Value,
      // );
      this.UpdateViewModel();
    }
  };

  // HandleCouponCode = async () => {
  //   var model = this.state.Model;
  //   var requestModel = new IsValidCouponRequestEntity();
  //   requestModel.CouponCode = model.CouponCode;
  //   requestModel.TotalOrderAmount = model.TotalProductAmount;

  //   this.ShowPageLoader(true);
  //   var res = await CouponDataAccess.IsValidCoupon(requestModel);
  //   this.ShowPageLoader(false);
  //   this.ProcessResponseData(res);

  //   if (!res.IsSuccess) {
  //     return;
  //   }

  //   model.Coupon = res.Data;

  //   model.TotalPayableAmount =
  //     model.ActualTotalPayableAmount - model.Coupon.CouponDiscountAmount;
  //   this.UpdateViewModel();
  // };

  HandleDeliverySlotChange = async (data: CustomerDeliveryTimeSlot) => {
    var model = this.state.Model;
    model.CustomerDeliveryTimeSlot = data;
    this.ShowPageLoader(true);
    var requstModel = new OrderTimeSlotRequestEntity();
    requstModel.DeliverySlot = model.CustomerDeliveryTimeSlot;
console.log(requstModel);
    var result = await OrderDataAccess.GetExpectedDeliveryDateBySlot<
      OrderTimeSlotResponseEntity
    >(requstModel);
    console.log(result)
    this.ShowPageLoader(false);
    model.ExpectedDeliveryDate = result.Data.ExpectedDeliveryDate;
    model.IsPageLoading = false;
    this.UpdateViewModel();
  };

  // HandlePayUMoneyTransaction = async (
  //   Customer: Customer,
  //   amount: number,
  //   PayUMoneyTransactionId: string,
  // ): Promise<{
  //   IsSucess: boolean;
  //   Data: any;
  // }> => {
  //   return new Promise((resolve, reject) => {

  //     var tempEmail= KSUtility.GetValueIfNotNull(Customer.Email,PaymentHelperService.AdminEmail)
      
  //     const Hash = HashGenerator({
  //       key: PaymentHelperService.PayUMoneyKey,
  //       amount: amount.toString(),
  //       email: tempEmail,
  //       txnId: PayUMoneyTransactionId,
  //       productName: PaymentHelperService.OrderProductName,
  //       firstName: Customer.FirstName,
  //       salt: PaymentHelperService.PayUMoneySalt,
  //     });

  //     const payData = {
  //       amount: amount.toString(),
  //       txnId: PayUMoneyTransactionId,
  //       productName: PaymentHelperService.OrderProductName,
  //       firstName: Customer.FirstName,
  //       email: tempEmail,
  //       phone: Customer.MobileNo,
  //       merchantId: PaymentHelperService.PayUMoneyMerchatId,
  //       key: PaymentHelperService.PayUMoneyKey,
  //       successUrl: AppEnvironmentService.IsDeug()
  //         ? PaymentHelperService.PayUMoneysuccessUrlStage
  //         : PaymentHelperService.PayUMoneysuccessUrlProd,
  //       failedUrl: AppEnvironmentService.IsDeug()
  //         ? PaymentHelperService.PayUMoneyfailedUrlStage
  //         : PaymentHelperService.PayUMoneyfailedUrlProd,
  //       isDebug: AppEnvironmentService.IsDeug(),
  //       hash: Hash,
  //     };

  //     PayuMoney(payData)
  //       .then((data) => {
  //         resolve({IsSucess: true, Data: data});
  //       })
  //       .catch((e) => {
  //         console.log('PayuMoneyError1:' + JSON.stringify(e));
  //         resolve({IsSucess: false, Data: e});
  //       });
  //   });
  // };

  HandlePlaceOrder = async () => {
    var model = this.state.Model;

    if (!model.CustomerDeliveryTimeSlot) {
      this.ShowToastMesage('Select delivery slot', 'danger', 2000);
      return;
    }

    if (!model.CustomerPaymentMode) {
      this.ShowToastMesage('Select payment mode', 'danger', 2000);
      return;
    }

    var customer = await SessionHelper.GetSession();

    var OrderItemList = model.OrderItemList;

    var tempCustomer = await SessionHelper.GetSession();
    var newOrder = new CartRequestEntity();

    newOrder.ApiToken = tempCustomer.ApiToken;

    newOrder.CustomerAddressId = model.CustomerAddress.CustomerAddressId;
    newOrder.CustomerId = tempCustomer.CustomerId;
    newOrder.PaymentMode = model.CustomerPaymentMode;
    newOrder.DeliveryTimeSlot = model.CustomerDeliveryTimeSlot;
    // newOrder.CouponId = model.Coupon?.CouponId;

    //alert(model.DeliveryTimeSlot)

    newOrder.OrderItems = OrderItemList.map((i) => {
      return {
        ProductItemId: i.ProductItem.ProductItemId,
        Quantity: i.Count,
      };
    });

    this.ShowPageLoader(true)
    var res = await OrderDataAccess.Create<Order>(newOrder);
    this.ShowPageLoader(false)
    this.ProcessResponseData(res);

    if (!res.IsSuccess) {
      return;
    }

    // if (model.CustomerPaymentMode === CustomerPaymentMode.PayUMoney) {
    //   var payuRequest = new RooPayUMoneyTransactionRequestEntity();
    //   payuRequest.ApiToken = customer.ApiToken;
    //   payuRequest.EntityId = res.Data.OrderId;

    //   var PayUMoneyRequest = await PayUMoneyDataAccess.GetCheckSumForOrder<
    //     PayUMoneyTransactionCheckSumEntity
    //   >(payuRequest);

    //   console.log(JSON.stringify(PayUMoneyRequest));

    //   var result = await this.HandlePayUMoneyTransaction(
    //     customer,
    //     res.Data.NetAmount,
    //     res.Data.InvoiceNo,
    //   );

    //   payuRequest.IsPaymnetCancelled = result.IsSucess;
    //   if (result.IsSucess) {
    //     payuRequest.JsonResponse = JSON.stringify(result.Data.response);
    //   }

    //   payuRequest.PayUMoneyTransactionId =
    //     PayUMoneyRequest.Data.PayUMoneyTransactionId;

    //   var payUMoneyVerify = await PayUMoneyDataAccess.VerifyCheckSumForOrder<
    //     any
    //   >(payuRequest);
    //   console.log(JSON.stringify(payUMoneyVerify));
    //   if (!result.IsSucess) {
    //     this.ShowToastMesage('Payment did not completed', 'danger', 3000);
    //     return;
    //   }
    // }

    var clearData: OrderItemActionTypes = {
      type: CLEAR_All_FROM_CART,
      Data: null,
    };
    this.props.dispatch(clearData);
    this.props.navigation.navigate({name: 'AppShowCase'});
  };
  HandlePaymentModeChanged = (PaymentMode: CustomerPaymentMode) => {
    var model = this.state.Model;
    model.CustomerPaymentMode = PaymentMode;
    switch (PaymentMode) {
      case CustomerPaymentMode.CashOnDelivery:
        model.PlaceOrderButtonText = 'Place order';
        break;
      default:
        model.PlaceOrderButtonText = 'Pay and place order';
        break;
    }
    this.UpdateViewModel();
  };

  render() {
    var model = this.state.Model;
    var IsCouponApplied = !KSUtility.IsNullOrEmpty(model.Coupon?.CouponId);
 

    // var CouponCodeDetails = 'Discount applied ';
    // if (model.Coupon) {
    //   switch (model.Coupon.DiscountType) {
    //     case CouponDiscountType.Amount:
    //       CouponCodeDetails +=
    //         KSUtility.RupeeSymbol + model.Coupon.DiscountValue;
    //       break;
    //     case CouponDiscountType.Percentage:
    //       CouponCodeDetails += model.Coupon.DiscountValue + '%';
    //       break;
    //   }
    // }

    return (
      <Container>
           <ImageBackground
          source={require('../../assets/pages-10.jpg')}
          style={ImageStyle.BackgroundImage}>
        <CustomModalIndicator
          IsLoading={model.IsPageLoading}></CustomModalIndicator>
        <Content>
       < ImageBackground
       style={AppStyles.HeaderCardStyle}
          source={require('../../assets/pages-10.jpg')}>
               <Text style={AppStyles.HeaderCardTxt}>Delivery slot</Text>
          </ImageBackground>
          {/* <ListItem style={AppStyles.HeaderCardStyle} itemDivider>
         
          </ListItem> */}

          {model.CustomerDeliveryTimeSlotList.map((i) => {
            return (
              <ListItem
                key={i.Value}
                onPress={(e) => {
                  this.HandleDeliverySlotChange(i.Value);
                }}>
                <Body>
                  <Text>{i.Name}</Text>
                  <Text note style={{color: BaseColor.ColorGreen}}>
                    {i.Value}
                  </Text>
                </Body>
                <Right>
                  <Radio
                    color={BaseColor.ColorGreen}
                    selectedColor={BaseColor.ColorGreen}
                    selected={model.CustomerDeliveryTimeSlot === i.Value}
                    onPress={(e) => {
                      this.HandleDeliverySlotChange(i.Value);
                    }}
                  />
                </Right>
              </ListItem>
            );
          })}
           {model.ExpectedDeliveryDate  && (
          <ListItem>
            <Text>{'Expected delivery date will be '}</Text>
            <Text style={AppStyles.HeaderCardTxt}>
              {EntityHelperService.ToDdMmmYyyy(model.ExpectedDeliveryDate)}
            </Text>
          </ListItem>
           )}
          < ImageBackground
       style={AppStyles.HeaderCardStyle}
          source={require('../../assets/pages-10.jpg')}>
          {/* <ListItem style={AppStyles.HeaderCardStyle} itemDivider> */}
            <Text style={AppStyles.HeaderCardTxt}>Coupon Code</Text>
          {/* </ListItem> */}
          </ImageBackground>
          <ListItem icon style={{margin:5}}>
            <Left>
              <MaterialIcon
                name="card-giftcard"
                style={AppStyles.ListItemInlineIcon}></MaterialIcon>
            </Left>
            <Body>
              <Input
                style={{ 
                  borderColor: BaseColor.ColorGreen,
                  marginEnd: 10, 
                  borderWidth: 1,
                  color: BaseColor.ColorGreen,
                  fontWeight:'bold'
                
                }}
                selectionColor={BaseColor.ColorGreen}
                // underlineColorAndroid={BaseColor.ColorGreen}
                value={model.CouponCode}
                disabled={IsCouponApplied}
                onChangeText={(text) => {
                  this.SetModelValue('CouponCode', text);
                }}
              />
            </Body>

            <Right>
              <Button
                disabled={IsCouponApplied}
                style={{
                  
                  backgroundColor: IsCouponApplied
                    ? BaseColor.ColorGrey
                    : BaseColor.ColorGreen,
                  justifyContent: 'center',
                }}
                // onPress={this.HandleCouponCode}
                >
                <Text
                  style={{color: BaseColor.ColorWhite, alignContent: 'center'}}>
                  Apply
                </Text>
              </Button>
            </Right>
          </ListItem>
          {/* {IsCouponApplied && (
            <ListItem noBorder noIndent> 
              <Text note>{CouponCodeDetails}</Text>  
            </ListItem>
          )} */}
  < ImageBackground
       style={AppStyles.HeaderCardStyle}
          source={require('../../assets/pages-10.jpg')}>
          {/* <ListItem style={AppStyles.HeaderCardStyle} itemDivider> */}
            <Text style={AppStyles.HeaderCardTxt}>Payment</Text>
          {/* </ListItem> */}
          </ImageBackground>
          {model.PaymentTypeDisplayList.map((i) => {
            return (
              <ListItem
                key={i.Value}
                onPress={(e) => {
                  this.HandlePaymentModeChanged(i.Value);
                }}>
                <Body>
                  <Text>{i.Display}</Text>
                </Body>
                <Right>
                  <Radio
                    selected={model.CustomerPaymentMode === i.Value}
                    color={BaseColor.ColorGreen}
                    selectedColor={BaseColor.ColorGreen}
                    onPress={(e) => {
                      this.HandlePaymentModeChanged(i.Value);
                    }}
                    style={{marginEnd: 30, marginTop: 10}}
                  />
                </Right>
              </ListItem>
            );
          })}
        </Content>
        {IsCouponApplied && (
          <View>
            <Footer>
              <FooterTab style={{backgroundColor: BaseColor.BackgroundColor}}>
                <Text style={styles.safeTextHeader}>Payment Details</Text>
              </FooterTab>
            </Footer>
            <Footer style={styles.FooterStyle}>
              <FooterTab style={styles.TotalAmountFooter}>
                <Text style={styles.safeText}>Product Amount</Text>
              </FooterTab>

              <FooterTab style={styles.NetAmountFooter}>
                <Text style={styles.ValueTxt}>
                  {KSUtility.RupeeSymbol}{model.TotalProductAmount}
                </Text>
              </FooterTab>
            </Footer>
            <Footer style={styles.FooterStyle}>
              <FooterTab style={styles.TotalAmountFooter}>
                <Text style={styles.safeText}>Coupon Discount</Text>
              </FooterTab>
              <FooterTab style={styles.NetAmountFooter}>
                <Text style={styles.ValueTxt}>
                  {'-'}{KSUtility.RupeeSymbol}{KSUtility.GetValueIfNotNull(model.Coupon?.CouponDiscountAmount,0)}
                </Text>
              </FooterTab>
            </Footer>
            <Footer style={styles.FooterStyle}>
              <FooterTab style={styles.TotalAmountFooter}>
                <Text style={styles.safeText}>Delivery Charge Amount</Text>
              </FooterTab>
              <FooterTab style={styles.NetAmountFooter}>
                <Text style={styles.ValueTxt}>
                  {'+'}{KSUtility.RupeeSymbol}{KSUtility.GetValueIfNotNull(model.DeliveryChargeAmount,0)}
                </Text>
              </FooterTab>
            </Footer> 
          </View>
        )}
        <Footer>
          <FooterTab style={{backgroundColor: BaseColor.ColorGreen}}>
            <Button block onPress={() => this.HandlePlaceOrder()}>
              <Text
                style={{
                  color: BaseColor.ColorWhite,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {model.PlaceOrderButtonText} ({'\u20B9'}
                {model.TotalPayableAmount} )
              </Text>
            </Button>
          </FooterTab>
        </Footer>
        </ImageBackground>
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

export default connect(mapStateToProps, null)(OrderTimeSlotPage);

const styles = StyleSheet.create({
  safeText: {
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
    marginLeft: 20,
    fontWeight: '900',
    color: BaseColor.BackgroundColor,
  },
  safeTextHeader: {
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 20,
    fontWeight: 'bold',
    color: BaseColor.ColorGreen,
  },
  ValueTxt: {
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
    marginEnd: 20,
    fontWeight: '900',
    color: BaseColor.BackgroundColor,
  },
  FooterStyle: {backgroundColor: BaseColor.ColorGreen, height: 30},

  TotalAmountFooter: {
    backgroundColor: BaseColor.ColorWhite,
    borderBottomColor: BaseColor.BackgroundColor,
    borderBottomWidth: 1,
  },
  NetAmountFooter: {
    backgroundColor: BaseColor.ColorWhite,
    justifyContent: 'flex-end',
    borderBottomColor: BaseColor.BackgroundColor,
    borderBottomWidth: 1,
  },
  TotalAmountStyle: {
    backgroundColor: BaseColor.ColorWhite,
    justifyContent: 'flex-end',
  },
});
