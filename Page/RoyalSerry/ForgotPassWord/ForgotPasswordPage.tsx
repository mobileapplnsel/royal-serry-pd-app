import React from 'react';
import { View, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import { Text, Input, Button, Item, Label } from 'native-base';
import BaseColor from '../../../Core/BaseTheme';
import * as Animatable from 'react-native-animatable';
import AppIconImage from '../../../assets/AppIconImage';
import Icon8 from 'react-native-vector-icons/MaterialCommunityIcons';

import BaseState from '../../../Core/BaseState';
import BaseComponent from '../../../Core/BaseComponent';
import SessionHelper from '../../../Core/SessionHelper';

import BaseResponse from '../../../Core/BaseResponse';
import CustomImage from '../../../Control/CustomImage';
import Modal from 'react-native-modal';
import RoyalSerryUserDataAccess, {
  LoginRequsetEntity,
} from '../../../DataAccess/RoyalSerryUserDataAccess';
import Axios from 'axios';
import RoyalSerryUser from '../../../Entity/RoyalSerryUser';

export class ForgotPasswordViewModel {
  LoginId: string = '';

  User: RoyalSerryUser;
}
export default class ForgotPasswordPage extends BaseComponent<
  any,
  ForgotPasswordViewModel
> {
  constructor(props: any) {
    super(props);
    this.state = new BaseState(new ForgotPasswordViewModel());

  }

  componentDidMount() {
    this.CheckIfUserAlreadyLogin();
  }
  CheckIfUserAlreadyLogin = async () => {
    var value = await SessionHelper.GetSession();

    if (value) {
      this.ShowToastMesage('You are already logged in', 'warning', 5000);
      this.props.navigation.navigate("Drawer", { screen: 'DasboardPage' });

    }
  };

  login = async () => {
    var model = this.state.Model;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(model.LoginId) === false ) {
      this.ShowToastMesage('Please enter valid email', 'warning', 5000);
      return;
    }
   
    const formData = new FormData();
    formData.append('email_id', model.LoginId);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    Axios.post(
      'http://staging-rss.staqo.com/api/forget_password',
      formData,
      config,
    )
      .then((res) => {
        if (res.data?.message) {
          this.ShowToastMesage(res.data?.message, 'warning', 5000);
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

  render() {
    return (
      <View style={{ height: '100%', backgroundColor: BaseColor.ColorWhite }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={BaseColor.ColorWhite}
          translucent={true}
        />
        <View style={{ height: '8%' }}>
          <CustomImage
            source={require('../../../assets/logo.png')}
            style={{ alignSelf: 'flex-end', marginTop: 10 }}
          />
        </View>
        <View
          style={{
            borderTopWidth: 5,
            marginTop: '15%',
            borderTopColor: BaseColor.ColorRed,
          }}></View>
        <View style={{ height: 100, width: 100 }}>
          <CustomImage
            source={require('../../../assets/banner-home.jpg')}
            style={{ height: '130%', width: '400%' }}
          />
        </View>
        <Modal isVisible={true} coverScreen={false} backdropOpacity={0} onBackButtonPress={() => { this.props.navigation.goBack() }} >
          <View
            style={{
              height: '80%',
              marginTop: '98%',
              backgroundColor: BaseColor.ColorGrey,
            }}>
            <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                alignSelf: 'center',
                fontWeight: '900',
              }}>
              Forgot Password
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,

                alignSelf: 'center',
                fontWeight: '600',
                color: BaseColor.ColorGreyDeep,
              }}>
              Enter Your Recovery mail
            </Text>
            <Item style={{ alignSelf: 'center',width:'90%' }}>
              <Input
                autoCapitalize="none"
                onChangeText={(text) => this.SetModelValue('LoginId', text)}
                style={{
                  borderColor: BaseColor.ColorGreen,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 25,
                }}
                placeholder="Email Address"
              />
            </Item>

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
              <Text style={{ color: BaseColor.ColorWhite, fontWeight: '900' }}>
                Recovery
              </Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}
