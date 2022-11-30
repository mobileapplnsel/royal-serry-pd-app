import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {Text, Input, Button, Item, Label} from 'native-base';
import BaseColor from '../../../Core/BaseTheme';
import * as Animatable from 'react-native-animatable';
import AppIconImage from '../../../assets/AppIconImage';
import Icon8 from 'react-native-vector-icons/MaterialCommunityIcons';


import BaseState from '../../../Core/BaseState';
import BaseComponent from '../../../Core/BaseComponent';
import SessionHelper from '../../../Core/SessionHelper';

import BaseResponse from '../../../Core/BaseResponse';


export class LoginViewModel {
  LoginId: string = '';
  Password: string = '';
}
export default class LoginPage extends BaseComponent<
  any,
  LoginViewModel
> {
  constructor(props: any) {
    super(props);
    this.state = new BaseState(new LoginViewModel());
  }

  // componentDidMount() {
  //   this.CheckIfUserAlreadyLogin();
  // }
  // CheckIfUserAlreadyLogin = async () => {
  //   var value = await SessionHelper.GetDeliveryBoySession();

  //   if (value) {
  //     this.ShowToastMesage('You are already logged in', 'warning', 5000);
  //     this.props.navigation.navigate('DeliveryBoyDasboardPage');
  //   }
  // };

  login = async () => {
    // var model = this.state.Model;
    // var requestEntity = new DeliveryBoyRequestEntity();

    // requestEntity.LoginId = model.LoginId;
    // requestEntity.Password = model.Password;

    // DeliveryBoyDataAccess.Login(requestEntity, (res: BaseResponse) => {
    //   this.ProcessResponseData(res, false);
    //   if (!res.IsSuccess) {
    //     return;
    //   }
    //   var tempDeliveryBoy = res.Data as DeliveryBoy;
    //   SessionHelper.SetDeliveryBoySession(tempDeliveryBoy);
      this.props.navigation.navigate('DasboardPage');
      // alert('hello');
    // });
  };
  render() {
    return (
      <View style={{height: '100%', backgroundColor: BaseColor.ColorWhite}}>
        
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={BaseColor.ColorWhite} translucent={true} />
        <SafeAreaView
          style={{
            borderRadius: 40,
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 48,
          }}>
          <Animatable.View animation="zoomIn" useNativeDriver={true} direction="alternate">
            <AppIconImage />
          </Animatable.View>
        </SafeAreaView>
        <Animatable.View
          animation="fadeInUpBig"
          useNativeDriver={true}
          direction="alternate"
          style={{height: '100%'}}>
          <Text
            style={{
              fontSize: 20,
              margin: 20,
              alignSelf: 'center',
              color: BaseColor.ColorGreen,
              fontWeight: 'bold',
            }}>
           Welcome to royalserry Delivery
          </Text>
          <Item floatingLabel style={{width: '80%', alignSelf: 'center'}}>
            <Label style={{width: 300, color: BaseColor.ColorGreen}}>
              Enter your Username
            </Label>
            <Input
              autoCapitalize="none"
              onChangeText={(text) => this.SetModelValue('LoginId', text)}
              style={{
                borderColor: BaseColor.ColorGreen,
                width: '90%',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </Item>
          <Item
            floatingLabel
            style={{width: '80%', alignSelf: 'center', marginTop: 10}}>
            <Label style={{width: 300, color: BaseColor.ColorGreen}}>
              Password
            </Label>
            <Input
              autoCapitalize="none"
              onChangeText={(text) => this.SetModelValue('Password', text)}
              secureTextEntry={true}
              style={{
                borderColor: BaseColor.ColorGreen,
                width: '90%',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </Item>

          <Button
            onPress={this.login}
            style={{
              borderRadius: 10,
              width: '80%',
              alignSelf: 'center',
              backgroundColor: BaseColor.ColorGreen,
              marginTop: 30,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} />
            <Text style={{color: BaseColor.ColorWhite, fontWeight: 'bold'}}>
              Login
            </Text>
          </Button>
        </Animatable.View>
      </View>
    );
  }
}
