import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Text, Input, Button, Item, Label, ListItem, Radio} from 'native-base';
import BaseColor from '../../../Core/BaseTheme';
import * as Animatable from 'react-native-animatable';
import AppIconImage from '../../../assets/AppIconImage';
import Icon8 from 'react-native-vector-icons/MaterialCommunityIcons';

import BaseState from '../../../Core/BaseState';
import BaseComponent, {ConfirmBoxResult} from '../../../Core/BaseComponent';
import SessionHelper from '../../../Core/SessionHelper';

import BaseResponse from '../../../Core/BaseResponse';
import CustomImage from '../../../Control/CustomImage';
import Modal from 'react-native-modal';
import RoyalSerryUserDataAccess, {
  LoginRequsetEntity,
} from '../../../DataAccess/RoyalSerryUserDataAccess';
import Axios from 'axios';
import RoyalSerryUser from '../../../Entity/RoyalSerryUser';
import PasswordInputText from 'react-native-hide-show-password-input';
import {TextInput} from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import PhoneInput from 'react-native-phone-number-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export class LoginViewModel {
  LoginId: string = '';
  EmailId: string = '';
  Password: string = '';
  User: RoyalSerryUser;
  CustomerPaymentMode?: CustomerPaymentMode = null;
  PaymentTypeDisplayList: PaymentTypeDisplay[] = [];
  Selected: string = '';
  formattedValue: any;
}
export enum CustomerPaymentMode {
  CashOnDelivery = 'CashOnDelivery',
  Card = 'Card',
  Paytm = 'Paytm',
  Wallet = 'Wallet',
  PayUMoney = 'PayUMoney',
}
const inputRef = React.createRef();
class PaymentTypeDisplay {
  Display: string;
  Value: CustomerPaymentMode;
}
export default class LoginPage extends BaseComponent<any, LoginViewModel> {
  keyboardDidHideListener: any;
  constructor(props: any) {
    super(props);

    this.state = new BaseState(new LoginViewModel());
  }

