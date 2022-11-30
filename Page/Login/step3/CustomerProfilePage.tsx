import React from 'react';
import {
  View,
  Text,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
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



import {CustomerLoginViewModelBase, FromPageToLogin} from '../CustomerLoginViewModel';
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
export default class CustomerProfileViewModel extends CustomerLoginViewModelBase{
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
  
}
export  class CustomerProfilePage extends BaseComponent<
  any,
  CustomerProfileViewModel
> {
  constructor(props: any) {
    super(props);
    this.state = new BaseState(new CustomerProfileViewModel());
    this.state.Model.OTPId = props.route.params.OTPId;
    this.state.Model.CustomerId = props.route.params.CustomerId;
    this.state.Model.FromPage = props.route.params.FromPage;
  }
  componentDidMount() {
    this.LoadCityList();
  }

  LoadCityList = async () => {
    var model = this.state.Model;
    this.ShowPageLoader(true);
    var res = await CityDataAccess.GetAll(model);
    this.ShowPageLoader(false);
    this.ProcessResponseData(res, false);
    if (!res.IsSuccess) {
      return;
    }
  
      model.CityList = res.Data as City[];
      this.UpdateViewModel();
    }
  SaveData = async () => {
    var model = this.state.Model;
    var newCustomer = new CustomerProfileRequestEntity();

    newCustomer.CustomerId = model.CustomerId;
    newCustomer.FirstName = model.FirstName;
    newCustomer.LastName = model.LastName;
    newCustomer.Email = model.Email;
    newCustomer.IsSubscribedNotification = true;
    newCustomer.OTPId = model.OTPId;

    var newAddress = new CustomerAddressRequestEntity();
    newAddress.AddressType = CustomerAddressType.Home;
    newAddress.ApartmentName = model.ApartmentName;
    newAddress.HouseNo = model.HouseNo;
    newAddress.AreaDetails = model.AreaDetails;
    newAddress.CityId = model.CityId;
    newAddress.Landmark = model.Landmark;
    newAddress.StreetDetails = model.StreetDetails;
    newAddress.Pincode = model.Pincode;
    newAddress.LocationLatitude = 0;
    newAddress.LocationLongitude = 0;

    newCustomer.CustomerAddresses.push(newAddress);

  

      this.ShowPageLoader(true);
      var res = await CustomerDataAccess.Create(newCustomer);
      this.ShowPageLoader(false);
      this.ProcessResponseData(res, false);
      if (!res.IsSuccess) {
        return;
      }
      SessionHelper.SetSession(res.Data as Customer);
      //
      switch (model.FromPage) {
        case FromPageToLogin.Drawer:
          this.props.navigation.navigate({name: 'AppShowCase'});
          break;
        case FromPageToLogin.Order:
          this.props.navigation.navigate({name: 'Cart'});
          break;
      }
    }

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
        <CustomModalIndicator IsLoading={model.IsPageLoading} />

        <Content>
          
          <ListItem style={AppStyles.HeaderCardStyle} itemDivider>
            <Text style={AppStyles.HeaderCardTxt}>Personal Details</Text>
          </ListItem>
          <Form>
            <CustomInput
              Name="FirstName"
              LabelText="FirstName"
              OnChangeText={this.SetModelValueX}
              value={model.FirstName}
              IsRequired={true}
            />
            <CustomInput
              Name="LastName"
              LabelText="LastName"
              OnChangeText={this.SetModelValueX}
              value={model.LastName}
              IsRequired={true}
            />
            <CustomInput
              Name="Email"
              LabelText="Email"
              OnChangeText={this.SetModelValueX}
              value={model.Email} 
              Last
            />
            <ListItem style={AppStyles.HeaderCardStyle} itemDivider>
              <Text style={AppStyles.HeaderCardTxt}>Address Details</Text>
            </ListItem>
            <CustomInput
              Name="HouseNo"
              LabelText="HouseNo"
              OnChangeText={this.SetModelValueX}
              value={model.HouseNo}
              IsRequired={true}
            />
            <CustomInput
               LabelText="ApartmentName"
              Name="ApartmentName"
              OnChangeText={this.SetModelValueX}
              value={model.ApartmentName}
              
            />
            <CustomInput
             LabelText="StreetDetails"
              Name="StreetDetails"
              OnChangeText={this.SetModelValueX}
              value={model.StreetDetails}
              
            />
            <CustomInput
            LabelText="AreaDetails"
              Name="AreaDetails"
              OnChangeText={this.SetModelValueX}
              value={model.AreaDetails}
              IsRequired={true}
            />           
            <CustomInput
              Name="Landmark"
              LabelText="Landmark"
              OnChangeText={this.SetModelValueX}
              value={model.Landmark}
              IsRequired={true}
            />
             <CustomPicker
              Name="CityId"
              LabelText="City"
              selectedValue={model.CityId}
              onValueChange={this.SetModelValueX}
              IsRequired={true}
              IsNullable={true}
              Data={cityList}
            />
            <CustomInput
              Name="Pincode"
              LabelText="Pincode"
              OnChangeText={this.SetModelValueX}
              value={model.Pincode}
              IsRequired={true}
              Last
            />
          </Form>
        </Content>

        <Footer>
          <FooterTab style={{backgroundColor: BaseColor.ColorGreen}}>
            <Button onPress={this.SaveData} block style={{alignSelf: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="adduser"
                  size={17}
                  color={BaseColor.ColorWhite}
                  style={{marginEnd: 20}}
                />
                <Text style={{color: BaseColor.ColorWhite, fontWeight: 'bold'}}>
                  Register
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
