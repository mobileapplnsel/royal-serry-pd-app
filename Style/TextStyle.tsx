import React from 'react-native';

const {StyleSheet} = React;
import BaseColor from '../Core/BaseTheme';

export default {
  SplashWelcome: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: BaseColor.ColorWhite,
    fontSize: 22,
    fontWeight: '900',
  },
  LoginWelcome: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: BaseColor.ColorBlue,
    fontSize: 22,
    fontWeight: '900',
  },
  LoginLebel: {
    justifyContent: 'center',
    color: BaseColor.ColorSky,
    fontSize: 16,
    marginTop: '12%',
    marginLeft: '14%',
  },
  DashboarditemName: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  
    color: BaseColor.ColorGreen,
  },
  ChooseSellerTxt: {fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 22},
  AppShowcaseImageText: {
    color: BaseColor.ColordeepGreen,
    fontSize: 18,
    fontWeight: 'bold',
  },
  SubcategoryText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  ProductItemText: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8F98A1',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#8F98A1',
    marginLeft: 20,
  },
  CartProductNameStyle: {
    alignSelf: 'flex-start',
    fontWeight: '100',
    fontSize: 13,
  },
  CartProductPriceStyle: {
    alignSelf: 'flex-start',
    fontSize: 13,

    fontWeight: 'bold',
    color: '#8F98A1',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#8F98A1',
  },
  CartProductOfferPrice: {
    alignSelf: 'flex-start',
    fontSize: 15,

    fontWeight: 'bold',
    color: BaseColor.ColorGreen,
  },
  CartquentityStyle: {alignSelf: 'flex-start', fontSize: 8, fontWeight: '900'},

  BtnTxt: {
    backgroundColor: BaseColor.ColorWhite,
    marginEnd: 5,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  CartsafeText: {
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
    marginLeft: 20,
    fontWeight: '900',
    color: BaseColor.ColorGreen,
  },
  CartValueTxt: {
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
    marginEnd: 20,
    fontWeight: '900',
    color: BaseColor.ColorGreen,
  },
  CartTotalAmountStyle: {
    backgroundColor: BaseColor.ColorWhite,
    justifyContent: 'flex-end',
  },
  CartPayableamount: {
    color: BaseColor.ColorWhite,
    fontWeight: 'bold',
    fontSize: 15,
    marginStart: 15,
    alignSelf: 'center',
  },
  LoginWelcomeText: {
    fontSize: 21,
    marginTop: 20,
    alignSelf: 'center',
    color: BaseColor.ColorGreen,
    fontWeight: 'bold',
  },
  LoginBtnTxt: {color: BaseColor.ColorWhite, fontWeight: 'bold'},
  LoginItemLebel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: BaseColor.ColorGreen,
  },
  HeadText: {
    marginTop: 5,
    color: BaseColor.ColorGrey,
    fontWeight: 'bold'
},
};