  componentDidMount() {
    this.CheckIfUserAlreadyLogin();
    this.LoadPaymentTypeDisplayList();
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }
  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    Keyboard.dismiss();
  };

  LoadPaymentTypeDisplayList = () => {
    var model = this.state.Model;
    var CashOnDelivery = new PaymentTypeDisplay();
    CashOnDelivery.Display = 'Email ID';
    CashOnDelivery.Value = CustomerPaymentMode.CashOnDelivery;

    model.PaymentTypeDisplayList.push(CashOnDelivery);

    var payUMoney = new PaymentTypeDisplay();
    payUMoney.Display = 'Mobile No';
    payUMoney.Value = CustomerPaymentMode.PayUMoney;

    model.PaymentTypeDisplayList.push(payUMoney);
    this.HandlePaymentModeChanged(CashOnDelivery.Value);
  };
  HandlePaymentModeChanged = (PaymentMode: CustomerPaymentMode) => {
    var model = this.state.Model;
    model.CustomerPaymentMode = PaymentMode;
    switch (PaymentMode) {
      case CustomerPaymentMode.CashOnDelivery:
        model.Selected = '1';
        break;
      default:
        model.Selected = '2';
        break;
    }
    this.UpdateViewModel();
  };
  CheckIfUserAlreadyLogin = async () => {
    var value = await SessionHelper.GetSession();

    if (value) {
      // this.ShowToastMesage('You are already logged in', 'warning', 5000);
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Drawer', screen: 'DasboardPage'}],
      });
      //this.props.navigation.navigate("Drawer", { screen: 'DasboardPage' })
    }
  };

  login = async () => {
    var model = this.state.Model;
    var requestEntity = new LoginRequsetEntity();
    if(model.EmailId){
      var a=model.EmailId.split(/\s/).join('');
      model.EmailId=a;
      this.UpdateViewModel();
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(model.EmailId) === false && model.Selected == '1') {
      this.ShowToastMesage('Please enter valid email', 'warning', 5000);
      return;
    }
    if (!model.EmailId && model.Selected == '1') {
      this.ShowToastMesage('Please enter valid email', 'warning', 5000);
      return;
    }

    if (!model.LoginId && model.Selected == '2') {
      this.ShowToastMesage('Mobile No  required', 'warning', 5000);
      return;
    }
    if (!model.Password) {
      this.ShowToastMesage('Password required', 'warning', 5000);
      return;
    }

    requestEntity.email = model.EmailId;
    requestEntity.telephone = model.LoginId;
    requestEntity.password = model.Password;

    const formData = new FormData();
    formData.append('email', model.EmailId);
    formData.append('telephone', model.LoginId);
    formData.append('password', model.Password);
    console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    Axios.post(
      //'http://staging-rss.staqo.com/api/pdboy_login',
      'https://irpl.biz/royal-serry-dev/api/pdboy_login',

      formData,
      config,
    )
      .then((res) => {
        console.log(JSON.stringify(res, null, 4));
        if (res.data?.userdata) {
          model.User = res.data?.userdata as RoyalSerryUser;
          console.log(JSON.stringify(model.User, null, 4));

          SessionHelper.SetSession(model.User);
          this.ShowToastMesage('Logged In Successfully', 'warning', 5000);
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Drawer', screen: 'DasboardPage'}],
          });

          this.UpdateViewModel();
        } else {
          this.ShowToastMesage(res.data?.message, 'warning', 5000);
        }
      })
      .catch(
        (err) => {
          this.ShowToastMesage(err.data?.message, 'warning', 5000);
        },

        // this.ShowPageLoader(true);

        // SessionHelper.SetSession(res.Data as Customer);
        //
      );

    // console.log(JSON.stringify(j))
  };

  HandleCloseApp = async () => {
    var result = await this.ShowConfirmBox('Do you want to exit?');
    if (result === ConfirmBoxResult.Cancel) {
      return;
    }

    BackHandler.exitApp();
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
        <View style={{height: '8%'}}>
          <CustomImage
            source={require('../../../assets/logo.png')}
            style={{alignSelf: 'flex-end', marginTop: 10}}
          />
        </View>
        <View
          style={{
            borderTopWidth: 5,
            marginTop: '15%',
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
          onBackButtonPress={this.HandleCloseApp}>
          <KeyboardAwareScrollView extraHeight={120} enableOnAndroid={true}>
            <View
              style={{
                height: '80%',
                marginTop: '70%',
                backgroundColor: BaseColor.ColorGrey,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  alignSelf: 'center',
                  fontWeight: '900',
                }}>
                PD Login
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,

                  alignSelf: 'center',
                  fontWeight: '600',
                  color: BaseColor.ColorGreyDeep,
                }}>
                Sign in to continue
              </Text>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                {model.PaymentTypeDisplayList.map((i) => {
                  return (
                    <ListItem
                      key={i.Value}
                      onPress={(e) => {
                        this.HandlePaymentModeChanged(i.Value);
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Radio
                          selected={model.CustomerPaymentMode === i.Value}
                          color={BaseColor.ColorRed}
                          selectedColor={BaseColor.ColorRed}
                          onPress={(e) => {
                            this.HandlePaymentModeChanged(i.Value);
                          }}
                          style={{}}
                        />

                        <View>
                          <Text
                            style={{
                              fontSize: 13,
                              marginLeft: 2,
                              marginTop: '2%',
                            }}>
                            {i.Display}
                          </Text>
                        </View>
                      </View>
                    </ListItem>
                  );
                })}
              </View>

              {model.Selected == '1' && (
             <Item floatingLabel style={{ alignSelf: 'center',width:'90%' }}>
                  <Input
                    autoCapitalize="none"
                    onChangeText={(text) => this.SetModelValue('EmailId', text)}
                    style={{
                      borderColor: BaseColor.ColorGreen,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 25,
                    }}
                    placeholder="Enter your Email"
                  />
                </Item>
              )}
              {model.Selected == '2' && (
                <View style={{marginTop: '5%', marginLeft: 5}}>
                  {/* <PhoneInput ref='phone'
             onChangePhoneNumber={(text) => this.SetModelValue('LoginId', text)}
             initialCountry={'in'}
                // initialValue="13178675309"
                textProps={{
                    placeholder: 'Enter a phone number...'
                }}/> */}
                  <PhoneInput
                    ref="phone"
                    defaultValue={model.LoginId}
                    defaultCode="IN"
                    layout="first"
                    onChangeText={(text) => this.SetModelValue('LoginId', text)}
                    onChangeFormattedText={(text) =>
                      this.SetModelValue('formattedValue', text)
                    }
                    withDarkTheme
                    autoFocus
                  />
                </View>
              )}
              {/* <Item style={{alignSelf: 'center', marginTop: 20}}>
              <Input
                placeholder="Password"
                //  passwordRules="true"
                autoCapitalize="none"
                onChangeText={(text) => this.SetModelValue('Password', text)}
                secureTextEntry={true}
                style={{
                  marginTop: 12,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            </Item> */}
              <PasswordInputText
                // getRef={input => this.input = input}
                // textColor={BaseColor.ColorGreen}

                style={{  color: BaseColor.ColorGreen,width:'90%',marginLeft:'6%' }}
                labelTextStyle={{}}
                value={model.Password}
                onChangeText={(text) => this.SetModelValue('Password', text)}
              />
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgotPasswordPage')
                }>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 15,

                    alignSelf: 'flex-start',
                    fontWeight: '600',
                    color: BaseColor.ColorRed,
                    marginLeft: '6%'
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <Button
                onPress={this.login}
                style={{
                  borderRadius: 10,
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: BaseColor.ColorGreen,
                  marginTop: 30,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                <Text style={{color: BaseColor.ColorWhite, fontWeight: '900'}}>
                  Login
                </Text>
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </Modal>
      </View>
    );
  }
}
