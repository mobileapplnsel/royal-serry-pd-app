import React from 'react';
import {
  View,

  ImageBackground,
  RefreshControl,
  FlatList,
  StyleSheet
} from 'react-native';

// import Icon from 'react-native-vector-icons/AntDesign';
import {
  Button,
  Picker,
  Footer,
  FooterTab,
  Container,
  ListItem,
  Content,
  Form,
  Body,
  Left,
  Text,
  Icon,
  // Icon,
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
import { EmptyCollectionPage } from '../../Control/EmptyCollectionPage';
import EntityHelperService from '../../../Service/EntityHelperService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const data = [
  {
    InvoiceNo:'1234',
    AreaDetails: 'Kolkata',
    StreetDetails: 'Shib chandra Street',
    Pincode: '711202',
  },
  {
    InvoiceNo:'1234',
    AreaDetails: 'Kolkata',
    StreetDetails: 'Shib chandra Street',
    Pincode: '711202',
  },
  {
    InvoiceNo:'1234',
    AreaDetails: 'Kolkata',
    StreetDetails: 'Shib chandra Street',
    Pincode: '711202',
  },]
export default class AllOrderHistoryViewModel extends BaseViewModel{
}
export  class AllOrderHistoryPage extends BaseComponent<
  any,
  AllOrderHistoryViewModel
> {
  constructor(props: any) {
    super(props);
    this.state = new BaseState(new AllOrderHistoryViewModel());
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

  render() {
    var model = this.state.Model;
   
    //var HouseNo = model.CustomerAddress.map((i) => i.HouseNo)
    return (
      <Container>
        <FlatList
          data={data}
          extraData={model.IsPageLoading}
          keyExtractor={(item) => item.InvoiceNo}
          scrollEnabled={true}
          ListEmptyComponent={
            <EmptyCollectionPage
              IsLoading={model.IsPageLoading}
              EmptyText="No order right now"
            />
          }
         
          renderItem={({item}) => {
            var i = item;
            return (
              <ListItem avatar iconLeft>
                <Left>
                  <MaterialCommunityIcons name="clock-check" style={styles.Icon} />
                </Left>
                <Body>
                  <Text>{i.InvoiceNo}</Text>
                  <Text note>
                    {i.AreaDetails}
                    {i.StreetDetails},
                    {i.Pincode}
                  </Text>
                  {/* <Text note>
                    {'Assigned : '}
                    {EntityHelperService.ToDdMmmYyyyHhMmSs(i.MappingDate)}
                  </Text> */}
                  {/* <ListItem noBorder>
                    <Button
                      success
                      style={{height: 40, borderRadius: 5, marginEnd: 10}}
                      // onPress={() =>
                      //   this.HandleAcceptRejectOrder(
                      //     i.OrderDeliveryBoyMappingId,
                      //     true,
                      //   )
                      // }
                      >
                      <Text>Accept</Text>
                    </Button>
                    <Button
                      danger
                      style={{height: 40, borderRadius: 5, marginEnd: 50}}
                      // onPress={() =>
                      //   this.HandleAcceptRejectOrder(
                      //     i.OrderDeliveryBoyMappingId,
                      //     false,
                      //   )
                      // }
                      >
                      <Text>Reject</Text>
                    </Button>
                  </ListItem> */}
                </Body>
              </ListItem>
            );
          }}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  Icon: {
    fontSize: 60,
    alignSelf: 'center',
    color: BaseColor.HeaderColor,
  },
});