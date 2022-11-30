import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  
  Button,
  ListItem,
  Text,
  Body,
  Footer,
  FooterTab,
  CheckBox,
  Radio,
  Container,
  Content,
} from 'native-base';

import Icon7 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';


import CartOrderItemViewModel from '../Order/CartOrderItemViewModel';


// import OrderDataAccess from '../../../DataAccess/OrderDataAccess';


import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
// import {OrderPincodeRequestEntity} from '../../../Entity/Custom/OrderTimeSlotEntity';
import BaseViewModel from '../../Core/BaseViewModel';
import Customer, { CustomerAddress } from '../../Entity/Customer';
import BaseComponent from '../../Core/BaseComponent';
import BaseState from '../../Core/BaseState';
import SessionHelper from '../../Core/SessionHelper';
import BaseColor from '../../Core/BaseTheme';
import OrderDataAccess, { OrderPincodeRequestEntity } from '../../DataAccess/OrderDataAccess';
import ImageStyle from '../../Style/ImageStyle';

export class CartCustomerAddressPageViewModel extends BaseViewModel {
  Customer: Customer;
  CustomerAddress: CustomerAddress[] = [];
  OrderItemList: CartOrderItemViewModel[] = [];
  TotalPayableAmount:number;
  TotalProductAmount:number;
  DeliveryChargeAmount:number;
  IsFromOrderPage: boolean = false;
  CustomerAddressId: string = '';
}

class CartCustomerAddressPage extends BaseComponent<
  any,
  CartCustomerAddressPageViewModel
> {
  constructor(props: any) {
    super(props);

    var model = new CartCustomerAddressPageViewModel();
    model.OrderItemList = this.props.route?.params?.OrderItemList;
    model.TotalPayableAmount=this.props.route?.params?.TotalPayableAmount;
    model.TotalProductAmount=this.props.route?.params?.TotalProductAmount;
    model.DeliveryChargeAmount=this.props.route?.params?.DeliveryChargeAmount;
    model.IsFromOrderPage = model.OrderItemList !== undefined;
    this.state = new BaseState(model);
  }
  componentDidMount() {
    this.LoadProfile();
  }
  LoadProfile = async () => {
    var model = this.state.Model;
    var customer = await SessionHelper.GetSession();
    model.Customer = customer;
    model.CustomerAddress = customer.CustomerAddresses;
    this.UpdateViewModel();
  };

  HandleAddressSelection = (address: CustomerAddress) => {
    this.state.Model.CustomerAddressId = address.CustomerAddressId;
    //alert(this.state.Model.CustomerAddressId)
    this.UpdateViewModel();
  };
  HandleGoNext = async () => {
    var model = this.state.Model;

    if (!model.CustomerAddressId) {
      this.ShowToastMesage('Choose delivery address to proceed', 'danger',5000);
      return;
    }

    var selectedCustomerAddress = model.CustomerAddress.find(
      (i) => i.CustomerAddressId === model.CustomerAddressId,
    );
    
    //checking pincode validation
    var rModel = new OrderPincodeRequestEntity();
    rModel.Pincode = selectedCustomerAddress.Pincode;
    var result = await OrderDataAccess.IsValidPincodeForDelivery<boolean>(
      rModel,
    );
    if (!result.IsSuccess || !result.Data) {
      this.ShowToastMesage(result.Message, 'danger', 3000);
      return;
    }

    this.props.navigation.navigate({
      name: 'OrderTimeSlotPage',
      params: {
        OrderItemList: model.OrderItemList,
        CustomerAddress: selectedCustomerAddress,
        TotalPayableAmount:model.TotalPayableAmount,
        TotalProductAmount:model.TotalProductAmount,
        DeliveryChargeAmount:model.DeliveryChargeAmount
      },
    });
  };

  render() {
    var model = this.state.Model;
    return (
      // <View style={{backgroundColor: BaseColor.ColorWhite, height: '100%'}}>
      <Container>
    
    <ImageBackground
          source={require('../../assets/pages-08.jpg')}
          style={ImageStyle.BackgroundImage}>
          <Content>
              <SafeAreaView style={styles.AddAddressSafeArea}>
                <ListItem>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('CustomerAddAddressPage');
                    }}>
                    <View style={styles.RowView}>
                      <Icon7 name="pluscircleo" style={styles.IconList} />
                      <Text style={styles.ListText}>Add New Address</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              </SafeAreaView>
             
            
              <SafeAreaView style={styles.SafeAreaStyle}>
                {model.CustomerAddress.map((i) => {
                  return (
                    <ListItem key={i.CustomerAddressId} onPress={() => this.HandleAddressSelection(i)}>
                      <Body>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.Hometxt}>{i.AddressType}</Text>
                          <View style={styles.ActionView}>
                            <TouchableOpacity
                              onPress={() => {
                                this.props.navigation.navigate({
                                  name: 'CustomerAddAddressPage',
                                  params: {
                                    CustomerAddressId: i.CustomerAddressId,
                                    refreshParent: this.LoadProfile,
                                  },
                                });
                              }}>
                              <Icon
                                name="pencil-outline"
                                style={styles.IconList}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text style={styles.nameTxt}>
                              {model.Customer?.FirstName}
                              {model.Customer?.LastName}
                            </Text>
                            <Text style={styles.AddressTxt}>{i.HouseNo}</Text>
                            <Text style={styles.AddressTxt}>
                              {i.ApartmentName}
                            </Text>
                            <Text style={styles.AddressTxt}>
                              {i.AreaDetails}
                            </Text>
                            <Text style={styles.AddressTxt}>{i.Landmark}</Text>
                            <Text style={styles.AddressTxt}>
                              {i.StreetDetails}
                            </Text>
                            <Text style={styles.AddressTxt}>
                              {i.City?.Name}
                            </Text>
                            <Text style={styles.AddressTxt}>{i.Pincode}</Text>
                          </View>
                          {model.IsFromOrderPage && (
                            <View style={{marginEnd: 10, marginTop: 20}}>
                              <Radio
                                selected={
                                  model.CustomerAddressId ===
                                  i.CustomerAddressId
                                }
                                onPress={(e) => {
                                  this.HandleAddressSelection(i);
                                }}
                                color={BaseColor.ColorGreen}
                                selectedColor={BaseColor.ColorGreen}
                              />
                            </View>
                          )}
                        </View>
                      </Body>
                    </ListItem>
                  );
                })}
              </SafeAreaView>
            
              </Content>
         

        {model.IsFromOrderPage && (
          <Footer>
            <FooterTab style={{backgroundColor: BaseColor.ColorGreen}}>
              <Button style={styles.ButtonStyle} onPress={this.HandleGoNext}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.BtnTxt}>Continue</Text>
                </View>
              </Button>
            </FooterTab>
          </Footer>
        )}
       
     </ImageBackground>
      </Container>
    );
  }
}

