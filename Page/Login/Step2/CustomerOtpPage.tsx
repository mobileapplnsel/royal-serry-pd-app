import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

import {Button, Container, Content} from 'native-base';

import {
  CustomerLoginViewModelBase,
  FromPageToLogin,
} from '../CustomerLoginViewModel';
import BaseComponent from '../../../Core/BaseComponent';
import BaseState from '../../../Core/BaseState';

import Customer, {CustomerRegisterStep} from '../../../Entity/Customer';
import SessionHelper from '../../../Core/SessionHelper';
import BaseColor from '../../../Core/BaseTheme';
import AppIconImage from '../../../assets/AppIconImage';
import UserDataAccess, {
  CustomerOTPRequestEntity,
} from '../../../DataAccess/UserDataAccess';
import ImageStyle from '../../../Style/ImageStyle';

export class CustomerOTPViewModel extends CustomerLoginViewModelBase {
  Code: string = '';
}

export default class CustomerOtp extends BaseComponent<
  any,
  CustomerOTPViewModel
> {
  constructor(props: any) {
    super(props);
    this.state = new BaseState(new CustomerOTPViewModel());
    this.state.Model.MobileNo = props.route.params.MobileNo;
    this.state.Model.FromPage = props.route.params.FromPage;
  }

  componentDidMount() {
    this.LoadOTPList();
    // UserDataAccess.GetAll_Test((res => {

    //   var allData = res.Data as any[]

    //   var otp = allData.find(i => i.MobileNo === this.state.Model.MobileNo);
    //   this.ShowToastMesage("OTp is " + otp.Code, "danger");

    // }))
  }
  LoadOTPList = async () => {
    var model = this.state.Model;
    this.ShowPageLoader(true);
    var res = await UserDataAccess.GetAll_Test(model);
    this.ShowPageLoader(false);
    this.ProcessResponseData(res, false);
    if (!res.IsSuccess) {
      return;
    }
    var allData = res.Data as any[];

    var otp = allData.find((i) => i.MobileNo === this.state.Model.MobileNo);
    this.ShowToastMesage('OTp is ' + otp.Code, 'danger', 5000);

    this.UpdateViewModel();
  };
  DoLogin = async () => {
    var model = this.state.Model;
    // if (!model.Code || model.Code.length != 6) {
    //   this.ShowToastMesage("Invalid code", "danger",5000);
    //   return;
    // }

    var otpRequest = new CustomerOTPRequestEntity();

    otpRequest.Code = model.Code;
    otpRequest.MobileNo = model.MobileNo;
    console.log(otpRequest);
    this.ShowPageLoader(true);
    var res = await UserDataAccess.VerifyOTP(otpRequest);
    this.ShowPageLoader(false);

    this.ProcessResponseData(res, false);
    console.log(res);
    if (!res.IsSuccess) {
      return this.ShowToastMesage(res.Message, 'danger', 5000);
    }

    var OTPId = res.Data.OTPId as string;
    var tempCustomer = res.Data.Customer as Customer;

    //
    if (tempCustomer.RegisterStep === CustomerRegisterStep.ProfileCompleted) {
      SessionHelper.SetSession(tempCustomer);
      this.ShowToastMesage(
        'Welcome back ' + tempCustomer.FirstName,
        'success',
        3000,
      );
    }

    if (tempCustomer.RegisterStep === CustomerRegisterStep.ProfileCompleted) {
      switch (model.FromPage) {
        case FromPageToLogin.Drawer:
          this.props.navigation.navigate({name: 'AppShowCase'});
          break;
        case FromPageToLogin.Order:
          this.props.navigation.navigate({name: 'Cart'});
          break;
      }
      //TODO:redirect ot appropiate page
    } else {
      this.props.navigation.navigate({
        name: 'CustomerProfilePage',
        params: {
          OTPId: OTPId,
          CustomerId: tempCustomer.CustomerId,
          FromPage: model.FromPage,
        },
      });
    }
  };

  otpInput: any;
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../../assets/pages-08.jpg')}
          style={ImageStyle.BackgroundImage}>
        <Content>
          <SafeAreaView style={styles.SafeAreaStyle}>
            {/* <Animatable.View animation="zoomIn" direction="alternate"> */}
            <AppIconImage />
            {/* </Animatable.View> */}
          </SafeAreaView>
          {/* <Animatable.View animation="fadeInUpBig" direction="alternate" style={{ height: '100%' }}> */}
          <Text style={styles.OtpTextLabel}>Please Enter OTP Code</Text>
          <OTPTextView
            containerStyle={styles.OtpTextInput}
            handleTextChange={(text: any) => this.SetModelValue('Code', text)}
            inputCount={6}
            keyboardType="numeric"
            textInputStyle={[styles.roundedTextInput, {borderRadius: 20}]}
          />
           {/* <OTPTextView
          handleTextChange={(e) => {}}
          // containerStyle={{marginLeft:20,marginEnd:20}}
          textInputStyle={[styles.roundedTextInput, {borderRadius: 20}]}
          inputCount={6}
          defaultValue="123456"
          // textInputStyle={{width: 40}}
        /> */}
          <Button onPress={this.DoLogin} style={styles.BtnStyle}>
            <Text style={styles.BtnTxt}>VERIFY</Text>
          </Button>
          {/* </Animatable.View> */}
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  SafeAreaStyle: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  OtpTextLabel: {
    color: BaseColor.ColorGreen,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    alignSelf: 'center',
  },
  OtpTextInput: {
    borderColor: BaseColor.ColorGreen,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
  },
  BtnStyle: {
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: BaseColor.ColorGreen,
    marginTop: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnTxt: {color: BaseColor.ColorWhite, fontWeight: 'bold'},
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
    // width:40
  }
});
