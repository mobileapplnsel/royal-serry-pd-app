import React from 'react';
import { SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { CustomImage } from '../../Control/Index';
import { SliderBox } from "react-native-image-slider-box";
import { View } from 'native-base';
import BaseViewModel from '../../Core/BaseViewModel';
import SponsorBanner, { SponsorBannerType } from '../../Entity/SponsorBanner';
import BaseComponent from '../../Core/BaseComponent';
import BaseState from '../../Core/BaseState';
import BaseResponse from '../../Core/BaseResponse';
import SponsorBannerDataAccess from '../../DataAccess/SponsorBannerDataAccess';

 


export class SponsorBannerPageViewModel extends BaseViewModel {
  SponsorBannerType: SponsorBannerType;
  SponsorBannerList: SponsorBanner[] = [];
  height?: any;
  width?:any;
}

export default class SponsorBannerPage extends BaseComponent<any, SponsorBannerPageViewModel>{
  
  constructor(props: any) {
    super(props);
    const { BannerType, BannerList } = props;
    this.state = new BaseState(new SponsorBannerPageViewModel());
    this.state.Model.SponsorBannerType=BannerType;
    this.state.Model.SponsorBannerList = BannerList || [];
     
  }

  componentDidMount() {
    //if no data coming from props
    if(!this.state.Model.SponsorBannerList){
      this.LoadSponsorBannerImageList();
    }
    
  }


  LoadSponsorBannerImageList = () => {
    var model = this.state.Model;
    SponsorBannerDataAccess.GetAll((res: BaseResponse) => {
      this.ProcessResponseData(res,false) //checks the response of is true or not
      if (!res.IsSuccess) {
        return ;
      }
      model.SponsorBannerList = res.Data as SponsorBanner[];
      console.log(model.SponsorBannerList);
      this.UpdateViewModel();
    });
  }

  onLayout = e => {
    var model= this.state.Model;
    model.width= e.nativeEvent.layout.width; 
    var ratio = (model.SponsorBannerType === SponsorBannerType.Header) ? 0.6 : 0.2;     
    model.height = model.width * ratio;
    this.UpdateViewModel();
  };

  render() {
    var model = this.state.Model;

    var ImageList: string[] = [];     
    model.SponsorBannerList.filter((i) => i.Type === model.SponsorBannerType)
                          .forEach(i => i.Documents
                          .forEach(k => ImageList.push(k.DocumentUrl))) 

    return (
      <View style={{ flex: 1}} onLayout={this.onLayout}>
        <SliderBox  
          ImageComponent={CustomImage}
          images={ImageList}
          sliderBoxHeight={model.height}  
          parentWidth={model.width}       
          autoplay
          circleLoop
        />
      </View>
    );
  }
}