export default connect(null, null)(CartCustomerAddressPage);

const styles = StyleSheet.create({
  SafeAreaStyle: {
    backgroundColor: BaseColor.ColorWhite,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    opacity: 0.8,
  },
  Icon: {
    fontSize: 60,
    alignSelf: 'center',

    color: BaseColor.ColorGreen,
  },
  CardStyle: {borderColor: BaseColor.ColorGreen, margin: 5},
  CustomerName: {
    alignSelf: 'center',
    marginTop: 5,
    color: BaseColor.ColorGreen,
    fontWeight: 'bold',
    fontSize: 17,
  },
  TextStyle: {
    alignSelf: 'center',
    color: BaseColor.ColorGreen,
    fontWeight: '900',
  },
  IconList: {
    fontSize: 20,

    color: BaseColor.ColorGreen,
  },
  RowView: {flexDirection: 'row', alignSelf: 'center'},
  ListText: {marginLeft: 20, color: BaseColor.ColorGreen},
  ActionView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  DivideTxt: {color: BaseColor.ColorGreen, fontWeight: 'bold'},
  Hometxt: {
    fontSize: 13,
    marginLeft: 10,
    fontWeight: 'bold',
    color: BaseColor.ColorGreen,
  },
  nameTxt: {fontSize: 13, marginLeft: 10, marginTop: 10},
  AddressTxt: {fontSize: 13, marginLeft: 10, marginTop: 2},
  AddAddressSafeArea: {
    backgroundColor: BaseColor.ColorWhite,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
    height: 50,
  },
  ButtonStyle: {borderEndWidth: 1, borderColor: BaseColor.ColorWhite},
  BtnTxt: {
    color: BaseColor.ColorWhite,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
  },
});
