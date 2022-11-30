import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Icon,
} from 'native-base';
import * as Animatable from 'react-native-animatable';

import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NewAppShowCase from '../Page/AppShowCase/AppShowcasePage';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import BaseColor from '../Core/BaseTheme';

import AppIconImage from '../assets/AppIconImage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { ConstantMessage } from '../Core/Index';
import { AppEnvironmentService } from '../Service/AppEnvironmentService';
import CategoryPage from '../Page/Category/CategoryPage';

import DrawerContent from '../Page/Drawer/DrawerContent';
import CartIcon from '../Page/Cart/CartIcon';
import CartPage from '../Page/Cart/CartPage';
import ProductItemDetailsPage from '../Page/ProductItem/ProductItemDetailsPage';
import CustomerLoginPage from '../Page/Login/Step1/CustomerLoginPage';
import CustomerOtpPage from '../Page/Login/Step2/CustomerOtpPage';
import { CustomerProfilePage } from '../Page/Login/step3/CustomerProfilePage';
import CartCustomerAddressPage from '../Page/Cart/CartCustomerAddressPage';
import OrderTimeSlotPage from '../Page/Order/OrderTimeSlotPage';
import CustomerAddAddressPage from '../Page/Login/step3/CustomerAddAddressPage';
import ProductItemVerticalShowCasePage from '../Page/ProductItem/ProductItemVerticalShowCasePage';

import { StockEntryPage } from '../Page/Seller/Stock Entry/StockEntryPage';
import { StockMappingPage } from '../Page/Seller/Stock Mapping/StockMappingPage';
import { AllAcceptedOrderPage } from '../Page/Seller/Order/AllAcceptedOrderPage';

import LoginPage from '../Page/RoyalSerry/Login/LoginPage';
import DasboardPage from '../Page/RoyalSerry/Dashboard/DashboardPage';
import CustomImage from '../Control/CustomImage';
import AllOrderPage from '../Page/RoyalSerry/Order/AllOrderPage';
import OrderDetailsPage from '../Page/RoyalSerry/Order/OrderDetailsPage';
import AllOrderHistoryPage from '../Page/RoyalSerry/Order/AllOrderHistoryPage';
import holidayPage from '../Page/RoyalSerry/HoliDay/holidayPage';
import DutyAllowcationPage from '../Page/RoyalSerry/DutyAllowcation/DutyAllowcationPage';
import ForgotPasswordPage from '../Page/RoyalSerry/ForgotPassWord/ForgotPasswordPage';
import SplashPage from '../Page/SplashPage';
import Splash from '../Page/RoyalSerry/Splash Screen/Splash';
import ProfilePage from '../Page/RoyalSerry/Profile/ProfilePage';
import EditOrderItemPage from '../Page/RoyalSerry/Order/EditOrderItemPage';
import MapViewPage from '../Page/RoyalSerry/Maps/MapViewPage';
import ScanBarcodePage from '../Page/RoyalSerry/ScanBarcode/ScanBarcodePage';
import AddOrderItemPage from '../Page/RoyalSerry/Order/AddOrderItemPage';
import QuotationCreatePage from '../Page/RoyalSerry/Quotation/QuotationCreatePage';
import AddQuotionItemPage from '../Page/RoyalSerry/Quotation/AddQuotionItemPage';
import AllRequestQuationPage from '../Page/RoyalSerry/Quotation/AllRequestQuationPage';
import AddRequestQuationPage from '../Page/RoyalSerry/Quotation/AddRequestQuationPage';
import QuationMapViewPage from '../Page/RoyalSerry/Quotation/QuationMapViewPage';

const TopStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const StackScreen = ({ navigation }) => (
  <Stack.Navigator initialRouteName="DasboardPage">

    <Stack.Screen
      name="ScanBarcodePage"
      component={ScanBarcodePage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
    <Stack.Screen
      name="MapViewPage"
      component={MapViewPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
        <Stack.Screen
      name="QuationMapViewPage"
      component={QuationMapViewPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />

    <Stack.Screen
      name="DasboardPage"
      component={DasboardPage}
      options={HearderOptions({
        navigation,
        ShowSearch: false,
      })}
    />
    <Stack.Screen
      name="AllOrderPage"
      component={AllOrderPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
    <Stack.Screen
      name="ProfilePage"
      component={ProfilePage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
    <Stack.Screen
      name="holidayPage"
      component={holidayPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
    <Stack.Screen
      name="AllOrderHistoryPage"
      component={AllOrderHistoryPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
    <Stack.Screen
      name="DutyAllowcationPage"
      component={DutyAllowcationPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
    <Stack.Screen
      name="OrderDetailsPage"
      component={OrderDetailsPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
    <Stack.Screen
      name="EditOrderItemPage"
      component={EditOrderItemPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
    <Stack.Screen
      name="AddOrderItemPage"
      component={AddOrderItemPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
      <Stack.Screen
      name="QuotationCreatePage"
      component={QuotationCreatePage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
       <Stack.Screen
      name="AddQuotionItemPage"
      component={AddQuotionItemPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
     <Stack.Screen
      name="AllRequestQuationPage"
      component={AllRequestQuationPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
         <Stack.Screen
      name="AddRequestQuationPage"
      component={AddRequestQuationPage}
      options={{
        headerTitle: () => <HeaderTittle />,
        headerStyle: {
          // backgroundColor: BaseColor.HeaderColor,
          minHeight: Platform.OS === 'ios' ? 85 : 80,
        },
        headerTintColor: BaseColor.ColorRed,
      }}
    />
  </Stack.Navigator>
);

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      minSwipeDistance={200}
      openByDefault={false}
      drawerType="back"

      //drawerContent={(props) => <DrawerContent {...props} />}
      drawerContent={(props) => {
        console.log(props.state.routeNames)
        return (
          <DrawerContent {...props} />
        );
      }}
      drawerPosition="left"

      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
      }}

      drawerStyle={{ backgroundColor: 'transparent' }}
      initialRouteName={SplashPage.RouteName()}>
      <Drawer.Screen
        name="HomePage"
        component={StackScreen}
        options={{
          headerShown: false,
          drawerLabel: () => {
            return null;
          },
          title: null,
          drawerIcon: () => {
            return (
              <View>
                <AppIconImage />
              </View>
            );
          },
        }}
      />
    </Drawer.Navigator>
  )
}

function AppStack() {
  return (
    <NavigationContainer  >
      <TopStack.Navigator initialRouteName="Splash"    >
        <TopStack.Screen
          name="Splash"
          component={Splash}

          options={{ headerShown: null, gestureEnabled: false }}
        />
        <TopStack.Screen
          name="SplashPage"
          component={SplashPage}
          options={{ headerShown: null, gestureEnabled: false }}
        />
        <TopStack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false, gestureEnabled: false }}

        />
        <TopStack.Screen
          name="ForgotPasswordPage"
          component={ForgotPasswordPage}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: BaseColor.ColorRed,
          }}
        />
        <TopStack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </TopStack.Navigator>
    </NavigationContainer>
  );
}

export const HeaderTittle = (props: any) => {
  return (
    <View
      style={
        {
          // alignSelf: 'center',
        }
      }>
      {/* <Text
        style={{
          color: BaseColor.ColorWhite,
          fontWeight: 'bold',
          alignSelf: 'center',
        }}>
        {props.Title}
      </Text> */}
      {/* <View style={{height:199}}> */}
      <View>
        <CustomImage
          source={require('../assets/logo.png')}
          style={{
            flex: 1,
            width: 150,
            height: 50,
          }}
        />
      </View>
      {/* </View> */}
      {/* {props.TitleIconRight !== null && ( */}
      {/* <FontAwesome5Icon
          style={{  }}
          size={20}
          color={BaseColor.ColorRed}
          name={props.TitleIconRight}></FontAwesome5Icon> */}
      {/* // )} */}
    </View>
  );
};

const DrawerIcon = (props: any) => {
  return (
    <EvilIcons
      name="navicon"
      size={40}
      style={{ marginStart: 2 }}
      color={BaseColor.ColorRed}
      onPress={() => {
        props.navigation.openDrawer();
      }}
    />
  );
};
const SearchIcon = (props: any) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        name="person"
        style={{
          color: BaseColor.ColorRed,
          marginTop: 5,
          marginButtom: 5,
          marginEnd: 10,
        }}
        onPress={() => {
          props.navigation.navigate('ProfilePage');
        }}
      />
      {/* <Text style={{color: BaseColor.ColorRed, margin: 4}}>Sign in</Text> */}
    </View>
  );
};

const HearderOptions = (props: any) => {
  var { navigation, Title, ShowLeft, ShowRight, ShowSearch, TitleOnly } = props;

  if (ShowRight === undefined) {
    ShowRight = true;
  }

  if (ShowLeft === undefined) {
    ShowLeft = true;
  }
  if (TitleOnly) {
    ShowLeft = false;
    ShowRight = false;
  }
  if (ShowSearch === undefined) {
    ShowSearch = true;
  }
  return {
    headerLeft: () =>
      ShowLeft ? <DrawerIcon navigation={navigation} /> : <></>,
    headerRight: () =>
      ShowRight ? (
        <View style={styles.iconContainer}>
          {ShowSearch && (
            <View style={{ marginRight: 30, alignSelf: 'center' }}>
              <SearchIcon navigation={navigation} />
            </View>
          )}
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            {/* <Text>Cart Icon</Text> */}
            <SearchIcon navigation={navigation} color={BaseColor.ColorRed} />
          </View>
        </View>
      ) : (
        <></>
      ),
    headerTitle: () => <HeaderTittle {...props} />,
    headerStyle: {
      // backgroundColor: BaseColor.HeaderColor,
      minHeight: Platform.OS === 'ios' ? 85 : 80,
      tintColor: 'transparent',
    },
  };
};
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AppStack;
