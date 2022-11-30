import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Card, CardItem, Text, Badge, Container, Content} from 'native-base';




// import ProductItemDataAccess from '../../../DataAccess/ProductItemDataAccess';

import ReadMore from 'react-native-read-more-text';
import * as Animatable from 'react-native-animatable';
import {
  CustomImage,
  CustomModalIndicator,
  CustomIndicator,
} from '../../Control/Index';
// import ProductCounterPage from '../../Control/ProductCounterPage';
import {SliderBox} from 'react-native-image-slider-box';
// import EntityHelperService from '../../../Service/EntityHelperService';
// import {KSUtility} from '../../../Core/Index';
import {AppStyles} from '../../Style/Style';
import BaseViewModel from '../../Core/BaseViewModel';
import { ProductItems } from '../../Entity/ProductItems';
import BaseComponent from '../../Core/BaseComponent';
import BaseState from '../../Core/BaseState';
import EntityHelperService from '../../Service/EntityHelperService';
import KSUtility from '../../Core/KSUtility';
import ProductCounterPage from '../Control/ProductCounterPage';
import BaseColor from '../../Core/BaseTheme';
import ProductItemDataAccess from '../../DataAccess/ProductItemDataAccess';
import ImageStyle from '../../Style/ImageStyle';

export class ProductItemViewModel extends BaseViewModel {
  ProductItemId: string = '';
  ProductItem: ProductItems = {} as ProductItems;
}

export default class ProductItemDetailsPage extends BaseComponent<
  any,
  ProductItemViewModel
> {
  constructor(props: any) {
    super(props);
    var model = new ProductItemViewModel();
    model.ProductItemId = this.props.route?.params?.ProductItemId;
    this.state = new BaseState(model);
    this.state.Model.IsPageLoading = true;
  }

  componentDidMount() {
    this.LoadProductItem();
  }
  LoadProductItem = async () => {
    var model = this.state.Model;
    this.state.Model.IsPageLoading = true;
    var res = await ProductItemDataAccess.Get<ProductItems>(model);
    this.ProcessResponseData(res, false);
    this.state.Model.IsPageLoading = false;
    if (!res.IsSuccess) {
      return;
    }

    model.ProductItem = res.Data;

    this.UpdateViewModel();
  };
  render() {
    var model = this.state.Model;

    var ImageList: string[] = [];
    if (model.ProductItem) {
      model.ProductItem?.Documents?.forEach((k) =>
        ImageList.push(k.DocumentUrl),
      );
    }

    var item = model.ProductItem;
    var IsDiscountAvailable = EntityHelperService.IsOfferPercentageAvaialble(
      item,
    );

    return (
      <Container>
         <ImageBackground
                    source={require('../../assets/pages-09.jpg')}
                    style={ImageStyle.BackgroundImage}>
        <CustomModalIndicator
          IsLoading={model.IsPageLoading}></CustomModalIndicator>

        <Content style={{margin: 10}}>
          <SliderBox
            sliderBoxHeight={300}
            ImageComponent={CustomImage}
            images={ImageList}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            ImageComponentStyle={{margin: 5, height: 250, width: '80%'}}
            disableOnPress={true}
            autoplay
            circleLoop
          />
        <Animatable.View animation="fadeInRightBig" direction="alternate"  useNativeDriver={true} >
          <View>
            <Card style={{borderRadius:10, opacity: 0.9}}>
              <View style={{margin: 10}}>
                <Text style={styles.ItemName}> {item.Name} </Text>
                <View style={styles.RowStyle}>
                  <Text style={styles.OfferPriceStyle}>
                    {KSUtility.RupeeSymbol} {item.OfferPrice}
                  </Text>

                  {IsDiscountAvailable && (
                    <Text style={styles.PriceStyle}>
                      {KSUtility.RupeeSymbol} {item.Price}
                    </Text>
                  )}
                  {IsDiscountAvailable && (
                    <Badge style={styles.BadgeStyle}>
                      <Text style={{color: 'white'}}>
                        {item.OfferPercentage} % Off
                      </Text>
                    </Badge>
                  )}
                </View>
                {/* <Text style={styles.PackSize}>{item.Unit?.Name} </Text> */}
                <Text style={AppStyles.TermAndConditionText}>
                  (Inclusive of all taxes)
                </Text>
                <View style={{marginTop: 5}}>
                  <ProductCounterPage ProductItem={item} />
                </View>
              </View>
            </Card>
            {KSUtility.IsNullOrEmpty(item.ShortDescription) === false && (
              <Card style={{borderRadius:10}}>
                <CardItem header>
                  <Text style={styles.HeaderTxt}>Overview</Text>
                </CardItem>
                <CardItem cardBody style={{margin: 10}}>
                  <Text note>{item.ShortDescription}</Text>
                </CardItem>
              </Card>
            )}
            {KSUtility.IsNullOrEmpty(item.Description) === false && (
              <Card style={{borderRadius:10}}>
                <CardItem header>
                  <Text style={styles.HeaderTxt}>Product Details</Text>
                </CardItem>
                <CardItem cardBody style={{margin: 10}}>
                  <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}
                    onReady={this._handleTextReady}>
                    <Text style={styles.DescriptionStyle}>
                      {item.Description}
                    </Text>
                  </ReadMore>
                </CardItem>
              </Card>
            )}
          </View>
          </Animatable.View>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={{color: BaseColor.ColorPink, margin: 5}}
        onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={{color: BaseColor.ColorPink, margin: 5}}
        onPress={handlePress}>
        Show less
      </Text>
    );
  };

  _handleTextReady = () => {
    // ...
  };
}

const styles = StyleSheet.create({
  ItemName: {fontSize: 17},
  RowStyle: {flexDirection: 'row'},
  OfferPriceStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BaseColor.ColorGreen,
  },

  PriceStyle: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: BaseColor.ColorGreen,
    color: '#8F98A1',
    marginLeft: 15,
  },
  BadgeStyle: {
    backgroundColor: BaseColor.ColorGreen,
    marginLeft: 15,
  },

  NumericInputStyle: {
    alignSelf: 'flex-start',
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: BaseColor.BackgroundColor,
    borderColor: BaseColor.ColorGreen,
    marginTop: 10,
    marginBottom: 10,
  },
  HeaderTxt: {fontSize: 17},
  PackSize: {fontSize: 15},
  DescriptionStyle: {fontSize: 13, margin: 10, color: '#8F98A1'},
  BtnStyle: {
    width: '80%',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: BaseColor.ColorGreen,
  },
  BtnTxt: {color: BaseColor.ColorWhite, fontWeight: 'bold'},
});
