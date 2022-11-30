import React, { Component } from 'react';
import { TouchableOpacity, View, RefreshControl, ImageBackground } from 'react-native';

import { FlatGrid } from 'react-native-super-grid';



import * as Animatable from 'react-native-animatable';
import { CustomImage, CustomIndicator } from '../../Control/Index';

import { Text } from 'native-base';
import BaseViewModel from '../../Core/BaseViewModel';
import BaseComponent from '../../Core/BaseComponent';
import BaseState from '../../Core/BaseState';
import BaseColor from '../../Core/BaseTheme';
import { Brand } from '../../Entity/Brand';
import ImageStyle from '../../Style/ImageStyle';

export class BrandListViewModel extends BaseViewModel {
  BrandList: Brand[] = [];
  ShowViewAll?: boolean;
}


export default class BrandListPage extends BaseComponent<any, BrandListViewModel>{
  constructor(props: any) {
    super(props);
     
    this.state = new BaseState(new BrandListViewModel());
    this.state.Model.BrandList = props.Brands || [];
    this.state.Model.ShowViewAll = props.ShowViewAll||false;
    this.state.Model.IsPageLoading=true;
    if(this.state.Model.ShowViewAll){
      
      var viewAllBrand:Brand=  {
        BrandId:"",
        Name:"View All"         
      }
      this.state.Model.BrandList=this.state.Model.BrandList.concat(viewAllBrand)
      this.state.Model.IsPageLoading=false;
    }
  }

  componentDidMount() {
    // if (!this.state.Model.BrandList?.length) { 
    //   this.LoadBrandList();
    // }
  }

  LoadBrandList = () => {
    // var model = this.state.Model;
    // BrandDataAccess.GetAll(model, (res: BaseResponse) => {
    //   this.ProcessResponseData(res, false)
    //   if (!res.IsSuccess) {
    //     return;
    //   }
    //   this.state.Model.BrandList = res.Data as Brand[];
    //   this.state.Model.IsPageLoading=false;
    //   this.UpdateViewModel();
    // });
  }

  HandleItemPressed=(item:Brand)=>{
    if(item.BrandId){
      this.props.navigation.navigate('ProductItemVerticalShowCasePage', {
        BrandId: item.BrandId
      });
    }
    else{
      this.props.navigation.navigate('BrandListPage');
    }
   
  }
  

  render() {
    var model = this.state.Model;
     
    return (
      <FlatGrid
        keyExtractor={item=>item.BrandId}
        itemDimension={100}
        data={model.BrandList}
        style={{ flex: 3 }}
        spacing={0}
        refreshControl={
          <RefreshControl
              refreshing={model.IsPageLoading}
              onRefresh={this.LoadBrandList}
          />}
        renderItem={({ item }) => (
         
            <TouchableOpacity onPress={() => this.HandleItemPressed(item)}>
       <ImageBackground
                                    source={require('../../assets/pages-08.jpg')}
                                    style={ImageStyle.BrandImage}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 10 }}>

                {
                  item.BrandId!=="" && 
                    <CustomImage
                    source={{ uri: item.Documents[0].DocumentUrl}}
                    style={{ width: '100%', height: '80%', alignSelf: 'center' }}
                   />
                }
                {
                  item.BrandId==="" && 
                  <Text style={{color:BaseColor.ColorGreen,alignContent:"center",alignSelf:"center"}} >{item.Name}</Text>
                }
               
              {/* </View> */}
              </ImageBackground>
            </TouchableOpacity>
           
        )}
      >
      </FlatGrid>
    );
  }
}