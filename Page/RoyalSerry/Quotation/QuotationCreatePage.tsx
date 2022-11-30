import React from 'react';
import {
  View,
  StatusBar,
  Switch,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Text,
  Button,
  ListItem,
  Body,
  Left,
  Footer,
  FooterTab,
  Right,
  ActionSheet,
  Card,
  CardItem,
  Icon as NativeBaseIcon,
  Thumbnail,
  Content,
  Container,
  Icon,
  Picker,
  Radio,
} from 'native-base';

import {color} from 'react-native-reanimated';
import BaseViewModel from '../../../Core/BaseViewModel';
import BaseComponent from '../../../Core/BaseComponent';
import BaseState from '../../../Core/BaseState';
import CustomModalIndicator from '../../../Control/CustomModalIndicator';
import BaseColor from '../../../Core/BaseTheme';
import ViewStyle from '../../../Style/ViewStyle';
import CustomImage from '../../../Control/CustomImage';
import TextStyle from '../../../Style/TextStyle';
import {FlatGrid} from 'react-native-super-grid';
import {
  CustomInput,
  CustomPicker,
  EmptyCollectionPage,
} from '../../../Control/Index';
import Modal from 'react-native-modal';
import Axios from 'axios';
import {
  OrderDetail,
  OrderFromDetail,
  OrderItemDetail,
  OrderStatu,
  OrderToDetail,
  RoyalSerryOrderDetails,
} from '../../../Entity/RoyalSerryOrderDetails.';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LongCustomPicker from '../../../Control/LongCustomPicker';
import CustomCheckBox from '../../../Control/CustomCheckBox';
import {RoyalSerryItemCat} from '../../../Entity/RoyalSerryItemCat';
import Country from '../../../Entity/Country';
import Customer from '../../../Entity/Customer';
import SessionHelper from '../../../Core/SessionHelper';
import Quotion from '../../../Entity/Quotion';
import CustomerDetails from '../../../Entity/CustomerDetails';
import SearchableDropDown from '../../../Control/SearchableDropDown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const data = [
  {
    name: 'Document',
    Type: '1',
  },
  {
    name: 'Package',
    Type: '2',
  },
];
const Addresstype = [
  {
    name: 'Home Address',
    Type: '1',
  },
  {
    name: 'Business Address',
    Type: '2',
  },
];
const Locationtype = [
  {
    name: 'Domestic',
    Type: '1',
  },
  {
    name: 'International',
    Type: '2',
  },
];
const Shipmenttype = [
  {
    name: 'For Document',
    Type: '1',
  },
  {
    name: 'For Package',
    Type: '2',
  },
];
const speedtype = [
  {
    name: 'Normal',
    Type: 'Normal',
  },
  {
    name: 'Priority',
    Type: 'Priority',
  },
  {
    name: 'Standard',
    Type: 'Standard',
  },
  {
    name: 'Express',
    Type: 'Express',
  },
];
const Transporttype = [
  {
    name: 'By Road',
    Type: 'road',
  },
  {
    name: 'By Rail',
    Type: 'rail',
  },
  {
    name: 'By Air',
    Type: 'air',
  },
  {
    name: 'By Ship',
    Type: 'Ship',
  },
];
const ButtonArray = [
  {
    text: 'From Location',
    Type: '2',
  },
  {
    text: 'To Location',
    Type: '3',
  },
];
export interface Select {
  text: string;
  Type: string;
}
class WorkTypeDisplay {
  Display: string;
  Value: CustomerPaymentMode;
}
export enum CustomerPaymentMode {
  HomeAddress = '1',
  BusinessAddress = '2',
}
export interface deliverymode {
  id: string;
  name: string;
}
export class AddOrderItemViewModel extends BaseViewModel {
  deliverymodeList: deliverymode[] = [];
  shippingmodeList: deliverymode[] = [];

  Item: OrderItemDetail;
  loan?: boolean = false;
  type: string = '';
  CategoryList: RoyalSerryItemCat[] = [];
  SubCategoryList: RoyalSerryItemCat[] = [];
  ItemList: RoyalSerryItemCat[] = [];
  document_category: string = '';
  package_category: string = '';
  document_sub_cat: string = '';
  package_sub_cat: string = '';
  item_id: string = '';
  document_item: string = '';
  package_item: string = '';
  value_of_shipment_parcel_doc: string = '';
  other_details_document: string = '';
  protect_parcel_doc?: boolean;
  protect_parcel_pack?: boolean;
  additional_charge_comment: string = '';
  additional_charge: string = '';

  other_details_parcel: string = '';
  shipment_description_parcel: string = '';
  value_of_shipment_parcel_pack: string = '';
  referance_parcel: string = '';
  length: string = '';
  breadth: string = '';
  height: string = '';
  weight: string = '';
  shipment_id: string = '';
  quantity: string = '';
  Selected: Select;

  location_type: string = '';
  shipment_type_option: string = '';
  delivery_speed: string = '';
  charges_final: string = '';
  firstname: string = '';
  lastname: string = '';
  address_from: string = '';
  address2: string = '';
  company_name: string = '';
  CountryList: Country[] = [];
  country: string = '';
  StateList: Country[] = [];
  state: string = '';
  city: string = '';
  cityList: Country[] = [];
 
  customer_id: string = '';
  zip: string = '';
  email: string = '';
  telephone: string = '';
  address_type: string = '';

  firstname_to: string = '';
  lastname_to: string = '';
  address_to: string = '';
  address2_to: string = '';
  company_name_to: string = '';
  country_to: string = '';
  state_to: string = '';
  city_to: string = '';
  zip_to: string = '';
  email_to: string = '';
  telephone_to: string = '';
  address_type_to: string = '';
  quotion: Quotion;
  Page: number = 0;

  WorkTypeDisplayList: WorkTypeDisplay[] = [];

  SelectedCountryList: Country[] = [];
  SelectedStateList: Country[] = [];
  SelectedCityList: Country[] = [];

  ToSelectedCountryList: Country[] = [];
  ToSelectedStateList: Country[] = [];
  ToSelectedCityList: Country[] = [];
  ToStateList: Country[] = [];
  TocityList: Country[] = [];
  customersList: Customer[] = [];
  
  ToSelectedcustomersList: Customer[] = [];
}

