import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import {FlatGrid} from 'react-native-super-grid';

import {CustomImage} from '../../Control/Index';

import {EmptyCollectionPage} from '../../Control/EmptyCollectionPage';
import BaseComponent from '../../Core/BaseComponent';
import BaseViewModel from '../../Core/BaseViewModel';
import BaseState from '../../Core/BaseState';

import BaseColor from '../../Core/BaseTheme';
import ImageStyle from '../../Style/ImageStyle';
import ViewStyle from '../../Style/ViewStyle';
import TextStyle from '../../Style/TextStyle';
import { ProductSubCategories } from '../../Entity/ProductSubCategories';

export class ProductItemSubCategoryViewModel extends BaseViewModel {
  ProductSubCategoryList: ProductSubCategories [] = [];
  SellerID: String = '';
}

export default class ProductItemSubCategoryListPage extends BaseComponent<
  any,
  ProductItemSubCategoryViewModel
> {
  constructor(props: any) {
    super(props);

    this.state = new BaseState(new ProductItemSubCategoryViewModel());
    this.state.Model.SellerID = props.SellerID;
    this.state.Model.ProductSubCategoryList = props.SubCategoryList || [];
    console.log('AAA', this.state.Model.SellerID);
  }
  componentDidMount() {
    if (!this.state.Model.ProductSubCategoryList) {
      this.LoadProductItemCategoryList();
    }
  }

  LoadProductItemCategoryList = () => {
    var model = this.state.Model;
    // ProductItemCategoryDataAccess.GetAll(model, (res: BaseResponse) => {
    //   this.ProcessResponseData(res, false);
    //   if (!res.IsSuccess) {
    //     return;
    //   }

    //   this.state.Model.ProductItemCategoryList = res.Data as ProductItemCategory[];
    //   this.UpdateViewModel();
    // });
  };

  render() {
    var model = this.state.Model;
    console.log('Hello', model.ProductSubCategoryList);
    return (
      <FlatGrid
        itemDimension={150}
        keyExtractor={(item) => item.ProductItemCategoryId}
        data={model.ProductSubCategoryList}
        style={{flex: 1}}
        spacing={0}
        renderItem={({item}) => (
          <ImageBackground
            source={require('../../assets/pages-08.jpg')}
            style={ImageStyle.SubCategoryBackgroundImage}
            resizeMode="cover"
            imageStyle={{borderRadius: 10}}>
            <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(
                        'ProductItemVerticalShowCasePage',
                        {
                          ProductItemSubcategoryId:
                            item.ProductItemSubcategoryId,
                            SellerID: model.SellerID,
                        },
                      );
                    }}>
            <CustomImage
              source={{uri: item.Documents[0].DocumentUrl}}
              style={{width: 150, height: 100, alignSelf: 'center'}}
            />
            <SafeAreaView style={ViewStyle.SubcategorySafeArea}>
              <Text style={TextStyle.SubcategoryText}>{item.Name}</Text>
            </SafeAreaView>
            </TouchableOpacity>
          </ImageBackground>
        )}></FlatGrid>
    );
  }
}
