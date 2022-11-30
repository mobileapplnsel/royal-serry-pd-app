import React from 'react';
import {
  View,
  Text,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  Picker,
  Footer,
  FooterTab,
  Container,
  ListItem,
  Content,
  Form,
} from 'native-base';
// import {
//   CustomerProfileRequestEntity,
//   CustomerAddressRequestEntity,
// } from './CustomerProfileRequestEntity';




// import CityDataAccess from '../../../../DataAccess/CityDataAccess';

import {AppStyles} from '../../../Style/Style';
import BaseComponent from '../../../Core/BaseComponent';
import BaseState from '../../../Core/BaseState';
import City from '../../../Entity/City';
import Customer, { CustomerAddressType } from '../../../Entity/Customer';
import CustomInput from '../../../Control/CustomInput';
import CustomPicker from '../../../Control/CustomPicker';
import CustomModalIndicator from '../../../Control/CustomModalIndicator';
import BaseColor from '../../../Core/BaseTheme';
import SessionHelper from '../../../Core/SessionHelper';
import CustomerDataAccess, { CustomerAddressRequestEntity, CustomerProfileRequestEntity } from '../../../DataAccess/CustomerDataAccess';
import CityDataAccess from '../../../DataAccess/CityDataAccess';
import ImageStyle from '../../../Style/ImageStyle';
import { CustomerLoginViewModelBase } from '../../Login/CustomerLoginViewModel';
import BaseViewModel from '../../../Core/BaseViewModel';
import CutomFileUploader from '../../../Control/CutomFileUploader';
import DocumentPicker from 'react-native-document-picker';
import RNFile from '../../../Core/RNFile';
import CustomDatePicker, { DateTimeType } from '../../../Control/CustomDatePicker';
import TextStyle from '../../../Style/TextStyle';
export default class StockEntryViewModel extends BaseViewModel{
  OTPId:string;
  CustomerId:string;
  FirstName:string="";
  LastName:string="";
  Email:string="";
  HouseNo: string="";
  ApartmentName: string="";
  StreetDetails: string="";
  Landmark: string="";
  AreaDetails: string="";
  Pincode: string="";
  CityId:string="";

  //navigational properties
  CityList:City[]=[];
  Files: RNFile[] = [];
  MeterOpeningDateTime?: Date;
  
}
export  class StockEntryPage extends BaseComponent<
  any,
  StockEntryViewModel
