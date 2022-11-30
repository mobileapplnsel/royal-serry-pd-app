import React from 'react-native';

const {StyleSheet} = React;
import BaseColor from '../Core/BaseTheme';

export default {
  SplashContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  NextButtonView: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: '70%',
    marginEnd: '10%',
  },
  LoginButtonView: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: '40%',
    marginEnd: '10%',
  },
  categoryHeading: {
    alignContent: 'center',
    alignItems: 'center',

    justifyContent: 'center',
    borderRadius: 10,

    height: 40,

    marginTop: '35%',
    marginLeft: 10,
    marginEnd: 10,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 3},
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 5,
    // opacity: 0.8
  },
  DashboarditemContainer: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColor.BackgroundColor,
    justifyContent: 'center',
    // borderRadius: 5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 30,
    padding: 5,
    height: 120,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  gridView: {
    marginTop: '5%',
    flex: 10,
    marginBottom: 10,
  },
  DoctorSearchListItem: {
    backgroundColor: BaseColor.ColorWhite,
    margin: '2%',
    borderRadius: 5,
  },
  gapOnCategoryView: {
    marginTop: 10,
  },
  SubcategorySafeArea: {
    backgroundColor: BaseColor.HeaderColor,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '120%',
    alignSelf: 'center',
    marginTop: 2,
  },
  CartsafeTextHeader: {
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 20,
    fontWeight: 'bold',
    color: BaseColor.ColorGreen,
  },
  CartFooterStyle: {backgroundColor: BaseColor.ColorGreen, height: 30},
  CartTopFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: BaseColor.ColorGreen,
  },
  CartTotalAmountFooter: {
    backgroundColor: BaseColor.ColorWhite,
    borderBottomColor: BaseColor.BackgroundColor,
    borderBottomWidth: 1,
  },

  CartNetAmountFooter: {
    backgroundColor: BaseColor.ColorWhite,
    justifyContent: 'flex-end',
    borderBottomColor: BaseColor.BackgroundColor,
    borderBottomWidth: 1,
  },
  LoginSafeAreaStyle: {
    borderRadius: 40,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  BigRowView: {width: '75%', alignSelf: 'center', marginTop: 20},
};
