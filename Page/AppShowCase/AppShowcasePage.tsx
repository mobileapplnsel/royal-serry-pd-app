import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
  BackHandler,
  FlatList,
} from 'react-native';
import {Icon, Card, CardItem, Container} from 'native-base';
import BaseColor from '../../Core/BaseTheme';

import BaseComponent from '../../Core/BaseComponent';
import BaseViewModel from '../../Core/BaseViewModel';
import BaseState from '../../Core/BaseState';
import BaseResponse from '../../Core/BaseResponse';
import AppShowCaseSetting, {
  AppShowcaseType,
} from '../../Entity/AppShowCaseSetting';
import AppShowCaseSettingDataAccess, {
  AppShowcaseRequestEntity,
} from '../../DataAccess/AppShowCaseSettingDataAccess';

import * as Animatable from 'react-native-animatable';
import SessionHelper from '../../Core/SessionHelper';
import ImageStyle from '../../Style/ImageStyle';
import {SponsorBannerType} from '../../Entity/SponsorBanner';
import SponsorBannerPage from '../Banner/SponsorBannerPage';
import ProductItemSubCategoryListPage from '../Subcategory/ProductItemSubCategoryListPage';
import ProductItemHorizentalShowCasePage from '../ProductItem/ProductItemHorizentalShowCasePage';
import BrandListPage from '../Brand/BrandListPage';
import ViewStyle from '../../Style/ViewStyle';
import TextStyle from '../../Style/TextStyle';
import CardStyle from '../../Style/CardStyle';

export class AppShowCaseViewModel extends BaseViewModel {
  AppShowCaseSettingList: AppShowCaseSetting[] = [];
  searchTerm: string = '';
  ProductItemCategoryId: string = '';
  VendorId: string = '';
  CategoryName: string = '';
}
export default class AppShowcasePage extends BaseComponent<
  any,
  AppShowCaseViewModel
> {
  public static RouteName() {
    return 'SplashPage';
  }
  constructor(props) {
    super(props);
    var model = new AppShowCaseViewModel();
    model.ProductItemCategoryId = this.props.route?.params?.ProductItemCategoryId;
    model.VendorId = this.props.route?.params?.VendorId;
    model.CategoryName = this.props.route?.params?.CategoryName;
    console.log(model.ProductItemCategoryId);
    this.state = new BaseState(model);
  }

  onBackPress(): boolean {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  }

  componentDidMount() {
    this.LoadAppShowCaseSettingList();
  }

  LoadAppShowCaseSettingList = async () => {
    var model = this.state.Model;
    var rModel = new AppShowcaseRequestEntity();
    rModel.VendorId = model.VendorId;
    rModel.ProductItemCategoryId = model.ProductItemCategoryId;
    console.log(rModel);
    this.ShowPageLoader(true);
    var res = await AppShowCaseSettingDataAccess.GetAll(rModel);
    this.ShowPageLoader(false);
    this.ProcessResponseData(res, false);
    // console.log(res)
    if (!res.IsSuccess) {
      return;
    }

    model.AppShowCaseSettingList = res.Data as AppShowCaseSetting[];
    // console.log( model.AppShowCaseSettingList);
    SessionHelper.SetAppShowcaseData(model.AppShowCaseSettingList);
    this.UpdateViewModel();
  };

  // componentDidCatch(error, info){
  //     //alert(JSON.stringify(error))
  //     //alert(JSON.stringify(info))
  //     console.log(error)
  //     console.log(info)
  // }

  render() {
    var model = this.state.Model;
    return (
      <Container>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={BaseColor.HeaderColor}
          translucent={true}
        />
        <ImageBackground
          source={require('../../assets/pages-08.jpg')}
          style={ImageStyle.BackgroundImage}>
          <Animatable.View
            animation="fadeInDownBig"
            direction="alternate"
            useNativeDriver={true}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ShowcaseSearchPage')
              }>
              <Card>
                <CardItem style={CardStyle.SearchCard}>
                  <Icon name="search" style={{margin: 10}} />
                  <Text>Search products</Text>
                </CardItem>
              </Card>
            </TouchableOpacity>
          </Animatable.View>

          <View style={{flex: 1, marginStart: 12, marginEnd: 12}}>
            <FlatList
              keyExtractor={(item) => item.AppShowCaseSettingId}
              data={model.AppShowCaseSettingList}
              extraData={model.IsPageLoading}
              scrollEnabled={true}
              refreshControl={
                <RefreshControl
                  refreshing={model.IsPageLoading}
                  onRefresh={this.LoadAppShowCaseSettingList}
                />
              }
              renderItem={({item}) => {
                var i = item as AppShowCaseSetting;
                console.log(i?.Type);
                switch (i.Type) {
                  case AppShowcaseType.CategoryAndVendorWiseBrand:
                    return (
                      <View>
                        <ImageBackgroundX text="Shop By Brand" />
                        {/* <Text>BrandListPage</Text> */}
                        <BrandListPage
                          Brands={i.Brands}
                          ShowViewAll={true}
                          {...this.props}
                        />
                        <View style={ViewStyle.gapOnCategoryView} />
                      </View>
                    );
                  case AppShowcaseType.CategoryVendorWiseProductItem:
                    return (
                      <View>
                        <ImageBackgroundX
                          text={model.CategoryName + ' ' + 'Products'}
                        />
                        {/* <Text>ProductItemHorizentalShowCasePage</Text> */}
                        <ProductItemHorizentalShowCasePage
                          {...this.props}
                          ProductItemList={
                            i.ProductItems
                          }></ProductItemHorizentalShowCasePage>
                        <View style={ViewStyle.gapOnCategoryView} />
                      </View>
                    );
                  case AppShowcaseType.HeaderBanner:
                    return (
                      <View>
                        <SponsorBannerPage
                          BannerType={SponsorBannerType.Header}
                          BannerList={i.Banners}
                          {...this.props}
                        />
                        <View style={ViewStyle.gapOnCategoryView} />
                      </View>
                    );
                  case AppShowcaseType.MarketingBanner:
                    return (
                      <View>
                        <SponsorBannerPage
                          BannerType={SponsorBannerType.Marketing}
                          BannerList={i.Banners}
                          {...this.props}
                        />
                        {/* <Text>SponsorBannerPage Marketing</Text> */}
                        <View style={ViewStyle.gapOnCategoryView} />
                      </View>
                    );
                  case AppShowcaseType.CategoryAndVendorWiseSubCategory:
                    return (
                      <View>
                        <ImageBackgroundX text={model.CategoryName} />
                        {/* <Text>ProductItemCategoryListPage</Text> */}
                        <ProductItemSubCategoryListPage
                          SubCategoryList={i.ProductSubCategories}
                          SellerID={model.VendorId}
                          {...this.props}
                        />

                        <View style={ViewStyle.gapOnCategoryView} />
                      </View>
                    );

                  default:
                    return <></>;
                }
              }}
            />
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const ImageBackgroundX = (props) => {
  const {text} = props;
  const image = require('../../assets/pages-08.jpg');
  return (
    <ImageBackground
      source={image}
      style={ImageStyle.AppshowcaseImagebackground}>
      <Text style={TextStyle.AppShowcaseImageText}>{text}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
