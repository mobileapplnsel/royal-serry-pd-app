import React from 'react';
import {
  View,
  StatusBar,
  Switch,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
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
import SessionHelper from '../../../Core/SessionHelper';
import DeliveryRate from '../../../Entity/DeliveryRate';
import RateFactor from '../../../Entity/RateFactor';
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
const dim = [
  {
    name: 'cm',
    Type: 'cm',
  },
  // {
  //   name: 'inc',
  //   Type: 'inc',
  // },
];
const weightdim = [
  {
    name: 'kg',
    Type: 'kg',
  },
  {
    name: 'pound',
    Type: 'pound',
  },
];
class ItemTypeDisplay {
  Display: string;
  Value: ItemTypeMode;
}
export enum ItemTypeMode {
  HomeAddress = '1',
  BusinessAddress = '2',
}
export  class Item{
  document_category: string = '';
  package_category: string = '';
  document_sub_cat: string = '';
  package_sub_cat: string = '';
  PackageItemName:String='';
  DocumentItemName:String='';
  PackageCategoryName:String='';
  DocumentCategoryName:String='';
  PackageSubCategoryName:String='';
  DocumentSubCategoryName:String='';
  shipment_description_parcel_document: string = ''; 

  item_id: string = '';
  document_item: string = '';
  package_item: string = '';
  value_of_shipment_parcel_document: string = '';
  other_details_document: string = '';
  protect_parcel_document: string = '';
  protect_parcel_package: string = '';

  additional_charge: string = '';

  other_details_parcel: string = '';
  shipment_description_parcel_package: string = '';
  value_of_shipment_parcel_package: string = '';
  referance_parcel: string = '';
  length: string = '';
  breadth: string = '';
  height: string = '';
  weight: string = '';
  quotation_id: string = '';
  quantity:string = '';

  location_state_from:string = '';
  location_state_to:string = '';
  delivery_speed:string = '';
  charges_final:string= '';
  rates:string= '';

  type: string = '';
  lengthType: string = '';
  breadthType: string = '';
  heightType: string = '';
  weightType: string = '';
}
export class AddOrderItemViewModel extends BaseViewModel {
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
  value_of_shipment_parcel_document: string = '';
  other_details_document: string = '';
  protect_parcel_document?: boolean;
  protect_parcel_package?: boolean;
  shipment_description_parcel_document: string = '';
  additional_charge: string = '';

  other_details_parcel: string = '';
  shipment_description_parcel_package: string = '';
  value_of_shipment_parcel_package: string = '';
  referance_parcel: string = '';
  length: string = '';
  breadth: string = '';
  height: string = '';
  weight: string = '';
  quotation_id: string = '';
  quantity:string = '';

  location_state_from:string = '';
  location_state_to:string = '';

  rates:string = '';
  WorkTypeDisplayList: ItemTypeDisplay[] = [];
  ItemFrom:Item[]=[] ;


  location_type: string = '';
  shipment_type_option: string = '';
  delivery_speed: string = '';
  charges_final: string = '';
  firstname: string = '';
  lastname: string = '';
  address_from: string = '';
  address2: string = '';
  company_name: string = '';

  country: string = '';

  state: string = '';
  city: string = '';

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

  ItemName:String='';
  RateList:DeliveryRate[]=[];
  Rate:string="0";
  Insurance:string="0";
  TotalRate:Number=0;

  PackageRate:string="0";
  TotalPackageRate:Number=0;
  RateFactor:RateFactor;

  lengthType: string = dim[0].Type;
  breadthType: string = dim[0].Type;
  heightType: string = dim[0].Type;
  weightType: string = weightdim[0].Type;
}

export default class AddQuotionItemPage extends BaseComponent<
  any,
  AddOrderItemViewModel
> {
  constructor(props) {
    super(props);
    var model = new AddOrderItemViewModel();

   
    model.location_type=  this.props.route?.params?.location_type;
    model.shipment_type_option=  this.props.route?.params?.shipment_type_option;
    model.delivery_speed=  this.props.route?.params?.delivery_speed;
    model.customer_id=  this.props.route?.params?.customer_id;
    model.charges_final=  this.props.route?.params?.charges_final;
    model.firstname=  this.props.route?.params?.firstname;
    model.lastname=  this.props.route?.params?.lastname;
    model.address_from=  this.props.route?.params?.address_from;
    model.address2=  this.props.route?.params?.address2;
    model.company_name=  this.props.route?.params?.company_name;
    model.country=  this.props.route?.params?.country
    model.state=  this.props.route?.params?.state;
    model.city=  this.props.route?.params?.city;
 
    model.zip=  this.props.route?.params?.zip;
    model.email=  this.props.route?.params?.email;
    model.telephone=  this.props.route?.params?.telephone;
    model.address_type=  this.props.route?.params?.address_type;
    model.firstname_to=  this.props.route?.params?.firstname_to;
    model.lastname_to=  this.props.route?.params?.lastname_to;
    model.address_to=  this.props.route?.params?.address_to;
    model.address2_to=  this.props.route?.params?.address2_to;

    model.company_name_to=  this.props.route?.params?.company_name_to;
    model.country_to=  this.props.route?.params?.country_to;
    model.state_to=  this.props.route?.params?.state_to;
    model.city_to=  this.props.route?.params?.city_to;
    model.zip_to=  this.props.route?.params?.zip_to;
    model.email_to=  this.props.route?.params?.email_to;
    model.telephone_to=  this.props.route?.params?.telephone_to;
    model.address_type_to=  this.props.route?.params?.address_type_to;
   console.log(model.quotation_id);
    // this.state.Model.IsPageLoading = true;
    this.state = new BaseState(model);

   
  }
  componentDidMount() {
    var model = this.state.Model;
    this.setState({protect_parcel_document: model.protect_parcel_document});
    this.setState({protect_parcel_package: model.protect_parcel_package});
this.LoadAddressTypeList();
this.LoadRateFactor();
  
 
  }
  LoadAddressTypeList = () => {
    var model = this.state.Model;
    var CashOnDelivery = new ItemTypeDisplay();
    CashOnDelivery.Display = 'For Document';
    CashOnDelivery.Value = ItemTypeMode.HomeAddress;

    model.WorkTypeDisplayList.push(CashOnDelivery);

    var payUMoney = new ItemTypeDisplay();
    payUMoney.Display = 'For Package';
    payUMoney.Value = ItemTypeMode.BusinessAddress;

    model.WorkTypeDisplayList.push(payUMoney);
  };
  HandlePaymentModeChanged = (PaymentMode: ItemTypeMode) => {
    var model = this.state.Model;
    model.type = PaymentMode;
    console.log(model.type);
    this.UpdateViewModel();
    this.LoadCategoryList();
  };

  LoadCategoryList = async () => {
    // this.SetModelValue(event.name, event.value);
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
console.log('Hii',model.CategoryList);
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  LoadRateFactor = async () => {
    // this.SetModelValue(event.name, event.value);
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
      'http://staging-rss.staqo.com/api/rate_factor',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.RateFactor = res.data?.rateFactor[0] as RateFactor;
// console.log('Hii',res.data);
console.log('Hii',model.RateFactor);
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
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
        if(res.data?.ItemSubCatList){
        model.SubCategoryList = res.data?.ItemSubCatList as RoyalSerryItemCat[];
        }
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        this.UpdateViewModel();
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
      'http://staging-rss.staqo.com/api/item_list_by_cat_type',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(res.data)
        if(res.data?.ItemList){
          if(res.data.ItemList){
        model.ItemList = res.data.ItemList as RoyalSerryItemCat[];
          }
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);
        this.LoadRateList();
        this.UpdateViewModel();}
        else{
          // this.ShowToastMesage(res.data?.message, 'warning', 5000);
        }
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.LoadRateList();
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  LoadRateList = async () => {
    // this.SetModelValue(event.name, event.value);
    var model = this.state.Model;
console.log("Package subcat",model.package_sub_cat);
    const formData = new FormData();
    // var category;
    // var subcat;
    // category=model.package_category;
    // category=model.document_category;
    // subcat=model.package_sub_cat;
    // subcat=model.document_sub_cat;
    formData.append('ship_mode_id', model.charges_final);
    formData.append('ship_cat_id', model.type);
    formData.append('delivery_mode_id', model.delivery_speed);
    if(model.package_category){
      formData.append('ship_subcat_id',model.package_category);
    }
    if(model.document_category){
      formData.append('ship_subcat_id',model.document_category);
    }

    if(model.package_sub_cat){
    formData.append('ship_sub_subcat_id',model.package_sub_cat);
    }
    if(model.document_sub_cat){
      formData.append('ship_sub_subcat_id',model.document_sub_cat);
      }

    formData.append('rate_type', "L");
    formData.append('location_from',model.state);
    formData.append('location_to',model.state_to);
console.log(formData)
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/ratelist_by_catsubcat',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log('Hii',res.data.rateList);
        // this.ShowToastMesage("Hello", 'warning', 5000);
        if(res.data?.message){
          this.ShowToastMesage(res.data?.message, 'warning', 5000);
          }
          
        model.RateList = res.data?.rateList as DeliveryRate[];
        model.Rate=model.RateList[0].rate;
       
        model.Insurance=model.RateList[0].insurance;
        model.TotalRate=parseInt(model.Rate);
        model.PackageRate=model.Rate;
     
  this.UpdateViewModel();
      })
      .catch((err => {
      
        // this.ShowToastMesage(err.data?.message, 'warning', 5000);
       
      })  );
  };
 AddFromItem = async () => {
  var ItemOBJ = new Item();
  var model = this.state.Model;
  if(model.type == '1')
  {
    if (!model.document_category) {
      this.ShowToastMesage(
      'Please Select Document category',
      'warning',
      5000,
      );
      return;
      } 
      if (!model.document_sub_cat) {
        this.ShowToastMesage(
        'Please Select Document subcategory',
        'warning',
        5000,
        );
        return;
        } 
        if (!model.document_item) {
          this.ShowToastMesage(
          'Please Select Document Item',
          'warning',
          5000,
          );
          return;
          } 
          if (!model.value_of_shipment_parcel_document) {
            this.ShowToastMesage(
            'Value of shipment is required ',
            'warning',
            5000,
            );
            return;
            }
            if (!model.value_of_shipment_parcel_document) {
              this.ShowToastMesage(
              'Value of shipment is required ',
              'warning',
              5000,
              );
              return;
              }  
              // if (!model.shipment_description_parcel_document) {
              //   this.ShowToastMesage(
              //   'Additional charge comment is required ',
              //   'warning',
              //   5000,
              //   );
              //   return;
              //   } 
              //   if (!model.additional_charge) {
              //     this.ShowToastMesage(
              //     'Additional charge is required ',
              //     'warning',
              //     5000,
              //     );
              //     return;
              //     }  
              //     if (!model.quantity) {
              //       this.ShowToastMesage(
              //       'quantity is required ',
              //       'warning',
              //       5000,
              //       );
              //       return;
              //       } 
  }

  if(model.type == '2')
  {
    if (!model.package_category) {
      this.ShowToastMesage(
      'Please Select package category',
      'warning',
      5000,
      );
      return;
      } 
      if (!model.package_sub_cat) {
        this.ShowToastMesage(
        'Please Select Package subcategory',
        'warning',
        5000,
        );
        return;
        } 
        if (!model.package_item) {
          this.ShowToastMesage(
          'Please Select package Item',
          'warning',
          5000,
          );
          return;
          } 
          if (!model.value_of_shipment_parcel_package) {
            this.ShowToastMesage(
            'Value of shipment is required ',
            'warning',
            5000,
            );
            return;
            }
         
              if (!model.shipment_description_parcel_package) {
                this.ShowToastMesage(
                'shipment description is required ',
                'warning',
                5000,
                );
                return;
                } 
              //   if (!model.referance_parcel) {
              //     this.ShowToastMesage(
              //     'Referance is required ',
              //     'warning',
              //     5000,
              //     );
              //     return;
              //     }  
                
                  if (!model.quantity) {
                    this.ShowToastMesage(
                    'quantity is required ',
                    'warning',
                    5000,
                    );
                    return;
                    } 
                    if (!model.height) {
                      this.ShowToastMesage(
                      'height is required ',
                      'warning',
                      5000,
                      );
                      return;
                      } 
                      if (!model.weight) {
                        this.ShowToastMesage(
                        'weight is required ',
                        'warning',
                        5000,
                        );
                        return;
                        } 
                        if (!model.breadth) {
                          this.ShowToastMesage(
                          'breadth is required ',
                          'warning',
                          5000,
                          );
                          return;
                          } 
                          if (!model.length) {
                            this.ShowToastMesage(
                            'length is required ',
                            'warning',
                            5000,
                            );
                            return;
                            } 


                            if (!model.heightType) {
                              this.ShowToastMesage(
                              'height dimension is required ',
                              'warning',
                              5000,
                              );
                              return;
                              } 
                              if (!model.weightType) {
                                this.ShowToastMesage(
                                'weight dimension is required ',
                                'warning',
                                5000,
                                );
                                return;
                                } 
                                if (!model.breadthType) {
                                  this.ShowToastMesage(
                                  'breadth dimension is required ',
                                  'warning',
                                  5000,
                                  );
                                  return;
                                  } 
                                  if (!model.lengthType) {
                                    this.ShowToastMesage(
                                    'length dimension is required ',
                                    'warning',
                                    5000,
                                    );
                                    return;
                                    } 
  }
  if(model.package_item){
    var PackageItemName = model.ItemList.find(i => i.cat_id === this.state.Model.package_item);
    ItemOBJ.PackageItemName=PackageItemName.category_name;
  }
  if(model.document_item){
  var DocumentItemName = model.ItemList.find(i => i.cat_id === this.state.Model.document_item);
ItemOBJ.DocumentItemName=DocumentItemName.category_name;
 }

 if(model.package_category){
  var PackageCatName = model.CategoryList.find(i => i.cat_id === this.state.Model.package_category);
  ItemOBJ.PackageCategoryName=PackageCatName.category_name;
}
if(model.document_category){
var DocumentCatName = model.CategoryList.find(i => i.cat_id === this.state.Model.document_category);
ItemOBJ.DocumentCategoryName=DocumentCatName.category_name;
}

if(model.package_sub_cat){
  var PackageSubCatName = model.SubCategoryList.find(i => i.cat_id === this.state.Model.package_sub_cat);
  ItemOBJ.PackageSubCategoryName=PackageSubCatName.category_name;
}
if(model.document_sub_cat){
var DocumentSubCatName = model.SubCategoryList.find(i => i.cat_id === this.state.Model.document_sub_cat);
ItemOBJ.DocumentSubCategoryName=DocumentSubCatName.category_name;
}

 ItemOBJ.document_category=model.document_category;
 ItemOBJ.document_sub_cat=model.document_sub_cat;
 ItemOBJ.document_item=model.document_item;
 ItemOBJ.other_details_document=model.other_details_document;
 ItemOBJ.value_of_shipment_parcel_document=model.value_of_shipment_parcel_document;
 ItemOBJ.shipment_description_parcel_document=model.shipment_description_parcel_document;
 ItemOBJ.protect_parcel_document=this.state.protect_parcel_document?.toString();
 ItemOBJ.package_category=model.package_category;
 ItemOBJ.package_sub_cat=model.package_sub_cat;
 ItemOBJ.package_item=model.package_item;
 ItemOBJ.other_details_parcel=model.other_details_parcel;
 ItemOBJ.shipment_description_parcel_package=model.shipment_description_parcel_package;

 ItemOBJ.value_of_shipment_parcel_package=model.value_of_shipment_parcel_package

 ItemOBJ.protect_parcel_package=this.state.protect_parcel_package?.toString() ;
 ItemOBJ.referance_parcel=model.referance_parcel;
 ItemOBJ.length=model.length;
 ItemOBJ.breadth=model.breadth;
 ItemOBJ.height=model.height;
 ItemOBJ.weight=model.weight;
 ItemOBJ.lengthType=model.lengthType;
 ItemOBJ.breadthType=model.breadthType;
 ItemOBJ.heightType=model.heightType;
 ItemOBJ.weightType=model.weightType
 if(model.type=='1'){
  ItemOBJ.quantity= '1';
 }
 if(model.type=='2'){
 ItemOBJ.quantity=model.quantity;
 }
 if(model.TotalRate && !model.TotalPackageRate){
 
  ItemOBJ.rates=model.TotalRate.toString();
}
if(model.TotalPackageRate){

  ItemOBJ.rates=model.TotalPackageRate.toString();
}
//  ItemOBJ.rates=model.rates;
 model.shipment_type_option=model.type;
 ItemOBJ.type=model.shipment_type_option;


 model.ItemFrom = model.ItemFrom.concat(ItemOBJ);
console.log("Selected Item",model.ItemFrom)
this.setState({protect_parcel_package: false});
this.setState({protect_parcel_document: false});
  model.document_category = '';
  model.package_category = '';
  model.document_sub_cat = '';
  model.package_sub_cat = '';
  model.shipment_description_parcel_document = ''; 
model.Rate='';
  model.item_id = '';
  model.document_item = '';
  model.package_item = '';
  model.value_of_shipment_parcel_document = '';
  model.other_details_document = '';
  model.protect_parcel_document = false;
  model.protect_parcel_package = false;

  model.additional_charge = '';
  model.TotalRate=undefined;
  model.TotalPackageRate=undefined;
  model.other_details_parcel = '';
  model.shipment_description_parcel_package = '';
  model.value_of_shipment_parcel_package = '';
  model.referance_parcel = '';
  model.length = '';
  model.breadth = '';
  model.height = '';
  model.weight = '';
  // model.lengthType = '';
  // model.breadthType = '';
  // model.heightType = '';
  // model.weightType = '';
  model.quotation_id = '';
  model.quantity = '';
  // model.type= '';

model.type= '';
  // model.location_state_from:string = '';
  // model.location_state_to:string = '';
  // model.delivery_speed:string = '';
  // model.charges_final:string= '';
  model.rates = '';
  this.UpdateViewModel();
  }
//   UpdateItem = async () => {
//     var model = this.state.Model;

//     const formData = new FormData();
//     // formData.append('charges_final', model.charges_final);
//     formData.append('delivery_speed', model.delivery_speed);
//     formData.append('location_state_from', model.location_state_from);
//     formData.append('location_state_to', model.location_state_to);
//     // formData.append('item_id', model.item_id);
//     formData.append('quantity', model.quantity);
//     formData.append('quotation_id', model.quotation_id);
//     formData.append('parcel_type', model.type);

//     formData.append('document_category', model.document_category);
//     formData.append('document_sub_cat', model.document_sub_cat);
//     formData.append('document_item', model.document_item);

//     formData.append(
//       'shipment_description_parcel',
//       model.additional_charge_comment,
//     );
//     formData.append('charges_final', model.additional_charge);
//     formData.append(
//       'value_of_shipment_parcel',
//       model.value_of_shipment_parcel_doc,
//     );
//     formData.append(
//       'protect_parcel',
//       this.state.protect_parcel_doc?.toString(),
//     );

//     formData.append('package_category', model.package_category);
//     formData.append('package_sub_cat', model.package_sub_cat);
//     formData.append('package_item', model.package_item);
//     formData.append('package_category', model.package_category);
//     formData.append('package_sub_cat', model.package_sub_cat);
//     formData.append('package_item', model.package_item);

//     formData.append('other_details_parcel', model.other_details_parcel);
//     formData.append(
//       'shipment_description_parcel',
//       model.shipment_description_parcel,
//     );
//     formData.append(
//       'value_of_shipment_parcel',
//       model.value_of_shipment_parcel_pack,
//     );
//     formData.append(
//       'protect_parcel',
//       this.state.protect_parcel_pack?.toString(),
//     );
//     formData.append('referance_parcel', model.referance_parcel);
//     formData.append('length', model.length);
//     formData.append('height', model.height);
//     formData.append('weight', model.weight);
//     formData.append('breadth', model.breadth);
//     formData.append('length_dimen', 'CM');
//     formData.append('breadth_dimen', 'CM');
//     formData.append('height_dimen', 'CM');
//     formData.append('weight_dimen', 'CM');
// console.log(formData);
//     var config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };
//     this.ShowPageLoader(true);
//     Axios.post(
//       'http://staging-rss.staqo.com/api/AddItemToQuote',
//       formData,
//       config,
//     )
//       .then((res) => {
//         this.ShowPageLoader(false);
//         // model.ItemList = res.data?.ItemList as RoyalSerryItemCat[];
//         this.ShowToastMesage(res.data?.message, 'warning', 5000);
//         console.log(JSON.stringify(res.data, null, 4));
//         console.log(JSON.stringify(res, null, 4));
//         // this.ShowToastMesage('Login Successfully', 'warning', 5000);
//         // this.props.navigation.navigate('AllOrderPage')
//         this.UpdateViewModel();
//       })
//       .catch((err) => {
//         this.ShowPageLoader(false);
//         this.ShowToastMesage(err.data?.message, 'warning', 5000);
//       });
//   };

  handleProtectParcel = () => {
    this.setState({protect_parcel_document: !this.state.protect_parcel_document});
    console.log("Bool",this.state.protect_parcel_document)
    // if(this.state.protect_parcel_document===undefined && !this.state.protect_parcel_document){
    //   this.setState({protect_parcel_document: true});
    //   return
    // }
    console.log("Bool",this.state.protect_parcel_document )
    if(this.state.protect_parcel_document==true ){
      var model = this.state.Model;
      model.TotalRate=parseInt(model.Rate)
      this.UpdateViewModel();
    }
    if(this.state.protect_parcel_document==false || this.state.protect_parcel_document===undefined){
    
      var model = this.state.Model;
      model.TotalRate=parseInt(model.Rate) + parseInt(model.Insurance)
      this.UpdateViewModel();
    }

  };
  handleProtectPack = () => {
    this.setState({protect_parcel_package: !this.state.protect_parcel_package});
  
    if(this.state.protect_parcel_package==true ){
      var model = this.state.Model;
      if(model.Rate){
        model.TotalPackageRate=parseFloat(model.Rate)
      }
      if(model.PackageRate){
      model.TotalPackageRate=parseFloat(model.PackageRate)
      }
      this.UpdateViewModel();
    }
    if(this.state.protect_parcel_package==false || this.state.protect_parcel_package===undefined ){
      var model = this.state.Model;
      var tot=parseFloat(model.Insurance)*parseFloat(model.quantity)


      model.TotalPackageRate=parseFloat(model.PackageRate)+tot
      this.UpdateViewModel();
    }
  };

  HandleCreate = async () => {
    var model = this.state.Model;
    console.log(model.type)
    var value = await SessionHelper.GetSession();
    const formData = new FormData();
    formData.append('location_type', model.location_type);
   
    formData.append('delivery_speed', model.delivery_speed);
    formData.append('customer_id', model.customer_id);
    formData.append('charges_final', model.charges_final);
    formData.append('user_id', value.user_id);
    formData.append('firstname', model.firstname);
    formData.append('lastname', model.lastname);
    formData.append('address_from', model.address_from);
    formData.append('address2', model.address2);
    formData.append('company_name', model.company_name);
    formData.append('country', model.country);
    formData.append('state', model.state);
    formData.append('city', model.city);
    formData.append('zip', model.zip);
    formData.append('email', model.email);
    formData.append('telephone', model.telephone);
    formData.append('address_type', model.address_type);
    formData.append('firstname_to', model.firstname_to);
    formData.append('lastname_to', model.lastname_to);
    formData.append('address_to', model.address_to);
    formData.append('address2_to', model.address2_to);
    formData.append('company_name_to', model.company_name_to);
    formData.append('country_to', model.country_to);
    formData.append('state_to', model.state_to);
    formData.append('city_to', model.city_to);
    formData.append('zip_to', model.zip_to);
    formData.append('email_to', model.email_to);
    formData.append('telephone_to', model.telephone_to);
    formData.append('address_type_to', model.address_type_to);
 
    let loopkey = -1;
    model.ItemFrom.forEach(function(i,index){
      
     if(index===0){
      // for (const [key, value] of Object.entries(i)) {
      //   formData.append(key,value);
      // }
      formData.append('shipment_type_option', i.type);
      if(i.type == '1'){
          formData.append('document_category', i.document_category);
    formData.append('document_sub_cat', i.document_sub_cat);
    formData.append('document_item', i.document_item);

    // formData.append(
    //   'shipment_description_parcel',
    //   i.additional_charge_comment,
    // );
    // formData.append('charges_final', model.additional_charge);
    formData.append(
      'value_of_shipment_parcel_document',
     i.value_of_shipment_parcel_document,
    );
    if(i.protect_parcel_document=='true'){
    formData.append(
      'protect_parcel_document',
      "1"
    )
  }
  if(i.protect_parcel_document=='false'){
    formData.append(
      'protect_parcel_document',
      "2"
    )
  } 
    formData.append(
      'quantity',
      "1"
    );
   
    }
    if(i.type == '2'){
    formData.append('package_category', i.package_category);
    formData.append('package_sub_cat', i.package_sub_cat);
    formData.append('package_item', i.package_item);
    // formData.append('package_category', i.package_category);
    // formData.append('package_sub_cat', i.package_sub_cat);
    // formData.append('package_item', i.package_item);

    formData.append('other_details_parcel', i.other_details_parcel);
    // formData.append(
    //   'shipment_description_parcel',
    //   i.shipment_description_parcel,
    // );
    formData.append(
      'value_of_shipment_parcel_package',
      i.value_of_shipment_parcel_package,
    );
    if(i.protect_parcel_document=='true'){
      formData.append(
        'protect_parcel_package',
      "1"
      );
    }
    if(i.protect_parcel_document=='false'){
      formData.append(
        'protect_parcel_package',
      "2"
      );
    }
  
    formData.append('referance_parcel', i.referance_parcel);
    formData.append('length', i.length);
    formData.append('height', i.height);
    formData.append('weight', i.weight);
    formData.append('breadth', i.breadth);
    formData.append('length_dimen', i.lengthType);
    formData.append('breadth_dimen', i.breadthType);
    formData.append('height_dimen', i.heightType);
    formData.append('weight_dimen', i.weightType);
    formData.append(
      'quantity',
      i.quantity
    );
    }
    formData.append('insurance',model.Insurance);
    // if(model.TotalRate && !model.TotalPackageRate){
    //   formData.append('rates', model.TotalRate.toString());
    // }
    // if(model.TotalPackageRate){
    //   formData.append('rates', model.TotalPackageRate.toString());
    // }
    formData.append('rates', i.rates);
    // formData.append('rates', model.TotalPackageRate.toString());
      
     }
     if(index!==0){
      // for (const [key, value] of Object.entries(i)) {
      //   formData.append(`${key}_${index}`,value);
      // }

      formData.append(`shipment_type_option_${index}`, i.type);
      if(i.type == '1'){
      formData.append(`document_sub_cat_${index}`, i.document_category);
      formData.append(`document_sub_cat_${index}`, i.document_sub_cat);
      formData.append(`document_item_${index}`, i.document_item);
  
      // formData.append(
      //   'shipment_description_parcel',
      //   i.additional_charge_comment,
      // );
      // formData.append(`charges_final_${index}`, model.additional_charge);
      formData.append(
        `value_of_shipment_parcel_document_${index}`,
       i.value_of_shipment_parcel_document,
      );
      if(i.protect_parcel_document=='true'){
        formData.append(
          `protect_parcel_document_${index}`,
          "1"
        );
      }
      if(i.protect_parcel_document=='false'){
        formData.append(
          `protect_parcel_document_${index}`,
          "2"
        );
      }
     
      formData.append(
        `quantity_${index}`,
      "1"
      );
      }
      if(i.type == '2'){
      formData.append(`package_category_${index}`, i.package_category);
      formData.append(`package_sub_cat_${index}`, i.package_sub_cat);
      formData.append(`package_item_${index}`, i.package_item);
      // formData.append(`package_category_${index}`, i.package_category);
      // formData.append(`package_sub_cat_${index}`, i.package_sub_cat);
      // formData.append(`package_item_${index}`, i.package_item);
  
      formData.append(`other_details_parcel_${index}`, i.other_details_parcel);
      // formData.append(
      //   'shipment_description_parcel',
      //   i.shipment_description_parcel,
      // );
      formData.append(
        `value_of_shipment_parcel_package_${index}`,
        i.value_of_shipment_parcel_package,
      );
      if(i.protect_parcel_package=='true'){
        formData.append(
          `protect_parcel_package_${index}`,
        "1"
        );
      }
      if(i.protect_parcel_package=='false'){
        formData.append(
          `protect_parcel_package_${index}`,
        "2"
        );
      }
    
      formData.append(`referance_parcel_${index}`, i.referance_parcel);
      formData.append(`length_${index}`, i.length);
      formData.append(`height_${index}`, i.height);
      formData.append(`weight_${index}`, i.weight);
      formData.append(`breadth_${index}`, i.breadth);
      formData.append(`length_dimen_${index}`, i.lengthType);
      formData.append(`breadth_dimen_${index}`, i.breadthType);
      formData.append(`height_dimen_${index}`, i.heightType);
      formData.append(`weight_dimen_${index}`, i.weightType);
      formData.append(
        `quantity_${index}`,
        i.quantity
      );
      }
      formData.append(`insurance_${index}`,model.Insurance);
      // if(model.TotalRate && !model.TotalPackageRate){
      //   formData.append(`rates_${index}`, model.TotalRate.toString());
      // }
      // if(model.TotalPackageRate){
      //   formData.append(`rates_${index}`, model.TotalPackageRate.toString());
      // }
      formData.append(`rates_${index}`,i.rates);
     }
     loopkey = loopkey+1
    })

    formData.append('loopkey', loopkey.toString());
  
    console.log("Hello form data===>",formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/creatQuote',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(JSON.stringify(res, null, 4));
        console.log(JSON.stringify(res.data, null, 4));
       
    
        this.ShowToastMesage(res.data?.message, 'warning', 5000);
    
        this.UpdateViewModel();
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "Drawer", screen: 'DasboardPage' }],
        });
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  createPDF = async (item: Item) => {
    
    var model = this.state.Model;
    model.document_category = item.document_category;
  model.package_category =item.package_category;
  model.document_sub_cat =item.document_sub_cat;
  model.package_sub_cat =item.package_sub_cat;
  model.shipment_description_parcel_document =item.shipment_description_parcel_document ; 

  model.item_id = item.item_id  ;
  model.document_item = item.document_item;
  model.package_item = item.package_item ;
  model.value_of_shipment_parcel_document = item.value_of_shipment_parcel_document;
  model.other_details_document = item.other_details_document;
 


  model.additional_charge = item.additional_charge;

  model.other_details_parcel = item.other_details_parcel;
  model.shipment_description_parcel_package = item.shipment_description_parcel_package;
  model.value_of_shipment_parcel_package =item.value_of_shipment_parcel_package;
  model.referance_parcel = item.referance_parcel;
  model.length = item.length ;
  model.breadth =item.breadth;
  model.height = item.height;
  model.weight = item.weight;
  model.quotation_id = item.quotation_id ;
  model.quantity = item.quantity;
  model.type= item.type;

  model.rates = item.rates;
  if(model.package_item){
    var PackageItemName = model.ItemList.find(i => i.cat_id === this.state.Model.package_item);
    model.ItemName=PackageItemName.category_name;
  }
  if(model.document_item){
  var DocumentItemName = model.ItemList.find(i => i.cat_id === this.state.Model.document_item);
model.ItemName=DocumentItemName.category_name;
 }
  model.ItemFrom=model.ItemFrom.filter((item) => item.DocumentItemName !== model.ItemName);
  model.ItemFrom=model.ItemFrom.filter((item) => item.PackageItemName !== model.ItemName);
  // var objIndex = model.ItemFrom.findIndex((obj => obj.item_id == model.item_id));
  // model.ItemFrom.splice(objIndex , 1)
  this.UpdateViewModel();
  }
  Delete = async (item: Item) => {
    
    var model = this.state.Model;
  //   if(model.package_item){
  //     var PackageItemName = model.ItemList.find(i => i.cat_id === this.state.Model.package_item);
  //     model.ItemName=PackageItemName.category_name;
  //   }
  //   if(model.document_item){
  //   var DocumentItemName = model.ItemList.find(i => i.cat_id === this.state.Model.document_item);
  // model.ItemName=DocumentItemName.category_name;
  //  }
  if(item.DocumentItemName){
    model.ItemFrom=model.ItemFrom.filter((i) => i.DocumentItemName !== item.DocumentItemName);
  }
if(item.PackageItemName){
  model.ItemFrom=model.ItemFrom.filter((i) => i.PackageItemName !== item.PackageItemName);
}
  // var objIndex = model.ItemFrom.findIndex((obj => obj.item_id == model.item_id));
  // model.ItemFrom.splice(objIndex , 1)
  this.UpdateViewModel();
  }
  render() {
    var model = this.state.Model;
    // console.log(this.state.protect_parcel_doc?.toString());


    var dimlist = dim.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
    var dimlist2 = dim.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
    var dimlist3 = dim.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
    console.log(dimlist)
    var weightdimlist = weightdim.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
if(model.CategoryList){
    var CategoryList = model.CategoryList?.map((i, k) => {
      return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
    });
}
var SubCategoryList
if(model.SubCategoryList){
   SubCategoryList = model.SubCategoryList?.map((i, k) => {
      return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
    });
}
if(model.ItemList){
    var ItemList = model.ItemList?.map((i, k) => {
      return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
    });
}
if(model.height){
  var totalDim=parseInt(model.length)*parseInt(model.breadth)*parseInt(model.height);
  console.log("TotalDim",totalDim)
var div=totalDim/5000;
console.log("div",div)
var ratefactor=div*parseFloat(model.RateFactor.amount);
console.log("ratefactor",ratefactor)
console.log("rate",model.Rate)
var ratevalue=ratefactor+parseInt(model.Rate);
console.log("ratevalue",ratevalue)
var qty=ratevalue*parseFloat(model.quantity)
console.log("qty",qty)
var PackageRate=qty;
model.PackageRate=PackageRate.toFixed(2).toString();


console.log(div)

}
console.log('item',model?.RateFactor?.amount)

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
        <Modal isVisible={true} coverScreen={false} backdropOpacity={0} onBackButtonPress={() => { this.props.navigation.goBack() }}>
    
          <View
            style={{
              height: '80%',
              marginTop: '50%',
              backgroundColor: BaseColor.ColorGrey,
            }}>
            <Content>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 10,
                  // marginLeft:'30%',
                  alignSelf: 'center',
                  fontWeight: '600',
                  color: BaseColor.ColorGreyDeep,
                }}>
            Start Shipment
              </Text>
              <View style={{margin: 10}}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: '5%',
                      color: BaseColor.ColorRed,
                      fontSize: 13,
                    }}>
                   Parcel Details
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
                        3
                      </Text>
                    </View>
                  </View>
                  </View>
               
                    <View>
              <View style={{margin: 10}}>
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
                                  selected={model.type === i.Value}
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
              
              </View>
              {model.type == '1' && (
                   <KeyboardAwareScrollView     extraHeight={120} enableOnAndroid={true} >
                <View style={{margin: 10}}>
                  <LongCustomPicker
                    Name="document_category"
                    LabelText="Document Category"
                    selectedValue={model.document_category}
                    onValueChange={this.LoadSubcategory}
                    IsRequired={true}
                    IsNullable={true}
                    Data={CategoryList}
                  />
                  <LongCustomPicker
                    Name="document_sub_cat"
                    LabelText="Document Subcategory"
                    selectedValue={model.document_sub_cat}
                    onValueChange={this.LoadItemList}
                    IsRequired={true}
                    IsNullable={true}
                    Data={SubCategoryList}
                  />
                  <LongCustomPicker
                    Name="document_item"
                    LabelText="Document Item"
                    selectedValue={model.document_item}
                    onValueChange={this.SetModelValueX}
                    IsRequired={true}
                    IsNullable={true}
                    Data={ItemList}
                  />
                  <CustomInput
                    Name="value_of_shipment_parcel_document"
                    LabelText="Value Of Your Shipment"
                    OnChangeText={this.SetModelValueX}
                    value={model.value_of_shipment_parcel_document}
                    // IsRequired={true}
                  />
                  {/* <CustomInput
                    Name="shipment_description_parcel_document"
                    LabelText="Additional charge comment"
                    OnChangeText={this.SetModelValueX}
                    value={model.shipment_description_parcel_document}
                    // IsRequired={true}
                  />
                  <CustomInput
                    Name="additional_charge"
                    LabelText="Additional charge "
                    OnChangeText={this.SetModelValueX}
                    value={model.additional_charge}
                    // IsRequired={true}
                  />
                   <CustomInput
                    Name="quantity"
                    LabelText="Quantity"
                    OnChangeText={this.SetModelValueX}
                    value={model.quantity}
                    //   IsRequired={true}
                  /> */}
                  <Text  style={{
                      fontSize: 16,
                      marginTop: 10,
                      // marginLeft:'30%',
                      alignSelf: 'center',
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>Value of Your Shipment</Text>
                    <View style={{flexDirection:'row',margin:'5%'}}>
                    <Text style={{marginTop:'2%',color:BaseColor.ColorRed}}>Item Price</Text>
                      <Text style={{marginTop:'2%'}}> $</Text>
                      <View style={{height:35,width:75,backgroundColor:BaseColor.ColorWhite,marginLeft:'5%',justifyContent:'center'}}>
                      <Text style={{alignSelf:'center'}}>{model.Rate}</Text>
                      </View>
                    </View>
                  <CustomCheckBox
                    selected={this.state.protect_parcel_document}
                    onPress={this.handleProtectParcel}
                    text="Protect Your Shipment"
                  />
                   <View style={{flexDirection:'row',margin:'5%'}}>
                   <Text style={{marginTop:'2%',color:BaseColor.ColorRed}}>Charges</Text>
                      <Text style={{marginTop:'2%',marginLeft:'2%'}}>$</Text>
                      <View style={{height:35,width:75,backgroundColor:BaseColor.ColorWhite,marginLeft:'5%',justifyContent:'center'}}>
                      <Text style={{alignSelf:'center'}}>{model.TotalRate}</Text>
                      </View>
                    </View>
                </View>
              </KeyboardAwareScrollView>
              )}
              {model.type == '2' && (
                      <KeyboardAwareScrollView     enableOnAndroid={true} >
                <View style={{margin: 10}}>
                  <LongCustomPicker
                    Name="package_category"
                    LabelText="Package Category"
                    selectedValue={model.package_category}
                    onValueChange={this.LoadSubcategory}
                    // IsRequired={true}
                    IsNullable={true}
                    Data={CategoryList}
                  />
                  <LongCustomPicker
                    Name="package_sub_cat"
                    LabelText="Package Subcategory"
                    selectedValue={model.package_sub_cat}
                    onValueChange={this.LoadItemList}
                    // IsRequired={true}
                    IsNullable={true}
                    Data={SubCategoryList}
                  />
                  <LongCustomPicker
                    Name="package_item"
                    LabelText="Package Item"
                    selectedValue={model.package_item}
                    onValueChange={this.SetModelValueX}
                    // IsRequired={true}
                    IsNullable={true}
                    Data={ItemList}
                  />
                  <CustomInput
                    Name="value_of_shipment_parcel_package"
                    LabelText="Value Of Your Shipment"
                    OnChangeText={this.SetModelValueX}
                    value={model.value_of_shipment_parcel_package}
                    //   IsRequired={true}
                  />
                  <CustomInput
                    Name="shipment_description_parcel_package"
                    LabelText="Shipment Description"
                    OnChangeText={this.SetModelValueX}
                    value={model.shipment_description_parcel_package}
                    //   IsRequired={true}
                  />
                  <CustomInput
                    Name="referance_parcel"
                    LabelText="Reference"
                    OnChangeText={this.SetModelValueX}
                    value={model.referance_parcel}
                    //   IsRequired={true}
                  />
                  <CustomInput
                    Name="other_details_parcel"
                    LabelText="Other Details"
                    OnChangeText={this.SetModelValueX}
                    value={model.other_details_parcel}
                    //   IsRequired={true}
                  />
                  <CustomInput
                    Name="quantity"
                    LabelText="Quantity"
                    OnChangeText={this.SetModelValueX}
                    value={model.quantity}
                    //   IsRequired={true}
                  />
                
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      // marginLeft:'30%',
                      alignSelf: 'center',
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    Dimension
                  </Text>
                  <View
                    style={{
                      backgroundColor: BaseColor.ColorWhite,
                      marginTop: 5,
                    }}>
                    <View style={{margin: 5}}>
                      <View style={{flexDirection:'row'}}>
                        <View style={{width:'60%'}}>
                      <CustomInput
                        Name="length"
                        LabelText="Length"
                        OnChangeText={this.SetModelValueX}
                        value={model.length}
                        //   IsRequired={true}
                      />
                      </View>
                      <View style={{width:'40%'}}>
                         <LongCustomPicker
                    Name="lengthType"
                    LabelText=" "
                    selectedValue={model.lengthType}
                    onValueChange={this.SetModelValueX}
                    // IsRequired={true}
                    // IsNullable={true}
                    Data={dimlist}
                  />
                  </View>
                  </View>
                  <View style={{flexDirection:'row'}}>
                        <View style={{width:'60%'}}>
                      <CustomInput
                        Name="breadth"
                        LabelText="Breadth"
                        OnChangeText={this.SetModelValueX}
                        value={model.breadth}
                        //   IsRequired={true}
                      />
                         </View>
                      <View style={{width:'40%'}}>
                         <LongCustomPicker
                    Name="breadthType"
                    LabelText=" "
                    selectedValue={model.breadthType}
                    onValueChange={this.SetModelValueX}
                    // IsRequired={true}
                    // IsNullable={true}
                    Data={dimlist2}
                  />
                  </View>
                  </View>

                  <View style={{flexDirection:'row'}}>
                        <View style={{width:'60%'}}>
                      <CustomInput
                        Name="height"
                        LabelText="Height"
                        OnChangeText={this.SetModelValueX}
                        value={model.height}
                        //   IsRequired={true}
                      />
                        </View>
                      <View style={{width:'40%'}}>
                          <LongCustomPicker
                    Name="heightType"
                    LabelText=" "
                    selectedValue={model.heightType}
                  
                    onValueChange={this.SetModelValueX}
                    // IsRequired={true}
                    // IsNullable={true}
                    Data={dimlist3}
                  />
                  </View>
                  </View>
                  <View style={{flexDirection:'row'}}>
                        <View style={{width:'60%'}}>
                      <CustomInput
                        Name="weight"
                        LabelText="Weight"
                        OnChangeText={this.SetModelValueX}
                        
                        value={model.weight}
                        //   IsRequired={true}
                      />
                        </View>
                      <View style={{width:'40%'}}>
                         <LongCustomPicker
                    Name="weightType"
                    LabelText=" "
                    selectedValue={model.weightType}
                    onValueChange={this.SetModelValueX}
                    // IsRequired={true}
                    // IsNullable={true}
                    Data={weightdimlist}
                  />
                  </View>
                  </View>
                    </View>
                  </View>
                  <Text  style={{
                      fontSize: 16,
                      marginTop: 10,
                      // marginLeft:'30%',
                      alignSelf: 'center',
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>Value Of Your Shipment</Text>
                    <View style={{flexDirection:'row',margin:'5%'}}>
                    <Text style={{marginTop:'2%',color:BaseColor.ColorRed}}>Item Price</Text>
                      <Text style={{marginTop:'2%'}}>$</Text>
                      <View style={{height:35,width:75,backgroundColor:BaseColor.ColorWhite,marginLeft:'5%',justifyContent:'center'}}>
                      <Text style={{alignSelf:'center'}}>{model.PackageRate}</Text>
                      </View>
                    </View>
                  <CustomCheckBox
                    selected={this.state.protect_parcel_package}
                    onPress={this.handleProtectPack}
                    text="Protect your shipment"
                  />
                   <View style={{flexDirection:'row',margin:'5%'}}>
                   <Text style={{marginTop:'2%',color:BaseColor.ColorRed}}>Total Charges</Text>
                      <Text style={{marginTop:'2%',marginLeft:'2%'}}>$</Text>
                      <View style={{height:35,width:75,backgroundColor:BaseColor.ColorWhite,marginLeft:'5%',justifyContent:'center'}}>
                      <Text style={{alignSelf:'center'}}>{model.TotalPackageRate}</Text>
                      </View>
                    </View>
                  {/* <CustomInput
                    Name="additional_charge"
                    LabelText="Additional Charge Comment"
                    OnChangeText={this.SetModelValueX}
                    value={model.additional_charge}
                    //   IsRequired={true}
                  />
                 */}
                </View>
                </KeyboardAwareScrollView>
              )}
              </View>
          
                   {/* <CustomInput
                    Name="charges_final"
                    LabelText="charges final"
                    OnChangeText={this.SetModelValueX}
                    value={model.charges_final}
                    //   IsRequired={true}
                  /> */}
             
              <View style={{margin: 10}}>
                <Text style={{alignSelf:'center'}}>
                {model.type &&(
                  <View>
                <Button
                  onPress={this.AddFromItem}
                  style={{
                    borderRadius: 10,
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: BaseColor.ColorGreen,
                    marginTop: 30,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                  <Text
                    style={{color: BaseColor.ColorWhite, fontWeight: '900'}}>
                    Add Item
                  </Text>
                </Button>
                </View>
               )} 
               </Text>
       {model.ItemFrom[0] &&(
         <View>
       <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    // marginLeft: '30%',
                    alignSelf: 'center',
                    fontWeight: '600',
                    color: BaseColor.ColorGreyDeep,
                  }}>
                  All Selected Item
                </Text>
              </TouchableOpacity>
              <FlatList
              data={model.ItemFrom}
              // style={ViewStyle.ThreegridView}
              extraData={model.IsPageLoading}
              // horizontal={true}
              // staticDimension={900}
              // fixed

              // spacing={16}
              //  refreshControl={
              //    <RefreshControl
              //        refreshing={model.IsPageLoading}
              //        onRefresh={this.LoadBrandList}
              //    />}
              renderItem={({item}) => (
                <View style={{borderColor:BaseColor.ColorGreyDeep,borderRadius:5,marginTop:5,borderWidth:1}}>
                  <View style={{marginLeft:'5%',marginTop:'5%'}}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>Item Name : </Text>
        
                    <Text
                      style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>
                      {item.DocumentItemName}
                    </Text>
                
                  
                    <Text
                      style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>
                      {item.PackageItemName}
                    </Text>
                   
                         </View>
                         <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>Category : </Text>
                    <Text
                      style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>
                      {item.DocumentCategoryName}
                    </Text>
                    <Text
                      style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>
                      {item.PackageCategoryName}
                    </Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>Sub Category : </Text>
                    <Text
                      style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>
                      {item.DocumentSubCategoryName}
                    </Text>
                    <Text
                      style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>
                      {item.PackageSubCategoryName}
                    </Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>  
                      QTY : 
                    </Text>
                    <Text style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>  
                    {item.quantity}
                    </Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>  
                    Total Charge :  
                    </Text>
                    <Text style={{fontSize: 13, color: BaseColor.ColorGreyDeep}}>  
                      {item.rates}
                    </Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row'}}>
                 
                  <Button
                    onPress={() => {
                      this.createPDF(item);
                    }}
                    style={{
                      // width: '32%',
// marginLeft:'40%',
                      backgroundColor: BaseColor.ColorGrey,
                        marginTop: '5%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 0.2,
                      borderColor: BaseColor.ColorWhite,
                      marginBottom:'2%'
                    }}>
                   <Text
                      style={{fontSize: 14, color: BaseColor.ColorGreen,fontWeight:'bold',}}>
                      Edit
                    </Text>
                  </Button>
                  <Button
                    onPress={() => {
                      this.Delete(item);
                    }}
                    style={{
                      // width: '32%',
// marginLeft:'40%',
                      backgroundColor: BaseColor.ColorGrey,
                        marginTop: '5%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 0.2,
                      borderColor: BaseColor.ColorWhite,
                      marginBottom:'2%'
                    }}>
                   <Text
                      style={{fontSize: 14, color: BaseColor.ColorGreen,fontWeight:'bold',}}>
                      Delete
                    </Text>
                  </Button>
               
                  </View>
                </View>
              )}/>
    
           
       
     
          

          
                <Button
                  onPress={this.HandleCreate}
                  style={{
                    borderRadius: 10,
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: BaseColor.ColorGreen,
                    marginTop: 30,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Icon8 name="account-key" size={20} color={BaseColor.ColorWhite} /> */}
                  <Text
                    style={{color: BaseColor.ColorWhite, fontWeight: '900'}}>
                    Create
                  </Text>
                </Button>
                </View>
                  )}
              </View>
            </Content>
          </View>
          

        </Modal>
      </View>
    );
  }
}
