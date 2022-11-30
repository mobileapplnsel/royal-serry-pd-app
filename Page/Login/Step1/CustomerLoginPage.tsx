import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Button,
  Item,
  Input,
  Label,
  Left,
  Body,
  Container,
  Icon,
} from 'native-base';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import DeviceInfo from 'react-native-device-info';
import * as Animatable from 'react-native-animatable';
import {Kohana} from 'react-native-textinput-effects';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  FromPageToLogin,
  CustomerLoginViewModelBase,
} from '../CustomerLoginViewModel';
import {CustomModalIndicator} from '../../../Control/Index';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import BaseState from '../../../Core/BaseState';
import BaseComponent from '../../../Core/BaseComponent';
import SessionHelper from '../../../Core/SessionHelper';

import BaseColor from '../../../Core/BaseTheme';
import UserDataAccess, {
  CustomerLoginOtpRequestEntity,
} from '../../../DataAccess/UserDataAccess';
import AppIconImage from '../../../assets/AppIconImage';
import ImageStyle from '../../../Style/ImageStyle';
import ViewStyle from '../../../Style/ViewStyle';
import TextStyle from '../../../Style/TextStyle';
import ButtonStyle from '../../../Style/ButtonStyle';

export class CustomerLoginViewModel extends CustomerLoginViewModelBase {
  DeviceID: string = '';
}

export default class CustomerLoginPage extends BaseComponent<
  any,
  CustomerLoginViewModel
> {
  keyboardDidHideListener: any;
  constructor(props: any) {
    super(props);
    this.state = new BaseState(new CustomerLoginViewModel());
    this.state.Model.FromPage =
      props.route?.params?.FromPage || FromPageToLogin.Drawer;
  }

  componentDidMount() {
    this.CheckIfUserAlreadyLogin();
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  CheckIfUserAlreadyLogin = async () => {
    var value = await SessionHelper.GetSession();

    if (value) {
      this.ShowToastMesage(
        'You are already logged in, still you can login again',
        'warning',
        5000,
      );
    }
  };

  SendOTP = async () => {
    var model = this.state.Model;

    if (!model.MobileNo || model.MobileNo.length != 10) {
      this.ShowToastMesage('Invalid mobile no', 'danger', 5000);
      return;
    }

    var OtpRequest = new CustomerLoginOtpRequestEntity();

    OtpRequest.MobileNo = model.MobileNo;

    OtpRequest.DeviceID = await DeviceInfo.getAndroidId();
    console.log(OtpRequest);

    this.ShowPageLoader(true);
    var res = await UserDataAccess.SendOTP(OtpRequest);
    this.ShowPageLoader(false);

    this.ProcessResponseData(res, false);
    console.log(res);
    if (!res.IsSuccess) {
      return;
    }

    this.props.navigation.navigate({
      name: 'CustomerOtp',
      params: {
        MobileNo: model.MobileNo,
        FromPage: model.FromPage,
      },
    });
  };

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    Keyboard.dismiss();
  };
  render() {
    var model = this.state.Model;
    return (
      <Container>
        <ImageBackground
          source={require('../../../assets/pages-08.jpg')}
          style={ImageStyle.BackgroundImage}>
          <CustomModalIndicator IsLoading={model.IsPageLoading} />
          <ScrollView>
            <SafeAreaView style={ViewStyle.LoginSafeAreaStyle}>
              <Animatable.View animation="zoomIn" direction="alternate">
                <AppIconImage />
              </Animatable.View>
            </SafeAreaView>
            <Text style={TextStyle.LoginWelcomeText}>
              Welcome to royalserry 
            </Text>

            <Item floatingLabel style={ViewStyle.BigRowView}>
              <Icon
                active
                name="md-call"
                style={{fontSize: 20, color: BaseColor.ColorGreen}}
              />
              <Label style={TextStyle.LoginItemLebel}>
                Enter Your Mobile Number
              </Label>

              <Input
                keyboardType="numeric"
                selectionColor={BaseColor.ColorGreen}
                underlineColorAndroid={BaseColor.ColorGreen}
                style={{color: BaseColor.ColorGreen, fontSize: 30}}
                value={model.MobileNo}
                maxLength={10}
                onChangeText={(text) => this.SetModelValue('MobileNo', text)}
              />
            </Item>

            <Animatable.View
              useNativeDriver
              animation="fadeInUpBig"
              direction="alternate"
              style={{height: '100%'}}>
              <Button onPress={this.SendOTP} style={ButtonStyle.LoginBtnStyle}>
                <Text style={TextStyle.LoginBtnTxt}>Send OTP</Text>
              </Button>
            </Animatable.View>
          </ScrollView>
        </ImageBackground>
      </Container>
    );
  }
}
