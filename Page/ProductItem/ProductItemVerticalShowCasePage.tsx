import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
  ImageBackground,
} from 'react-native';



import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  
  Button,
  ListItem,
  Text,
  Left,
  Body,
  Segment,
  Item,
  Badge,
  Container,

} from 'native-base';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';


import ActionSheet from 'react-native-actionsheet';
import {CustomImage} from '../../Control/Index';
import BaseViewModel from '../../Core/BaseViewModel';
import { ProductItems } from '../../Entity/ProductItems';
import BaseComponent from '../../Core/BaseComponent';
import BaseState from '../../Core/BaseState';
import ProductItemDataAccess, { ProductItemVendorAndSubCategoryWiseRequestEntity } from '../../DataAccess/ProductItemDataAccess';
import BaseColor from '../../Core/BaseTheme';
import EntityHelperService from '../../Service/EntityHelperService';
import ProductCounterPage from '../Control/ProductCounterPage';
import { RootReduxState } from '../../Redux/store/Store';
import ImageStyle from '../../Style/ImageStyle';


export class ProductItemVerticalShowCaseViewModel extends BaseViewModel {
  SellerID: string = '';
  ProductItemSubcategoryId: string = '';
  ProductItemList: ProductItems[] = [];
}

export class ProductItemVerticalShowCasePage extends BaseComponent<
  any,
  ProductItemVerticalShowCaseViewModel
> {
  ActionSheet: any;
  constructor(props: any) {
    super(props);
    var model = new ProductItemVerticalShowCaseViewModel();
    model.ProductItemSubcategoryId = this.props.route?.params?.ProductItemSubcategoryId;
    model.SellerID = this.props.route?.params?.SellerID;
    model.IsPageLoading = true;
    this.state = new BaseState(model);
  }
  componentDidMount() {
    this.LoadProductItemList();
  }

   

  LoadProductItemList = async() => {
    var model = this.state.Model;
    var rModel = new ProductItemVendorAndSubCategoryWiseRequestEntity();
    rModel.ProductItemSubcategoryId = model.ProductItemSubcategoryId;
    // rModel.BrandId=model.BrandId;
    rModel.VendorId=model.SellerID;
    console.log(rModel);
    this.ShowPageLoader(true);
    var res = await ProductItemDataAccess.GetAll(rModel);
    this.ShowPageLoader(false);
    this.ProcessResponseData(res, false);
    console.log(res);
    if (!res.IsSuccess) {
      return;
    }
  
        model.ProductItemList = res.Data as ProductItems[];
        model.IsPageLoading = false;
        this.UpdateViewModel();
      }
 
   
  render() {
    var model = this.state.Model;
    return (
      <Container>
          <ImageBackground
          source={require('../../assets/pages-08.jpg')}
          style={ImageStyle.BackgroundImage}>
      <FlatList
        style={{height: '100%', backgroundColor: BaseColor.ColorWhite}}
        keyExtractor={(item) => item.ProductItemId}
        data={model.ProductItemList}
        refreshControl={
          <RefreshControl
            refreshing={model.IsPageLoading}
            onRefresh={this.LoadProductItemList}
          />
        }
        renderItem={({item}) => {
          var IsDiscountAvailable = EntityHelperService.IsOfferPercentageAvaialble(
            item,
          );
          return (
            <ImageBackground
            source={require('../../assets/pages-08.jpg')}
            style={ImageStyle.BackgroundImage}>
              <ListItem>
                <Left>
                   <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ProductItemDetailsPage', {
                        ProductItemId: item.ProductItemId,
                      });
                    }}>
                  
                       {IsDiscountAvailable && (
                      <Badge style={styles.BadgeStyle}>
                        <Text style={styles.BadgeTextStyle}>
                          {item.OfferPercentage} % Off
                        </Text>
                      </Badge>
                    )}
                    <CustomImage
                      source={{uri: item.Documents[0].DocumentUrl}}
                      style={styles.ImageStyle}
                    />
                   </TouchableOpacity>
                
                </Left>
                <Body>
               
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      fontWeight: '900',
                      fontSize: 14,
                    }}>
                    {item.Name}
                  </Text>
                 
                  <View style={{flexDirection: 'row', marginLeft: 5}}>
                  {IsDiscountAvailable && (
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        textDecorationLine: 'line-through',
                        fontSize: 13,
                        fontWeight: '900',
                        color: '#808B96',
                        marginTop: 5,
                      }}>
                      {'\u20B9'} {item.Price}
                    </Text>
                  )}

                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: BaseColor.ColorPink,
                      marginTop: 3,
                    }}>
                    {'\u20B9'} {item.OfferPrice}
                  </Text>
                  </View>
                  <ProductCounterPage ProductItem={item} />
                </Body>
              </ListItem>
       </ImageBackground>
          
          );
        }}
      />
      </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootReduxState) => {
  return {
    OrderItemList: state.OrderItemList.OrderItemList,
  };
};

export default connect(mapStateToProps, null)(ProductItemVerticalShowCasePage);

const styles = StyleSheet.create({
  ImageStyle: {
    
    width: 100,
    height: 100,
    marginLeft:20
    
  },
  BadgeStyle: {
    backgroundColor: BaseColor.ColorPink,
    height: 22,
    alignSelf: 'flex-start',
marginLeft:90,
    display: 'flex',
  },
  BadgeTextStyle: {color: 'white', fontSize: 10},
});
