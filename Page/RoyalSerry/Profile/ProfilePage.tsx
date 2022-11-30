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
  List,
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
import {EmptyCollectionPage} from '../../../Control/Index';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SessionHelper from '../../../Core/SessionHelper';
import RoyalSerryUser from '../../../Entity/RoyalSerryUser';
import UserDataAccess from '../../../DataAccess/UserDataAccess';

export class ProfileViewModel extends BaseViewModel {
  User: RoyalSerryUser;
  //   DeliveryBoyName: string;
}

export default class ProfilePage extends BaseComponent<any, ProfileViewModel> {
  constructor(props) {
    super(props);
    this.state = new BaseState(new ProfileViewModel());
    // this.state.Model.IsPageLoading = true;
  }
  componentDidMount() {
    this.LoadEmployee();
  }
  LoadEmployee = async () => {
    var model = this.state.Model;
    var user = await SessionHelper.GetSession();
    model.User = user;
    console.log(user)
    this.UpdateViewModel();
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
        <Modal isVisible={true} coverScreen={false} backdropOpacity={0} onBackButtonPress={() => { this.props.navigation.goBack() }}>
          <View
            style={{
              height: '80%',
              marginTop: '30%',
              backgroundColor: BaseColor.ColorGrey,
            }}>
            {/* <SafeAreaView
              style={{justifyContent: 'center', alignItems: 'center'}}> */}
              {/* <FontAwesome
                name="user-circle-o"
                size={75}
                color={BaseColor.ColorRed}
              />
              <Text
                style={{
                  margin: 5,
                  fontSize: 16,
                  color: BaseColor.ColorRed,
                }}>
                {model.User?.firstname + ' ' + model.User?.lastname}
              </Text> */}
            {/* </SafeAreaView> */}
            <List style={{margin: 10}}>
            <ListItem icon style={{marginTop: 5, marginBottom: 5}}>
                <Body>
                  <Text>Name</Text>
                </Body>
                <Right>
                  <Text style={{color: BaseColor.ColorGreyDeep,fontSize:13}}>
                    {model.User?.firstname + ' ' + model.User?.lastname}
                  </Text>
                </Right>
              </ListItem>
              <ListItem icon style={{marginTop: 5, marginBottom: 5}}>
                <Body>
                  <Text>Phone</Text>
                </Body>
                <Right>
                  <Text style={{color: BaseColor.ColorGreyDeep,fontSize:13}}>
                    {model.User?.telephone}
                  </Text>
                </Right>
              </ListItem>
              <ListItem icon>
                <Body>
                  <Text>Email</Text>
                </Body>
                <Right>
                  <Text style={{color: BaseColor.ColorGreyDeep,width:'70%',fontSize:13}}>
                    {model.User?.email}
                  </Text>
                </Right>
              </ListItem>
              <ListItem icon style={{height:40}}>
                <Body>
                  <Text>Address</Text>
                </Body>
                <Right>
                  <Text style={{color: BaseColor.ColorGreyDeep,fontSize:13}}>
                    {model.User?.address + '' + model.User?.address2}
                  </Text>
                </Right>
              </ListItem>
            
              <ListItem icon>
                <Body>
                  <Text>Zip Code Covered</Text>
                </Body>
                <Right>
                  <Text style={{color: BaseColor.ColorGreyDeep,fontSize:13}}>
                    {model.User?.zip}
                  </Text>
                </Right>
              </ListItem>
            </List>
          </View>
        </Modal>
      </View>
    );
  }
}
