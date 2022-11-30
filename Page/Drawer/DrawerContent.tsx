import React from 'react';
import {ImageBackground, Linking, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import Icon6 from 'react-native-vector-icons/Fontisto';
import Icon7 from 'react-native-vector-icons/Ionicons';
import Icon8 from 'react-native-vector-icons/MaterialCommunityIcons';

// import SessionHelper from '../../../Core/SessionHelper';
// import { AppEnvironmentService } from '../../../Service/AppEnvironmentService';
// import Customer from '../../../Entity/Customer';
import {Container, Separator, Text, Toast, View} from 'native-base';
import DeviceInfo from 'react-native-device-info';
import BaseColor from '../../Core/BaseTheme';
import Customer from '../../Entity/Customer';
import SessionHelper from '../../Core/SessionHelper';
import {ConfirmBoxResult} from '../../Core/BaseComponent';
import UIHelper from '../../Core/UIHelper';
import ImageStyle from '../../Style/ImageStyle';
// import BaseColor from '../../../Core/BaseTheme';
// import { ConfirmBoxResult, ConstantMessage, UIHelper } from '../../../Core/Index';
export default function DrawerContent(props) {
  var [customer, setCustomer] = React.useState(null as Customer);

  var pressCount = 0;
  //console.log('pressCount:' + pressCount);
  const logout = async () => {

    var result = await UIHelper.ShowConfirmBox("Do you want to logout")

    if (result === ConfirmBoxResult.Cancel) {
      return
    }

    SessionHelper.SetSession(null);
  //   this.props.navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'LoginPage' }],
  // })
    Toast.show({
      text: 'You have logged out sucesfully',
      type: 'success',
      duration: 2000,
    });
    props.navigation.navigate('LoginPage')
  
  
  };
  return (
  <Container>
      {/* <ImageBackground
          source={require('../../assets/pages-11.jpg')}
          style={ImageStyle.BackgroundImage}> */}
    <DrawerContentScrollView {...props}>
       
      <DrawerItemList {...props} />
    
      <Separator bordered style={{marginTop: 6}}>
        <Text style={style.SeparatorText}>My Activity</Text>
      </Separator>
  
      <DrawerItem
        label="Home"
        labelStyle={style.label}
        icon={() => <Icon5 name="home" style={style.Icon} />}
        onPress={() => {
          props.navigation.navigate('DasboardPage');
        }}
      />
    
        {/* <DrawerItem
          label="My order list"
          labelStyle={style.label}
          icon={() => <Icon6 name="shopping-basket-add" style={style.Icon} />}
          onPress={() => {
            props.navigation.navigate('AddProductPage');
          }}
        /> */}
    
   
      <DrawerItem
        label="All Order"
        labelStyle={style.label}
        icon={() => <Icon5 name="cart-arrow-down" style={style.Icon} />}
        onPress={() => {
          props.navigation.navigate('AllOrderPage');
        }}
      />
    
      <DrawerItem
        label="Order History"
        labelStyle={style.label}
        icon={() => <Icon3 name="handshake" style={style.Icon} />}
        onPress={() => {
          props.navigation.navigate('AllOrderHistoryPage');
        }}
      />
    

     
      {/* {customer !== null && ( */}
        <DrawerItem
          label="Log out"
          labelStyle={style.label}
          icon={() => <Icon7 name="ios-exit" style={style.Icon} />}
          onPress={logout}
        />
      {/* )} */}
    </DrawerContentScrollView>
    {/* </ImageBackground> */}
    </Container>
  );
}

const style = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: BaseColor.ColorGreen,
  },
  Icon: {
    marginTop: 5,
    fontSize: 22,
    color: BaseColor.ColorGreen,
    alignSelf: 'flex-start',
    width: 28,
  },
  SeparatorText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