> {
  constructor(props: any) {
    super(props);
    this.state = new BaseState(new StockEntryViewModel());
    // this.state.Model.OTPId = props.route.params.OTPId;
    // this.state.Model.CustomerId = props.route.params.CustomerId;
    // this.state.Model.FromPage = props.route.params.FromPage;
  }
  componentDidMount() {
    // this.LoadCityList();
  }

//   LoadCityList = async () => {
//     var model = this.state.Model;
//     this.ShowPageLoader(true);
//     var res = await CityDataAccess.GetAll(model);
//     this.ShowPageLoader(false);
//     this.ProcessResponseData(res, false);
//     if (!res.IsSuccess) {
//       return;
//     }
  
//       model.CityList = res.Data as City[];
//       this.UpdateViewModel();
//     }
//   SaveData = async () => {
//     var model = this.state.Model;
//     var newCustomer = new CustomerProfileRequestEntity();

//     newCustomer.CustomerId = model.CustomerId;
//     newCustomer.FirstName = model.FirstName;
//     newCustomer.LastName = model.LastName;
//     newCustomer.Email = model.Email;
//     newCustomer.IsSubscribedNotification = true;
//     newCustomer.OTPId = model.OTPId;

//     var newAddress = new CustomerAddressRequestEntity();
//     newAddress.AddressType = CustomerAddressType.Home;
//     newAddress.ApartmentName = model.ApartmentName;
//     newAddress.HouseNo = model.HouseNo;
//     newAddress.AreaDetails = model.AreaDetails;
//     newAddress.CityId = model.CityId;
//     newAddress.Landmark = model.Landmark;
//     newAddress.StreetDetails = model.StreetDetails;
//     newAddress.Pincode = model.Pincode;
//     newAddress.LocationLatitude = 0;
//     newAddress.LocationLongitude = 0;

//     newCustomer.CustomerAddresses.push(newAddress);

  

//       this.ShowPageLoader(true);
//       var res = await CustomerDataAccess.Create(newCustomer);
//       this.ShowPageLoader(false);
//       this.ProcessResponseData(res, false);
//       if (!res.IsSuccess) {
//         return;
//       }
//       SessionHelper.SetSession(res.Data as Customer);
//       //
//       switch (model.FromPage) {
//         case FromPageToLogin.Drawer:
//           this.props.navigation.navigate({name: 'AppShowCase'});
//           break;
//         case FromPageToLogin.Order:
//           this.props.navigation.navigate({name: 'Cart'});
//           break;
//       }
//     }
HandlePickDocument = async (res: RNFile[]) => {
  var model = this.state.Model;
console.log(res);
  model.Files = res.map((i) => { return {uri:i.uri,type:i.type,name:i.name} });
  // model.Files = res.map(i => new RNFile(i.uri, i.type, i.name))
  console.log(model.Files);
  this.UpdateViewModel();

};
  render() {
    var model = this.state.Model;
    var cityList = model.CityList.map((i, k) => {
      return <Picker.Item label={i.Name} key={k} value={i.CityId} />;
    });
    //var HouseNo = model.CustomerAddress.map((i) => i.HouseNo)
    return (
      <Container>
         <ImageBackground
          source={require('../../../assets/pages-10.jpg')}
          style={ImageStyle.BackgroundImage}>
        {/* <CustomModalIndicator IsLoading={model.IsPageLoading} /> */}

        <Content>
          
          <ListItem style={AppStyles.HeaderCardStyle} itemDivider>
            <Text style={AppStyles.HeaderCardTxt}>Add Stock</Text>
          </ListItem>
          <Form>
          <CustomPicker
              Name="CityId"
              LabelText="Store"
              selectedValue={model.CityId}
              onValueChange={this.SetModelValueX}
              IsRequired={true}
              IsNullable={true}
              Data={cityList}
            />
              {/* <Text style={TextStyle.HeadText}>Invoice Date</Text> */}
                <CustomDatePicker
                  Name="InvoiceDate"
                  onDateChange={this.SetModelValueX}
                  Mode={DateTimeType.datetime}
                  IsRequired={true}
                  value={model.MeterOpeningDateTime}

                
                />
       
             <CustomPicker
              Name="CityId"
              LabelText="Category"
              selectedValue={model.CityId}
              onValueChange={this.SetModelValueX}
              IsRequired={true}
              IsNullable={true}
              Data={cityList}
            />
               <CustomPicker
              Name="CityId"
              LabelText="Sub-Category"
              selectedValue={model.CityId}
              onValueChange={this.SetModelValueX}
              IsRequired={true}
              IsNullable={true}
              Data={cityList}
            />
           <CustomPicker
              Name="CityId"
              LabelText="Product"
              selectedValue={model.CityId}
              onValueChange={this.SetModelValueX}
              IsRequired={true}
              IsNullable={true}
              Data={cityList}
            />
         
         
            <CustomInput
             LabelText="Short Description"
              Name="Short Description"
              OnChangeText={this.SetModelValueX}
              value={model.StreetDetails}
              
            />
            <CustomInput
            LabelText="Quantity"
              Name="Description"
              OnChangeText={this.SetModelValueX}
              value={model.AreaDetails}
              IsRequired={true}
            />           
            <CustomInput
            LabelText="Purchase Price"
              Name="Description"
              OnChangeText={this.SetModelValueX}
              value={model.AreaDetails}
              IsRequired={true}
            />      
          </Form>
        </Content>

        <Footer>
          <FooterTab style={{backgroundColor: BaseColor.ColorGreen}}>
            <Button 
            // onPress={this.SaveData}
             block style={{alignSelf: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="cart-arrow-down"
                  size={17}
                  color={BaseColor.ColorWhite}
                  style={{marginEnd: 20}}
                />
                <Text style={{color: BaseColor.ColorWhite, fontWeight: 'bold'}}>
                Stock Entry
                </Text>
              </View>
            </Button>
          </FooterTab>
        </Footer>
        </ImageBackground>
      </Container>
    );
  }
}