export default class QuotationCreatePage extends BaseComponent<
  any,
  AddOrderItemViewModel
> {
  constructor(props) {
    super(props);
    var model = new AddOrderItemViewModel();
    model.Selected = ButtonArray[0];

    model.shipment_id = this.props.route?.params?.shipmentid;
    console.log(model.shipment_id);
    // this.state.Model.IsPageLoading = true;
    this.state = new BaseState(model);
   
  }
  componentDidMount() {
    var model = this.state.Model;
    this.LoadCountryList();
    this.LoadCustomerList();
    this.LoadAddressTypeList();
    this.Loaddelivery_mode_list();
    this.shippingmodeList();
    
    // this.setState({protect_parcel_doc: model.protect_parcel_doc});
    // this.setState({protect_parcel_pack: model.protect_parcel_pack});
  }
  LoadCityMain= async () => {
 
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('stateID', model.ToSelectedStateList[0]?.id);

    console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/cityListBystate',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(JSON.stringify(res, null, 4));
        model.TocityList = res.data?.cityList as Country[];

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  shippingmodeList = async () => {
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('type', model.type);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/shipping_mode_list',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.shippingmodeList= res.data?.shippingmodeList as deliverymode[];
        console.log(JSON.stringify(res, null, 4));
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  Loaddelivery_mode_list = async () => {
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('type', model.type);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/delivery_mode_list',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.deliverymodeList= res.data?.deliverymodeList as deliverymode[];
        console.log(JSON.stringify(res, null, 4));
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  LoadAddressTypeList = () => {
    var model = this.state.Model;
    var CashOnDelivery = new WorkTypeDisplay();
    CashOnDelivery.Display = 'Home Address';
    CashOnDelivery.Value = CustomerPaymentMode.HomeAddress;

    model.WorkTypeDisplayList.push(CashOnDelivery);

    var payUMoney = new WorkTypeDisplay();
    payUMoney.Display = 'Business Address';
    payUMoney.Value = CustomerPaymentMode.BusinessAddress;

    model.WorkTypeDisplayList.push(payUMoney);
  };
  HandlePaymentModeChanged = (PaymentMode: CustomerPaymentMode) => {
    var model = this.state.Model;
    model.address_type = PaymentMode;
    console.log(model.address_type);
    this.UpdateViewModel();
  };
  HandlePaymentModeChangedto = (PaymentMode: CustomerPaymentMode) => {
    var model = this.state.Model;
    model.address_type_to = PaymentMode;
    console.log(model.address_type_to);
    this.UpdateViewModel();
  };
  LoadCountryList = async () => {
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('type', model.type);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/countryList ',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.CountryList = res.data?.countryList as Country[];
        console.log(JSON.stringify(res, null, 4));
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  LoadCustomerList = async () => {
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
    const formData = new FormData();
    formData.append('pdboy_id', value.user_id);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/areaWiseCustomersList',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.customersList = res.data?.customersList as Customer[];
        console.log(JSON.stringify(res, null, 4));
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };

  LoadCategoryList = async (event: any) => {
    this.SetModelValue(event.name, event.value);
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('type', model.type);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/item_cat_list_by_shipping_cat ',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.CategoryList = res.data?.ItemCatList as RoyalSerryItemCat[];

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  LoadState = async () => {
    // this.SetModelValue(event.name, event.value);
    var model = this.state.Model;
model.country=model.SelectedCountryList[0]?.id;
console.log("Country",model.country);
    const formData = new FormData();
    formData.append('countryID', model.country);

    console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/stateListByCountry',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(JSON.stringify(res, null, 4));
        model.StateList = res.data?.stateList as Country[];

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);
        var state = model.StateList.find(o => o.id === model.state);
        console.log("Hii",state);
          model.SelectedStateList.unshift(state)
        this.UpdateViewModel();
        this.LoadCity();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  LoadCity = async () => {
    // this.SetModelValue(event.name, event.value);
    var model = this.state.Model;
    // model.=model.SelectedCountryList[0]?.id;
    const formData = new FormData();
    formData.append('stateID', model.SelectedStateList[0]?.id);

    console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/cityListBystate',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(JSON.stringify(res, null, 4));
        model.cityList = res.data?.cityList as Country[];
        var city = model.cityList.find(o => o.id === model.city);
        console.log("city", model.cityList);
          model.SelectedCityList.unshift(city)
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  LoadCustomer = async () => {
    // this.SetModelValue(event.name, event.value);
    var model = this.state.Model;
    model.customer_id=model.ToSelectedcustomersList[0]?.user_id;
    const formData = new FormData();
    formData.append('user_id',   model.customer_id);
 
    console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/customersDetails',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log("Customer",res.data)
        var customer=res.data?.customersDetails[0] as CustomerDetails;
        console.log(customer);
        model.firstname=customer.firstname;
        model.lastname=customer.lastname;
        model.address_from=customer.address;
        model.address2=customer.address2;
        model.company_name=customer.companyname;
        model.country=customer.country;
        model.state=customer.state;
        model.city=customer.city;
        model.zip=customer.zip;
        model.email=customer.email;
        model.telephone=customer.telephone;
        var obj = model.CountryList.find(o => o.id === customer.country);
    console.log("Hii",obj);
      model.SelectedCountryList.unshift(obj)
      
        console.log("Firstname",model.firstname);
        // model.SubCategoryList = res.data?.ItemSubCatList as RoyalSerryItemCat[];

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
        this.LoadState();
     
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  LoadItemList = async (event: any) => {
    this.SetModelValue(event.name, event.value);
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('type', model.type);
    if (model.package_category) {
      formData.append('item_cat_id', model.package_category);
    }
    if (model.document_category) {
      formData.append('item_cat_id', model.document_category);
    }
    console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/item_list_by_cat_type',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(res.data);
        if (res.data?.ItemList) {
          model.ItemList = res.data.ItemList as RoyalSerryItemCat[];

          // this.ShowToastMesage('Login Successfully', 'warning', 5000);

          this.UpdateViewModel();
        } else {
          this.ShowToastMesage(res.data?.message, 'warning', 5000);
        }
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };

  // UpdateItem = async () => {
  //   var model = this.state.Model;

  //   const formData = new FormData();
  //   formData.append('item_id', model.item_id);
  //   formData.append('quantity', model.quantity);
  //   formData.append('shipment_id', model.shipment_id);
  //   formData.append('type', model.type);

  //   formData.append('document_category', model.document_category);
  //   formData.append('document_sub_cat', model.document_sub_cat);
  //   formData.append('document_item', model.document_item);

  //   formData.append(
  //     'additional_charge_comment',
  //     model.additional_charge_comment,
  //   );
  //   formData.append('additional_charge', model.additional_charge);
  //   formData.append(
  //     'value_of_shipment_parcel_doc',
  //     model.value_of_shipment_parcel_doc,
  //   );
  //   formData.append(
  //     'protect_parcel_doc',
  //     this.state.protect_parcel_doc?.toString(),
  //   );

  //   formData.append('package_category', model.package_category);
  //   formData.append('package_sub_cat', model.package_sub_cat);
  //   formData.append('package_item', model.package_item);
  //   formData.append('package_category', model.package_category);
  //   formData.append('package_sub_cat', model.package_sub_cat);
  //   formData.append('package_item', model.package_item);

  //   formData.append('other_details_parcel', model.other_details_parcel);
  //   formData.append(
  //     'shipment_description_parcel',
  //     model.shipment_description_parcel,
  //   );
  //   formData.append(
  //     'value_of_shipment_parcel_pack',
  //     model.value_of_shipment_parcel_pack,
  //   );
  //   formData.append(
  //     'protect_parcel_pack',
  //     this.state.protect_parcel_pack?.toString(),
  //   );
  //   formData.append('referance_parcel', model.referance_parcel);
  //   formData.append('length', model.length);
  //   formData.append('height', model.height);
  //   formData.append('weight', model.weight);
  //   formData.append('breadth', model.breadth);
  //   formData.append('length_dimen', 'CM');
  //   formData.append('breadth_dimen', 'CM');
  //   formData.append('height_dimen', 'CM');
  //   formData.append('weight_dimen', 'CM');
  //   console.log(formData);
  //   var config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   this.ShowPageLoader(true);
  //   Axios.post(
  //     'http://staging-rss.staqo.com/api/addOrderItem',
  //     formData,
  //     config,
  //   )
  //     .then((res) => {
  //       this.ShowPageLoader(false);
  //       // model.ItemList = res.data?.ItemList as RoyalSerryItemCat[];
  //       this.ShowToastMesage(res.data?.message, 'warning', 5000);

  //       console.log(JSON.stringify(res, null, 4));
  //       // this.ShowToastMesage('Login Successfully', 'warning', 5000);
  //       this.props.navigation.navigate('AllOrderPage');
  //       this.UpdateViewModel();
  //     })
  //     .catch((err) => {
  //       this.ShowPageLoader(false);
  //       this.ShowToastMesage(err.data?.message, 'warning', 5000);
  //     });
  // };

  // handleProtectParcel = () => {
  //   this.setState({protect_parcel_doc: !this.state.protect_parcel_doc});
  // };
  // handleProtectPack = () => {
  //   this.setState({protect_parcel_pack: !this.state.protect_parcel_pack});
  // };
  HandleSubCategoryList = async (item: Select) => {
    var model = this.state.Model;

    model.Selected = item;

    this.UpdateViewModel();
  };

  HandleCreate = async () => {
    var model = this.state.Model;
    if(model.email_to){
      var a=model.email_to.split(/\s/).join('');
      model.email_to=a;
      this.UpdateViewModel();
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
if (!model.firstname_to) {
  this.ShowToastMesage(
    'first name required',
    'warning',
    5000,
  );
return;
}
if (!model.lastname_to) {
this.ShowToastMesage(
  'last name required',
  'warning',
  5000,
);
return;
}
if (!model.address_to) {
this.ShowToastMesage(
'address line 1 is required',
'warning',
5000,
);
return;
}

if (!model.ToSelectedCountryList[0]?.id) {
this.ShowToastMesage(
'country is required',
'warning',
5000,
);
return;
}
if (!model.ToSelectedStateList[0]?.id) {
this.ShowToastMesage(
'state is required',
'warning',
5000,
);
return;
}
if (!model.ToSelectedCityList[0]?.id) {
this.ShowToastMesage(
'city is required',
'warning',
5000,
);
return;
}
if (!model.zip_to) {
this.ShowToastMesage(
'zip code is required',
'warning',
5000,
);
return;
}
// if (!model.email_to ) {
// this.ShowToastMesage(
// 'email is required',
// 'warning',
// 5000,
// );
// return;
// }
if (model.email_to && reg.test(model.email_to)=== false ) {
  this.ShowToastMesage(
  'Please enter valid email',
  'warning',
  5000,
  );
  return;
  }

if (!model.telephone_to) {
this.ShowToastMesage(
'Phone No is required',
'warning',
5000,
);
return;
}
        this.props.navigation.navigate('AddQuotionItemPage', {
      
          delivery_speed: model.delivery_speed,
          location_type:model.location_type,
          shipment_type_option:model.shipment_type_option,
          customer_id:model.customer_id,
          charges_final:model.charges_final,
          firstname:model.firstname,
          lastname:model.lastname,
          address_from:model.address_from,
          address2:model.address2,
          company_name:model.company_name,
          country:model.SelectedCountryList[0]?.id,
          state:model.SelectedStateList[0]?.id,
          city:model.SelectedCityList[0]?.id,
          zip:model.zip,
          email:model.email,
          telephone:model.telephone,
          address_type:model.address_type,
          firstname_to:model.firstname_to,
          lastname_to:model.lastname_to,
          address_to:model.address_to,
          address2_to:model.address2_to,
          company_name_to:model.company_name_to,
          country_to:model.ToSelectedCountryList[0]?.id,
          state_to:model.ToSelectedStateList[0]?.id,
          city_to:model.ToSelectedCityList[0]?.id,
          zip_to:model.zip_to,
          email_to:model.email_to,
          telephone_to:model.telephone_to,
          address_type_to:model.address_type_to,



        });
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      // })
      // .catch((err) => {
      //   this.ShowPageLoader(false);
      //   this.ShowToastMesage(err.data?.message, 'warning', 5000);
      // });
  };
  HandleNext = async () => {
    var model = this.state.Model;
    if (!model.location_type) {
      this.ShowToastMesage(
        'Please Select Domestic or International',
        'warning',
        5000,
      );
      return;
    }
    // if (!model.shipment_type_option) {
    //   this.ShowToastMesage(
    //     'Please Select Parcel type',
    //     'warning',
    //     5000,
    //   );
    //   return;
    // }
    if (!model.delivery_speed) {
      this.ShowToastMesage(
        'Please Select Speed Rate',
        'warning',
        5000,
      );
      return;
    }
    if (!model.charges_final) {
      this.ShowToastMesage(
        'Please Select Transport Type',
        'warning',
        5000,
      );
      return;
    }
      if (!model.customer_id) {
        this.ShowToastMesage(
          'Please Select Customer',
          'warning',
          5000,
        );
      return;
    }
    // model.Selected = ButtonArray[1];
    model.Page = 1;
    this.UpdateViewModel();
    // this.LoadCityMain();
    // this.LoadStateMain();
  };
  LoadStateMain = async () => {
  
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('countryID', model.ToSelectedCountryList[0]?.id);

    console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/stateListByCountry',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(JSON.stringify(res, null, 4));
        model.ToStateList = res.data?.stateList as Country[];

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  HandleNext2 = async () => {
    var model = this.state.Model;
    if(model.email){
      var a=model.email.split(/\s/).join('');
      model.email=a;
      this.UpdateViewModel();
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


    if (!model.firstname) {
      this.ShowToastMesage(
        'first name required',
        'warning',
        5000,
      );
    return;
  }
  if (!model.lastname) {
    this.ShowToastMesage(
      'last name required',
      'warning',
      5000,
    );
  return;
}
if (!model.address_from) {
  this.ShowToastMesage(
    'address line 1 is required',
    'warning',
    5000,
  );
return;
}

if (!model.SelectedCountryList[0]?.id) {
  this.ShowToastMesage(
    'country is required',
    'warning',
    5000,
  );
return;
}
if (!model.SelectedStateList[0]?.id) {
  this.ShowToastMesage(
    'state is required',
    'warning',
    5000,
  );
return;
}
if (!model.SelectedCityList[0]?.id) {
  this.ShowToastMesage(
    'city is required',
    'warning',
    5000,
  );
return;
}
if (!model.zip) {
  this.ShowToastMesage(
    'zip code is required',
    'warning',
    5000,
  );
return;
}
// if (!model.email ) {
//   this.ShowToastMesage(
//     'Please enter valid email',
//     'warning',
//     5000,
//   );
// return;
// }
if (model.email && reg.test(model.email)=== false ) {
  this.ShowToastMesage(
    'Please enter valid email',
    'warning',
    5000,
  );
return;
}

if (!model.telephone) {
  this.ShowToastMesage(
    'Phone No is required',
    'warning',
    5000,
  );
return;
}
    model.Selected = ButtonArray[1];

    this.UpdateViewModel();
  };

  LoadSubcategory = async (event: any) => {
    this.SetModelValue(event.name, event.value);
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('type', model.type);
    if(model.package_category){
    formData.append('item_cat_id', model.package_category);
    }
    if(model.document_category){
    formData.append('item_cat_id', model.document_category);
    }
    console.log(formData)
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/item_subcat_list_by_shipping_cat_itemcat',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.SubCategoryList = res.data?.ItemSubCatList as RoyalSerryItemCat[];

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
    HandlePrevious2= async () => {
        // console.log("11");
        var model = this.state.Model;
        // console.log("11");
        // model.Selected = ButtonArray[0];
    model.Page=0;
        this.UpdateViewModel();
        console.log("11");
      }
      HandlePrevious3= async () => {
        // console.log("11");
        var model = this.state.Model;
        // console.log("11");
        // model.Selected = ButtonArray[0];
        model.Selected = ButtonArray[0];
        this.UpdateViewModel();
        console.log("11");
      }
  render() {
    var model = this.state.Model;
    // console.log(this.state.protect_parcel_doc?.toString());
    // console.log(this.state.protect_parcel_pack?.toString());
    var OrderTypeList = data.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
    if (model.CategoryList) {
      var CategoryList = model.CategoryList?.map((i, k) => {
        return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
      });
    }
    if (model.SubCategoryList) {
      var SubCategoryList = model.SubCategoryList?.map((i, k) => {
        return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
      });
    }
    if (model.ItemList) {
      var ItemList = model.ItemList?.map((i, k) => {
        return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
      });
    }

    var LocationtypeList = Locationtype.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
    var ShipmenttypList = Shipmenttype.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
    var speedtypeList = model.deliverymodeList.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.id} />;
    });
    var TransporttypeList = model.shippingmodeList.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.id} />;
    });
    var CountryList = model.CountryList?.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.id} />;
    });
    if (model.StateList) {
      var StateList = model.StateList?.map((i, k) => {
        return <Picker.Item label={i.name} key={k} value={i.id} />;
      });
    }
    if (model.cityList) {
      var cityList = model.cityList?.map((i, k) => {
        return <Picker.Item label={i.name} key={k} value={i.id} />;
      });
    }
console.log("select customer",model.ToSelectedcustomersList)
    if (model.ToSelectedcustomersList?.length>0) {
      var SelectedcustomersList = model.ToSelectedcustomersList?.map((y, i) => {
        return {user_id: y.user_id, name: y.firstname+" "+y.lastname};
      });
    }
   
      if (model.customersList?.length>0) {
      var customersListList = model.customersList?.map((a, i) => {
        return {user_id: a.user_id, name: a.firstname+" "+a.lastname};
      });
    }
    console.log("All customer",customersListList)
    var customersList = model.customersList?.map((i, k) => {
      return (
        <Picker.Item
          label={i.firstname + ' ' + i.lastname}
          key={k}
          value={i.user_id}
        />
      );
    });
    var Addresstypes = Addresstype.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
    if (model.SelectedCountryList?.length>0) {
    var SelectedCountryListList = model.SelectedCountryList?.map((s, i) => {
      return {id: s.id, name: s.name};
    });
  }
    if (model.CountryList?.length>0) {
    var CountryListList = model.CountryList?.map((a, i) => {
      return {id: a.id, name: a.name};
    });
  }
    if (model.SelectedStateList?.length>0) {

    var SelectedStateListList = model?.SelectedStateList?.map((b, i) => {
      return {id: b?.id, name: b?.name};
    });
    console.log("Leangth",model.SelectedStateList.length)
  }
    if (model.StateList?.length>0) {
    var StateListList = model.StateList?.map((c, i) => {
      return {id: c.id, name: c.name};
    });
  }
  if (model.SelectedCityList?.length>0) {
    var SelectedCityListList = model?.SelectedCityList?.map((d, i) => {
      return {id: d?.id, name: d?.name};
    });
  }
    if (model.cityList?.length>0) {
    var CityList = model.cityList?.map((e, i) => {
      return {id: e.id, name: e.name};
    });
  }



  if (model.ToSelectedCountryList?.length>0) {
    var ToSelectedCountryListList = model.ToSelectedCountryList?.map((s, i) => {
      return {id: s.id, name: s.name};
    });
  }

    if (model.ToSelectedStateList?.length>0) {

    var ToSelectedStateListList = model?.ToSelectedStateList?.map((b, i) => {
      return {id: b?.id, name: b?.name};
    });
    console.log("Leangth",model.SelectedStateList?.length)
  }
    if (model.ToStateList?.length>0) {
    var ToStateListList = model.ToStateList?.map((c, i) => {
      return {id: c.id, name: c.name};
    });
  }
  if (model.ToSelectedCityList?.length>0) {
    var ToSelectedCityListList = model?.ToSelectedCityList?.map((d, i) => {
      return {id: d?.id, name: d?.name};
    });
  }
    if (model.TocityList?.length>0) {
    var ToCityList = model.TocityList?.map((e, i) => {
      return {id: e.id, name: e.name};
    });
  }
    console.log("Selected",model.SelectedCountryList)
    return (
      <View style={{height: '100%', backgroundColor: BaseColor.ColorWhite}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={BaseColor.ColorWhite}
          translucent={true}
        />
        <CustomModalIndicator IsLoading={model.IsPageLoading} />
        <View
          style={{
            borderTopWidth: 5,
            borderTopColor: BaseColor.ColorRed,
          }}></View>
        <View style={{height: 100, width: 100}}>
          <CustomImage
            source={require('../../../assets/banner-home.jpg')}
            style={{height: '130%', width: '400%'}}
          />
        </View>
        <Modal
          isVisible={true}
          coverScreen={false}
          backdropOpacity={0}
          onBackButtonPress={() => {
            this.props.navigation.goBack();
          }}>
          <View
            style={{
              height: '80%',
              marginTop: '50%',
              backgroundColor: BaseColor.ColorGrey,
            }}>
            <Content>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  // marginLeft: '30%',
                  alignSelf: 'center',
                  fontWeight: '600',
                  color: BaseColor.ColorGreyDeep,
                }}>
                Start Shipment
              </Text>

              {/* </View> */}
              {model.Page == 0 && (
          
                <View style={{margin: 10}}>
                           
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: '5%',
                      color: BaseColor.ColorRed,
                      fontSize: 13,
                    }}>
                    General
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: '5%',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginTop: '5%',
                        color: BaseColor.ColorRed,
                        fontSize: 13,
                      }}>
                      Step
                    </Text>
                    <View
                      style={{
                        marginTop: '5%',
                        height: 25,
                        width: 25,
                        borderRadius: 30,
                        marginLeft: '2%',
                        justifyContent: 'center',
                        backgroundColor: BaseColor.ColorRed,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: BaseColor.ColorWhite,
                          fontSize: 12,
                        }}>
                        1
                      </Text>
                    </View>
                    </View>
                    <Text style={{ marginTop: 5, color: "grey", fontWeight: "bold",marginLeft:'2%' }}>Customer Name</Text>
                  <SearchableDropDown
                  multi={false}
                  selectedItems={SelectedcustomersList}
                  onItemSelect={(item:Customer) => {
                    const model = this.state.Model;
                    var tempSubject = model.customersList?.find(
                      (sitem) => sitem.user_id === item.user_id,
                    );
                    console.log("item",tempSubject)
                    model.ToSelectedcustomersList.unshift(tempSubject);
              console.log("multi",model.ToSelectedcustomersList)
                    this.setState({Model: model});
                    this.LoadCustomer();
                    
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item: Customer, index) => {
                    const items = model.ToSelectedcustomersList?.filter(
                      (sitem) => sitem.user_id !== item.user_id,
                    );
                    model.ToSelectedcustomersList = items;
                    this.setState({Model: model});
                    this.LoadCustomer();
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: BaseColor.ColorGrey,
                    borderButtonWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={customersListList}
                  // defaultIndex={2}
                  chip={true}
                  resetValue={false}
                 
                  textInputProps={{
                  placeholder: model.ToSelectedcustomersList[0]?.firstname,
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 12,
                      borderBottomWidth: 0.3,
                      borderColor: BaseColor.ColorGreyDeep,
                      borderRadius: 5,
                    },
                
                    onTextChange: (text) => console.log(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
            
                  <KeyboardAwareScrollView     enableOnAndroid={true} >
 <LongCustomPicker
                    Name="location_type"
                    LabelText="Domestic or International"
                    selectedValue={model.location_type}
                    onValueChange={this.SetModelValueX}
                    // IsRequired={true}
                    IsNullable={true}
                    Data={LocationtypeList}
                  />
                  {/* <LongCustomPicker
                    Name="shipment_type_option"
                    LabelText="Parcel Type"
                    selectedValue={model.shipment_type_option}
                    onValueChange={this.SetModelValueX}
                    IsRequired={true}
                    IsNullable={true}
                    Data={ShipmenttypList}
                  /> */}
                  <LongCustomPicker
                    Name="delivery_speed"
                    LabelText="Speed Rate"
                    selectedValue={model.delivery_speed}
                    onValueChange={this.SetModelValueX}
                    // IsRequired={true}
                    IsNullable={true}
                    Data={speedtypeList}
                  />
                  <LongCustomPicker
                    Name="charges_final"
                    LabelText="Transport Type"
                    selectedValue={model.charges_final}
                    onValueChange={this.SetModelValueX}
                    // IsRequired={true}
                    IsNullable={true}
                    Data={TransporttypeList}
                  />
                  {/* <LongCustomPicker
                    Name="customer_id"
                    LabelText="Customer"
                    selectedValue={model.customer_id}
                    onValueChange={this.LoadCustomer}
                    IsRequired={true}
                    IsNullable={true}
                    Data={customersList}
                  /> */}
                 
                
                  <Button
                    onPress={this.HandleNext}
                    style={{
                      width: '30%',
                      alignSelf: 'flex-end',
                      backgroundColor: BaseColor.ColorGreen,
                      marginTop: '5%',
                      // height: '8%',
                      borderRadius: 5,
                      justifyContent: 'center',
                      marginBottom: '13%',
                      marginEnd: '6%',
                    }}>
                    <Text style={{color: BaseColor.ColorWhite}}>Next</Text>
                  </Button>
                  </KeyboardAwareScrollView>
                </View>
              
              )}
              {model.Page == 1 && (
                <View>
                  {model.Selected?.Type == '2' &&(
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: '5%',
                      color: BaseColor.ColorRed,
                      fontSize: 13,
                    }}>
                   From Location
                  </Text>
                  )}
                    {model.Selected?.Type == '3' &&(
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: '5%',
                      color: BaseColor.ColorRed,
                      fontSize: 13,
                    }}>
                   To Location
                  </Text>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: '5%',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginTop: '5%',
                        color: BaseColor.ColorRed,
                        fontSize: 13,
                      }}>
                      Step
                    </Text>
                    <View
                      style={{
                        marginTop: '5%',
                        height: 25,
                        width: 25,
                        borderRadius: 30,
                        marginLeft: '2%',
                        justifyContent: 'center',
                        backgroundColor: BaseColor.ColorRed,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: BaseColor.ColorWhite,
                          fontSize: 12,
                        }}>
                        2
                      </Text>
                    </View>
                  </View>
                  {/* <FlatList
                    data={ButtonArray}
                    style={{
                      alignSelf: 'center',
                      marginTop: 5,
                      marginBottom: 10,
                    }}
                    horizontal={true}
                    renderItem={({item}) => (
                      <Button
                        first
                        onPress={() => {
                          this.HandleSubCategoryList(item);
                        }}
                        style={[
                          styles.DateButton,
                          model.Selected == item
                            ? {
                                borderBottomColor: BaseColor.ColorRed,
                                borderBottomWidth: 2,
                              }
                            : {},
                        ]}>
                        <Text
                          style={[
                            styles.Text,
                            model.Selected == item
                              ? {color: BaseColor.ColorRed, fontSize: 12}
                              : {},
                          ]}>
                          {item.text}
                        </Text>
                      </Button>
                    )}
                  /> */}
                  {model.Selected?.Type == '2' && (
                     
                    <View style={{margin: 10}}>
                        {/* <KeyboardAwareScrollView     extraHeight={120} enableOnAndroid={true} > */}
                      <CustomInput
                        Name="firstname"
                        LabelText="First Name"
                        OnChangeText={this.SetModelValueX}
                        value={model.firstname}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="lastname"
                        LabelText="Last Name"
                        OnChangeText={this.SetModelValueX}
                        value={model.lastname}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="address_from"
                        LabelText="Address Line1"
                        OnChangeText={this.SetModelValueX}
                        value={model.address_from}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="address2"
                        LabelText="Address Line2 (Optional)"
                        OnChangeText={this.SetModelValueX}
                        value={model.address2}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="company_name"
                        LabelText="Company (Optional)"
                        OnChangeText={this.SetModelValueX}
                        value={model.company_name}
                        //   IsRequired={true}
                      />
                           {/* </KeyboardAwareScrollView> */}
                      <Text style={{ marginTop: 5, color: "grey", fontWeight: "bold" }}>Country</Text>
<SearchableDropDown
                  multi={false}
                  selectedItems={SelectedCountryListList}
                  onItemSelect={(item:Country) => {
                    const model = this.state.Model;
                    var tempSubject = model.CountryList.find(
                      (sitem) => sitem.id === item.id,
                    );
                    
                    model.SelectedCountryList.unshift(tempSubject);
              
                    this.setState({Model: model});
                    this.LoadState();
                    
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item: Country, index) => {
                    const items = model.SelectedCountryList.filter(
                      (sitem) => sitem.id !== item.id,
                    );
                    model.SelectedCountryList = items;
                    this.setState({Model: model});
                    // this.LoadState();
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: BaseColor.ColorGrey,
                    borderButtonWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={CountryListList}
                  // defaultIndex={2}
                  chip={true}
                  resetValue={false}
                 
                  textInputProps={{
                  placeholder: model.SelectedCountryList[0]?.name,
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 12,
                      borderBottomWidth: 0.3,
                      borderColor: BaseColor.ColorGreyDeep,
                      borderRadius: 5,
                    },
                
                    onTextChange: (text) => console.log(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />


                      {/* <LongCustomPicker
                        Name="country"
                        LabelText="country"
                        selectedValue={model.country}
                        onValueChange={this.LoadState}
                        IsRequired={true}
                        IsNullable={true}
                        Data={CountryList}
                      /> */}
  <Text style={{ marginTop: 5, color: "grey", fontWeight: "bold" }}>State</Text>
<SearchableDropDown
                  multi={false}
                  selectedItems={SelectedStateListList}
                  onItemSelect={(item:Country) => {
                    const model = this.state.Model;
                    var tempSubject = model.StateList.find(
                      (sitem) => sitem.id === item.id,
                    );
                    
                    model.SelectedStateList.unshift(tempSubject);
              
                    this.setState({Model: model});
                    this.LoadCity();
                    
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item: Country, index) => {
                    const items = model.SelectedStateList.filter(
                      (sitem) => sitem.id !== item.id,
                    );
                    model.SelectedStateList = items;
                    this.setState({Model: model});
                    // this.LoadCity();
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: BaseColor.ColorGrey,
                    borderButtonWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={StateListList}
                  // defaultIndex={2}
                  chip={true}
                  resetValue={false}
                 
                  textInputProps={{
                  placeholder: model.SelectedStateList[0]?.name,
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 12,
                      borderBottomWidth: 0.3,
                      borderColor: BaseColor.ColorGreyDeep,
                      borderRadius: 5,
                    },
                
                    onTextChange: (text) => console.log(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
                      {/* <LongCustomPicker
                        Name="state"
                        LabelText="state"
                        selectedValue={model.state}
                        onValueChange={this.LoadCity}
                        IsRequired={true}
                        IsNullable={true}
                        Data={StateList}
                      /> */}

<Text style={{ marginTop: 5, color: "grey", fontWeight: "bold" }}>City</Text>
<SearchableDropDown
                  multi={false}
                  selectedItems={SelectedCityListList}
                  onItemSelect={(item:Country) => {
                    const model = this.state.Model;
                    var tempSubject = model.cityList.find(
                      (sitem) => sitem.id === item.id,
                    );
                    
                    model.SelectedCityList.unshift(tempSubject);
              
                    this.setState({Model: model});
                    // this.LoadCity();
                    
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item: Country, index) => {
                    const items = model.SelectedCityList.filter(
                      (sitem) => sitem.id !== item.id,
                    );
                    model.SelectedCityList = items;
                    this.setState({Model: model});
                    // this.LoadCity();
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: BaseColor.ColorGrey,
                    borderButtonWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={CityList}
                  // defaultIndex={2}
                  chip={true}
                  resetValue={false}
                 
                  textInputProps={{
                  placeholder: model.SelectedCityList[0]?.name,
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 12,
                      borderBottomWidth: 0.3,
                      borderColor: BaseColor.ColorGreyDeep,
                      borderRadius: 5,
                    },
                
                    onTextChange: (text) => console.log(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
                 <KeyboardAwareScrollView      enableOnAndroid={true} >
                      {/* <LongCustomPicker
                        Name="city"
                        LabelText="city"
                        selectedValue={model.city}
                        onValueChange={this.SetModelValueX}
                        IsRequired={true}
                        IsNullable={true}
                        Data={cityList}
                      /> */}
                      <CustomInput
                        Name="zip"
                        LabelText="Zip code"
                        OnChangeText={this.SetModelValueX}
                        value={model.zip}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="email"
                        LabelText="Email Address"
                        OnChangeText={this.SetModelValueX}
                        value={model.email}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="telephone"
                        LabelText="Phone no"
                        OnChangeText={this.SetModelValueX}
                        value={model.telephone}
                        keyboardType = 'numeric'
                        //   IsRequired={true}
                      />

                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        {model.WorkTypeDisplayList.map((i) => {
                          return (
                            <ListItem
                              key={i.Value}
                              onPress={(e) => {
                                this.HandlePaymentModeChanged(i.Value);
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Radio
                                  selected={model.address_type === i.Value}
                                  color={BaseColor.ColorRed}
                                  selectedColor={BaseColor.ColorRed}
                                  onPress={(e) => {
                                    this.HandlePaymentModeChanged(i.Value);
                                  }}
                                  style={{}}
                                />

                                <View>
                                  <Text
                                    style={{
                                      fontSize: 13,
                                      marginLeft: 2,
                                      marginTop: '2%',
                                    }}>
                                    {i.Display}
                                  </Text>
                                </View>
                              </View>
                            </ListItem>
                          );
                        })}
                      </View>
                      <View style={{flexDirection:'row'}}>
                     <Button
                        onPress={this.HandlePrevious2}
                        style={{
                          width: '35%',
                          // alignSelf: 'flex-end',
                          backgroundColor: BaseColor.ColorGreen,
                          marginTop: '5%',
                         // height: '8%',
                          marginLeft:'12%',
                         borderRadius: 5,
                          justifyContent: 'center',
                          marginBottom: '13%',
                          marginEnd: '6%',
                        }}>
                        <Text style={{color: BaseColor.ColorWhite}}>Previous</Text>
                     </Button>
                      <Button
                        onPress={this.HandleNext2}
                        style={{
                          width: '35%',
                          alignSelf: 'flex-end',
                          backgroundColor: BaseColor.ColorGreen,
                          marginTop: '5%',
                          // height: '8%',
                          borderRadius: 5,
                          justifyContent: 'center',
                          marginBottom: '13%',
                          marginEnd: '6%',
                        }}>
                        <Text style={{color: BaseColor.ColorWhite}}>Next</Text>
                      </Button>
                      </View>
                        </KeyboardAwareScrollView>
                    </View>
               
                  )}

                  {model.Selected?.Type == '3' && (
                       
                    <View style={{margin: 10}}>
                         {/* <KeyboardAwareScrollView     enableOnAndroid={true} scrollEnabled={false}> */}
                      <CustomInput
                        Name="firstname_to"
                        LabelText="First Name"
                        OnChangeText={this.SetModelValueX}
                        value={model.firstname_to}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="lastname_to"
                        LabelText="Last Name"
                        OnChangeText={this.SetModelValueX}
                        value={model.lastname_to}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="address_to"
                        LabelText="Address Line1"
                        OnChangeText={this.SetModelValueX}
                        value={model.address_to}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="address2_to"
                        LabelText="Address Line2 (Optional)"
                        OnChangeText={this.SetModelValueX}
                        value={model.address2_to}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="company_name_to"
                        LabelText="Company (Optional)"
                        OnChangeText={this.SetModelValueX}
                        value={model.company_name_to}
                        //   IsRequired={true}
                      />
                      {/* </KeyboardAwareScrollView> */}
                  
   <Text style={{ marginTop: 5, color: "grey", fontWeight: "bold" }}>Country</Text>
<SearchableDropDown
                  multi={false}
                  selectedItems={ToSelectedCountryListList}
                  onItemSelect={(item:Country) => {
                    const model = this.state.Model;
                    var tempSubject = model.CountryList.find(
                      (sitem) => sitem.id === item.id,
                    );
                    
                    model.ToSelectedCountryList.unshift(tempSubject);
              
                    this.setState({Model: model});
                    this.LoadStateMain();
                    
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item: Country, index) => {
                    const items = model.ToSelectedCountryList.filter(
                      (sitem) => sitem.id !== item.id,
                    );
                    model.ToSelectedCountryList = items;
                    this.setState({Model: model});
                    // this.LoadState();
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: BaseColor.ColorGrey,
                    borderButtonWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={CountryListList}
                  // defaultIndex={2}
                  chip={true}
                  resetValue={false}
                 
                  textInputProps={{
                  placeholder: "",
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 12,
                      borderBottomWidth: 0.3,
                      borderColor: BaseColor.ColorGreyDeep,
                      borderRadius: 5,
                    },
                
                    onTextChange: (text) => console.log(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />

                      {/* <LongCustomPicker
                        Name="country_to"
                        LabelText="country"
                        selectedValue={model.country_to}
                        onValueChange={this.LoadState}
                        IsRequired={true}
                        IsNullable={true}
                        Data={CountryList}
                      />
                      <LongCustomPicker
                        Name="state_to"
                        LabelText="state"
                        selectedValue={model.state_to}
                        onValueChange={this.LoadCity}
                        IsRequired={true}
                        IsNullable={true}
                        Data={StateList}
                      /> */}
                       <Text style={{ marginTop: 5, color: "grey", fontWeight: "bold" }}>State</Text>
<SearchableDropDown
                  multi={false}
                  selectedItems={ToSelectedStateListList}
                  onItemSelect={(item:Country) => {
                    const model = this.state.Model;
                    var tempSubject = model.ToStateList.find(
                      (sitem) => sitem.id === item.id,
                    );
                    
                    model.ToSelectedStateList.unshift(tempSubject);
              
                    this.setState({Model: model});
                    this.LoadCityMain();
                    
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item: Country, index) => {
                    const items = model.ToSelectedStateList.filter(
                      (sitem) => sitem.id !== item.id,
                    );
                    model.ToSelectedStateList = items;
                    this.setState({Model: model});
                    // this.LoadCity();
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: BaseColor.ColorGrey,
                    borderButtonWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={ToStateListList}
                  // defaultIndex={2}
                  chip={true}
                  resetValue={false}
                 
                  textInputProps={{
                  placeholder:"",
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 12,
                      borderBottomWidth: 0.3,
                      borderColor: BaseColor.ColorGreyDeep,
                      borderRadius: 5,
                    },
                
                    onTextChange: (text) => console.log(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
                      {/* <LongCustomPicker
                        Name="city_to"
                        LabelText="city"
                        selectedValue={model.city_to}
                        onValueChange={this.SetModelValueX}
                        IsRequired={true}
                        IsNullable={true}
                        Data={cityList}
                      /> */}

<Text style={{ marginTop: 5, color: "grey", fontWeight: "bold" }}>City</Text>
<SearchableDropDown
                  multi={false}
                  selectedItems={ToSelectedCityListList}
                  onItemSelect={(item:Country) => {
                    const model = this.state.Model;
                    var tempSubject = model.TocityList.find(
                      (sitem) => sitem.id === item.id,
                    );
                    
                    model.ToSelectedCityList.unshift(tempSubject);
              
                    this.setState({Model: model});
                    // this.LoadCity();
                    
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item: Country, index) => {
                    const items = model.ToSelectedCityList.filter(
                      (sitem) => sitem.id !== item.id,
                    );
                    model.ToSelectedCityList = items;
                    this.setState({Model: model});
                    // this.LoadCity();
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: BaseColor.ColorGrey,
                    borderButtonWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={ToCityList}
                  // defaultIndex={2}
                  chip={true}
                  resetValue={false}
                 
                  textInputProps={{
                  placeholder: "",
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 12,
                      borderBottomWidth: 0.3,
                      borderColor: BaseColor.ColorGreyDeep,
                      borderRadius: 5,
                    },
                
                    onTextChange: (text) => console.log(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
            
                   <KeyboardAwareScrollView      enableOnAndroid={true} >
                      <CustomInput
                        Name="zip_to"
                        LabelText="Zip code"
                        OnChangeText={this.SetModelValueX}
                        value={model.zip_to}
                        //   IsRequired={true}
                      />

                      <CustomInput
                        Name="email_to"
                        LabelText="Email Address"
                        OnChangeText={this.SetModelValueX}
                        value={model.email_to}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="telephone_to"
                        LabelText="Phone no"
                        OnChangeText={this.SetModelValueX}
                        value={model.telephone_to}
                        keyboardType = 'numeric'
                        //   IsRequired={true}
                      />
                     
                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        {model.WorkTypeDisplayList.map((i) => {
                          return (
                            <ListItem
                              key={i.Value}
                              onPress={(e) => {
                                this.HandlePaymentModeChangedto(i.Value);
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Radio
                                  selected={model.address_type_to === i.Value}
                                  color={BaseColor.ColorRed}
                                  selectedColor={BaseColor.ColorRed}
                                  onPress={(e) => {
                                    this.HandlePaymentModeChangedto(i.Value);
                                  }}
                                  style={{}}
                                />

                                <View>
                                  <Text
                                    style={{
                                      fontSize: 13,
                                      marginLeft: 2,
                                      marginTop: '2%',
                                    }}>
                                    {i.Display}
                                  </Text>
                                </View>
                              </View>
                            </ListItem>
                          );
                        })}
                      </View>
                      <View style={{flexDirection:'row'}}>
                     <Button
                       onPress={this.HandlePrevious3}
                       style={{ width: '35%',
                          // alignSelf: 'flex-end',
                          backgroundColor: BaseColor.ColorGreen,
                          marginTop: '5%',
                          // height: '8%',
                          marginLeft:'12%',
                          borderRadius: 5,
                          justifyContent: 'center',
                          marginBottom: '13%',
                          marginEnd: '6%',
                        }}>
                        <Text style={{color: BaseColor.ColorWhite}}>Previous</Text>
                      </Button>
                      <Button
                        onPress={this.HandleCreate}
                        style={{
                          width: '35%',
                         alignSelf: 'flex-end',
                         marginTop: '5%',
                       // height: '8%',
                      borderRadius: 5,
                      justifyContent: 'center',
                      marginBottom: '13%',
                          marginEnd: '6%',
                          backgroundColor: BaseColor.ColorGreen,

                        }}>
                        {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                        <Text
                          style={{
                            color: BaseColor.ColorWhite,
                            fontWeight: '900',
                          }}>
                          Next
                        </Text>
                      </Button>
                      </View>
                      </KeyboardAwareScrollView>
                    </View>
                    // </KeyboardAwareScrollView>
                  )}
                </View>
              )}
            </Content>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  DateButton: {
    //   width: '100%',
    //   height: 35,

    backgroundColor: BaseColor.ColorGrey,
  },
  Text: {
    color: BaseColor.ColorGreyDeep,
    fontSize: 12,
  },
});
