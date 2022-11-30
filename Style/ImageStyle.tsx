import React, {ImageStyle} from 'react-native';

const {StyleSheet} = React;
import BaseColor from '../Core/BaseTheme';

export default {
  BackgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

    //  justifyContent: 'center',
  },
  CallIcon: {
    marginTop: '50%',
    fontSize: 22,
    color: BaseColor.ColorGreen,
    alignSelf: 'flex-start',
    width: 28,
  },
  CategoryImage: {width: 70, height: 50, alignSelf: 'center'},
  AppshowcaseImagebackground: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubCategoryBackgroundImage:{
    padding: 5,
    height: 122,
    // backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#4EE126(0,0,0, 8)',
    shadowOffset: {height: 20, width: 20},
    shadowOpacity: 100, //default is 1
    shadowRadius: 10,
    elevation: 2,
    borderColor: '#C0C0C0',
    // opacity: 0.8
  },
  BrandImage:{
    padding: 5, height: 100, backgroundColor: '#fff', flex: 1, justifyContent: 'center', borderWidth: 0,
    overflow: 'hidden', shadowColor: '#4EE126(0,0,0, 8)',
    // shadowOffset: { height: 20, width: 20 },
    // shadowOpacity: 100, //default is 1
    // shadowRadius: 10,
    // elevation: 2,
    borderColor: '#C0C0C0',
    marginLeft:8
  
  },
  AppShowcaseProductImageStyle: {
    top: 2,
    alignContent: 'center',
    width: 120,
    height: 90,
    alignSelf: 'center',
  },
  CartImageStyle: {
    alignContent: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
};
