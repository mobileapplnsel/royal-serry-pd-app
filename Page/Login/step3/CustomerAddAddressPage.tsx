import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

import {
  Button,
  Picker,
  Footer,
  FooterTab,
  Container,
  Content,
  ListItem,
  Form,
} from 'native-base';

import {
  CustomInput,
  CustomModalIndicator,
  CustomPicker,
} from '../../../Control/Index';
import {AppStyles} from '../../../Style/Style';
import BaseViewModel from '../../../Core/BaseViewModel';
import {CustomerAddress, CustomerAddressType} from '../../../Entity/Customer';
import City from '../../../Entity/City';
import BaseComponent from '../../../Core/BaseComponent';
import BaseState from '../../../Core/BaseState';
import SessionHelper from '../../../Core/SessionHelper';
import CityDataAccess from '../../../DataAccess/CityDataAccess';
import CustomerDataAccess, {
  CustomerAddAddressRequestEntity,
} from '../../../DataAccess/CustomerDataAccess';
import BaseColor from '../../../Core/BaseTheme';
import ImageStyle from '../../../Style/ImageStyle';

export class CustomerAddAddressPageViewModel extends BaseViewModel {
  CustomerAddressId: string = '';
  AddressType: CustomerAddressType;
  HouseNo: string = '';
  ApartmentName: string = '';
  StreetDetails: string = '';
  Landmark: string = '';
  AreaDetails: string = '';
  Pincode: string = '';
  CityId: string = '';
  CityList: City[] = [];
  AddressTypeList: CustomerAddressType[] = [];
  ButtonText: string = 'Add';

  //
  refreshParent: any;
}

export default class CustomerAddAddressPage extends BaseComponent<
  any,
  CustomerAddAddressPageViewModel
> {
  constructor(props: any) {
    super(props);
    var model = new CustomerAddAddressPageViewModel();

    model.CustomerAddressId = this.props.route?.params?.CustomerAddressId;
    model.refreshParent = this.props.route?.params?.refreshParent;
    model.ButtonText = model.CustomerAddressId === undefined ? 'Add' : 'Update';
    model.AddressTypeList = Object.values(CustomerAddressType).map((i) => i);

    this.state = new BaseState(model);
  }
  async componentDidMount() {
    var model = this.state.Model;
    if (model.CustomerAddressId) {
      var customer = await SessionHelper.GetSession();
      var tempAddress = customer.CustomerAddresses.find(
        (i) => i.CustomerAddressId === model.CustomerAddressId,
      );

      model.AddressType = tempAddress.AddressType;
      model.ApartmentName = tempAddress.ApartmentName;
      model.AreaDetails = tempAddress.AreaDetails;
      model.CityId = tempAddress.CityId;
      model.CustomerAddressId = tempAddress.CustomerAddressId;
      model.HouseNo = tempAddress.HouseNo;
      model.Landmark = tempAddress.Landmark;
      model.Pincode = tempAddress.Pincode;
      model.StreetDetails = tempAddress.StreetDetails;

      model.IsPageLoading = false;
      this.UpdateViewModelUnknown(model);
    }
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
  };
  SaveData = async () => {
    var model = this.state.Model;

    if (!model.CityId) {
      this.ShowToastMesage('Please select city', 'danger', 5000);
      return;
    }

    var newAddress = new CustomerAddAddressRequestEntity();
    var customer = await SessionHelper.GetSession();

    newAddress.ApiToken = customer.ApiToken;
    newAddress.CustomerAddressId = model.CustomerAddressId;
    newAddress.CustomerId = customer.CustomerId;
    newAddress.AddressType = model.AddressType;
    newAddress.HouseNo = model.HouseNo;
    newAddress.ApartmentName = model.ApartmentName;
    newAddress.StreetDetails = model.StreetDetails;
    newAddress.Landmark = model.Landmark;
    newAddress.AreaDetails = model.AreaDetails;
    newAddress.Pincode = model.Pincode;
    newAddress.LocationLatitude = 0;
    newAddress.LocationLongitude = 0;
    newAddress.CityId = model.CityId;

    console.log('request', newAddress);

    var res = await CustomerDataAccess.NewAddressForExistingCostomer(
      newAddress,
    );
    this.ShowPageLoader(false);
    this.ProcessResponseData(res, false);
    console.log('Responce', res);
    if (!res.IsSuccess) {
      return;
    }
    var value = res.Data as CustomerAddress;
    //alert(value.AddressType)

    var user = await SessionHelper.GetSession();
    var existingAddress = user.CustomerAddresses.findIndex(
      (i) => i.CustomerAddressId === value.CustomerAddressId,
    );
    if (existingAddress === -1) {
      user.CustomerAddresses = user.CustomerAddresses.concat(value);
    } else {
      user.CustomerAddresses[existingAddress] = value;
    }
    SessionHelper.SetSession(user);
    //refreshing parent data
    model.refreshParent && model.refreshParent();
    //
    this.props.navigation.goBack();
  };
  render() {
    var model = this.state.Model;
    var cityList = model.CityList.map((i, k) => {
      return <Picker.Item label={i.Name} key={k} value={i.CityId} />;
    });
    var AddressList = model.AddressTypeList.map((i, k) => {
      return <Picker.Item label={i} key={k} value={i} />;
    });
    //cityList.push(<Picker.Item label="City" key={-1} value={""} />)
    return (
      <Container>
          <ImageBackground
          source={require('../../../assets/pages-10.jpg')}
          style={ImageStyle.BackgroundImage}>
        <CustomModalIndicator IsLoading={model.IsPageLoading} />

        <ListItem style={AppStyles.HeaderCardStyle} itemDivider>
          <Text style={AppStyles.HeaderCardTxt}>Address Details</Text>
        </ListItem>
        <Content>
          <Form>
            <CustomInput
              Name="HouseNo"
              LabelText="HouseNo"
              OnChangeText={this.SetModelValueX}
              value={model.HouseNo}
              IsRequired={true}
            />
            <CustomInput
              Name="ApartmentName"
              LabelText="ApartmentName"
              OnChangeText={this.SetModelValueX}
              value={model.ApartmentName}
              IsRequired={true}
            />
            <CustomInput
              Name="StreetDetails"
              LabelText="StreetDetails"
              OnChangeText={this.SetModelValueX}
              value={model.StreetDetails}
              IsRequired={true}
            />
            <CustomInput
              Name="AreaDetails"
              LabelText="AreaDetails"
              OnChangeText={this.SetModelValueX}
              value={model.AreaDetails}
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
              Name="Landmark"
              LabelText="Landmark"
              OnChangeText={this.SetModelValueX}
              value={model.Landmark}
              IsRequired={true}
            />
            <CustomInput
              Name="Pincode"
              LabelText="Pincode"
              OnChangeText={this.SetModelValueX}
              value={model.Pincode}
              IsRequired={true}
            />
            <CustomPicker
              Name="AddressType"
              LabelText="Address Type"
              selectedValue={model.AddressType}
              onValueChange={this.SetModelValueX}
              IsRequired={true}
              IsNullable={true}
              Data={AddressList}
            />
          </Form>
        </Content>

        <Footer>
          <FooterTab style={{backgroundColor: BaseColor.HeaderColor}}>
            <Button onPress={this.SaveData} block style={{alignSelf: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: BaseColor.ColorWhite, fontWeight: 'bold'}}>
                  {model.ButtonText}
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
