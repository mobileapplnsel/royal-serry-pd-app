import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import {
  Container,
  Text,
  Card,
  Button,
  CardItem,
  Body,
  Badge,
  ListItem,
  Content,
} from 'native-base';

import {connect} from 'react-redux';


import * as Animatable from 'react-native-animatable';
import {CustomImage} from '../../Control/Index';
import NoPreviewImage from '../../assets/NoPreviewImage';
import { ProductItems } from '../../Entity/ProductItems';
import BaseColor from '../../Core/BaseTheme';
import EntityHelperService from '../../Service/EntityHelperService';
import { RootReduxState } from '../../Redux/store/Store';
import ProductCounterPage from '../Control/ProductCounterPage';
import TextStyle from '../../Style/TextStyle';
import CardStyle from '../../Style/CardStyle';
import ImageStyle from '../../Style/ImageStyle';


function ProductItemShowCase(props) {
  const {
    ProductItem,
  }: {
    ProductItem: ProductItems;
  } = props;

  var firstImage = ProductItem.Documents.find((i) => i);
  if (!firstImage) {
    firstImage = NoPreviewImage;
  }
  var IsDiscountAvailable = EntityHelperService.IsOfferPercentageAvaialble(
    ProductItem,
  );

  return (
    <Container>
      <Content>
      <ImageBackground
                                    source={require('../../assets/pages-08.jpg')}
                                    style={CardStyle.ProductVerticalCardStyle}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 10 }}>

        {/* <Card style={styles.CardStyle}> */}
          
            <View style={{flex: 1, alignSelf: 'stretch'}}>
            <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ProductItemDetailsPage', {
                ProductItemId: ProductItem.ProductItemId,
              })
            }>
              <CustomImage
                source={{uri: firstImage.DocumentUrl}}
                style={ImageStyle.AppShowcaseProductImageStyle}
              />

              <Badge
                style={{
                  ...styles.overlay,
                  backgroundColor: IsDiscountAvailable
                    ? BaseColor.ColorWhite
                    : BaseColor.ColorWhite,
                }}>
                <Text style={{color: BaseColor.ColorGreen, fontSize: 10}}>
                  {ProductItem.OfferPercentage} % Off
                </Text>
              </Badge>
              </TouchableOpacity>
            </View>
          
          <View>
            <Text
              numberOfLines={2}
              style={{
                marginLeft: 5,
                marginRight: 5,
                fontSize: 12,
                height: 40,
              }}>
              {ProductItem.Name}
            </Text>
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: BaseColor.HeaderColor,
                }}>
                {'\u20B9'}
                {ProductItem.OfferPrice}
              </Text>
              {IsDiscountAvailable && (
                <Text
                
                  style={TextStyle.ProductItemText}>
                  {'\u20B9'} {ProductItem.Price}
                </Text>
              )}
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <ProductCounterPage ProductItem={ProductItem} />
          </View>
        {/* </Card> */}
        </ImageBackground>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state: RootReduxState) => {
  return {
    OrderItemList: state.OrderItemList,
  };
};

export default connect(mapStateToProps, null)(ProductItemShowCase);

const styles = StyleSheet.create({

overlay: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});
