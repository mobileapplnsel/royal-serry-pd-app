import React from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  StyleSheet,
  RefreshControl,
  Modal,
  ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';
import NumericInput from 'react-native-numeric-input';
import BaseColor from '../../Core/BaseTheme';

// import {
//   OrderItemActionTypes,
//   SET_ITEM_COUNT_ON_CART,
//   REMOVE_FROM_CART,
// } from '../../Redux/actions/OrderItemAction';
import {connect} from 'react-redux';
import {RootReduxState} from '../../Redux/store/Store';

import EntityHelperService from '../../Service/EntityHelperService';
import {Badge} from 'native-base';
import { ProductItems } from '../../Entity/ProductItems';
import CartOrderItemViewModel from '../Order/CartOrderItemViewModel';
import { OrderItemActionTypes, REMOVE_FROM_CART, SET_ITEM_COUNT_ON_CART } from '../../Redux/actions/OrderItemAction';

type ProductCounterPagePropsType = {
  ProductItem: ProductItems;
  OrderItemList: CartOrderItemViewModel[];
  onCountChange: (Count: number) => void;
};

function ProductCounterPage(props) {
  const {
    ProductItem,
    OrderItemList,
    onCountChange,
    ...rest
  }: ProductCounterPagePropsType = props;

  var tempOrder = OrderItemList.find(
    (i) => i.ProductItem.ProductItemId === ProductItem.ProductItemId,
  );

  //if null creating a virtual order
  if (!tempOrder) {
    tempOrder = new CartOrderItemViewModel();
    tempOrder.OrderItemId = Math.random().toString(36).substr(2, 5);
  }

  //keep it outside if product item refresh will update too
  tempOrder.ProductItem = ProductItem;

  var [Order, setOrder] = React.useState(tempOrder);
  React.useEffect(() => {
    //console.log(tempOrder.ProductItem.ProductItemId )
    //update only when product images are missing in previous
    if (
      !Order?.ProductItem?.Documents?.length ||
      Order?.Count != tempOrder?.Count
    ) {
      setOrder(tempOrder);
    }
  });

  const SetItemOrderCount = (CurrntCount: number) => {
    //call if delegate avaialbe
    onCountChange && onCountChange(CurrntCount);

    if (CurrntCount === 0) {
      var removeData: OrderItemActionTypes = {
        type: REMOVE_FROM_CART,
        Data: Order.OrderItemId,
      };
      props.dispatch(removeData);
      return;
    }

    Order.Count = CurrntCount;
    var finalData: OrderItemActionTypes = {
      type: SET_ITEM_COUNT_ON_CART,
      Data: Order,
    };
    props.dispatch(finalData);
   };
  var IsItemAvaialble = EntityHelperService.IsItemAvaialble(ProductItem);

  return (
    <View >
      {IsItemAvaialble && (
        <NumericInput           
          totalHeight={styles.ItemStyle.height}
          totalWidth={styles.ItemStyle.width}
          rounded 
          maxValue={100}
          minValue={0}
          inputStyle={styles.inputStyle}
          editable={false}
          onChange={(count) => SetItemOrderCount(count)}
          initValue={Order.Count}
          borderColor={BaseColor.HeaderColor}
          
        />
      )}
      {!IsItemAvaialble && (
        <Badge style={[styles.BadgeStyle,styles.ItemStyle]}>
          <Text style={styles.TXT}>Sold out</Text>
        </Badge>
      )}
    </View>
  );
}

const mapStateToProps = (state: RootReduxState) => {
  return {
    OrderItemList: state.OrderItemList.OrderItemList,
  };
};

export default connect(mapStateToProps, null)(ProductCounterPage);

const styles = StyleSheet.create({
    
  inputStyle: { 
    backgroundColor: BaseColor.HeaderColor,
    color: BaseColor.ColorWhite,
  },
  TXT: {alignSelf: 'center', color: BaseColor.ColorGreen},
  BadgeStyle: { 
    backgroundColor: BaseColor.ColorWhite, 
    borderRadius: 5, 
    borderColor: BaseColor.ColorGreen,
    borderWidth: 1, 
  },
  ItemStyle:{
    height:45,
    width:130
  }
});
