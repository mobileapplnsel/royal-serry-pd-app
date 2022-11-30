import React, {Component, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  TouchableHighlight,
  Switch,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import BaseColor from '../../assets';
import {
  Text,
  Button,
  Item,
  Input,
  Label,
  Card,
  Container,
  Content,
  Footer,
  FooterTab,
  CardItem,
  Toast,
  ListItem,
  Body,
} from 'native-base';

import {FlatGrid} from 'react-native-super-grid';

import * as Animatable from 'react-native-animatable';
import {Value} from 'react-native-reanimated';
import BaseViewModel from '../../Core/BaseViewModel';
import {BaseComponent, BaseResponse, BaseState} from '../../Core/Index';
import BaseColor from '../../Core/BaseTheme';

import ViewStyle from '../../Style/ViewStyle';
import Icon8 from 'react-native-vector-icons/MaterialCommunityIcons';
import TextStyle from '../../Style/TextStyle';
import ImageStyle from '../../Style/ImageStyle';
import {transform} from '@babel/core';
import CustomImage from '../../Control/CustomImage';
import CategoryDataAccess from '../../DataAccess/CategoryDataAccess';
import {ProductItemCategory} from '../../Entity/ProductItemCategory';
import CustomIndicator from '../../Control/CustomIndicator';
import CustomModalIndicator from '../../Control/CustomModalIndicator';

export class CategoryViewModel extends BaseViewModel {
  ProductItemCategoryList: ProductItemCategory[] = [];
}

export default class CategoryPage extends BaseComponent<
  any,
  CategoryViewModel
> {
  constructor(props) {
    super(props);

    var model = new CategoryViewModel();

    this.state = new BaseState(model);
  }
  componentDidMount() {
    this.LoadProductItemCategoryList();
  }

  LoadProductItemCategoryList = async () => {
    var model = this.state.Model;
    this.ShowPageLoader(true);
    var res = await CategoryDataAccess.GetAll(model);
    this.ShowPageLoader(false);
    this.ProcessResponseData(res, false);
    if (!res.IsSuccess) {
      return;
    }

    model.ProductItemCategoryList = res.Data as ProductItemCategory[];
    console.log('AAA', model.ProductItemCategoryList);

    this.UpdateViewModel();
  };

  render() {
    var model = this.state.Model;
    return (
      <Container>
        <StatusBar
          barStyle="dark-content"
          hidden={true}
          backgroundColor={BaseColor.ColorWhite}
          translucent={true}
        />
        <CustomModalIndicator
          IsLoading={model.IsPageLoading}></CustomModalIndicator>
        <ImageBackground
          source={require('../../assets/pages-08.jpg')}
          style={ImageStyle.BackgroundImage}>
          {/* <ImageBackground
                                    source={require('../../assets/pages-08.jpg')}
                                    style={ViewStyle.categoryHeading}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 10 }}>
                                        <Text style={{fontFamily: "Cochin",fontWeight:'bold'}}>
                                           Choose  a  Category
                                            </Text>
                                        </ImageBackground> */}
          <SafeAreaView style={ViewStyle.categoryHeading}>
            <Text style={TextStyle.ChooseSellerTxt}>Choose a Category</Text>
          </SafeAreaView>

          <FlatGrid
            data={model.ProductItemCategoryList}
            style={ViewStyle.gridView}
            // staticDimension={300}
            // fixed
            itemDimension={80}
            spacing={20}
            renderItem={({item}) => {
              return (
                <ImageBackground
                  source={require('../../assets/pages-08.jpg')}
                  style={ViewStyle.DashboarditemContainer}
                  resizeMode="cover"
                  imageStyle={{borderRadius: 10}}>
                  {/* <View style={ViewStyle.DashboarditemContainer} > */}
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('SellerSelectionPage', {
                        ProductItemCategoryId: item.ProductItemCategoryId,
                        CategoryName: item.Name,
                      })
                    }>
                    <CustomImage
                      source={{uri: item.Documents[0].DocumentUrl}}
                      // style={{ width: '130%', height: '80%', alignSelf: 'center' }}
                      style={ImageStyle.CategoryImage}
                    />

                    <Text style={TextStyle.DashboarditemName}>{item.Name}</Text>
                  </TouchableOpacity>
                  {/* </View> */}
                </ImageBackground>
              );
            }}
          />
        </ImageBackground>
      </Container>
    );
  }
}
