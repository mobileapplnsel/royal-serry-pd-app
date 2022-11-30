import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import BaseColor from '../../Core/BaseTheme';
import { RootReduxState } from '../../Redux/store/Store';

import CartOrderItemViewModel from '../Order/CartOrderItemViewModel';

export function ShoppingCartIcon(props) {
  var tempOrderItemList = props.OrderItemList as CartOrderItemViewModel[];
  var itemCount = tempOrderItemList.length;
  // tempOrderItemList.forEach((a) => {
  //   itemCount += a.Count;
  // });
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
        <View
          style={{
            position: 'absolute',
            height: 20,
            width: 20,
            borderRadius: 25,
            backgroundColor: itemCount===0? BaseColor.HeaderColor: BaseColor.HeaderColor,
            right: 5,
            bottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}>
          <Text style={{color: BaseColor.HeaderColor, fontWeight: 'bold',fontSize:10}}>{itemCount}</Text>
        </View>
        {
          <Icon
            name="shopping-cart"
            size={30}
            style={{marginEnd: 10}}
            color={BaseColor.HeaderColor}
          />
        }
      </TouchableOpacity>
    </View>
  );
}
//mapping state
const mapStateToProps = (state: RootReduxState) => {
  return {
    OrderItemList: state.OrderItemList.OrderItemList,
  };
};

export default connect(mapStateToProps, null)(ShoppingCartIcon);
