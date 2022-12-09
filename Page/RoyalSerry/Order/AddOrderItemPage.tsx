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
  quantity:string = '';
}

export default class AddOrderItemPage extends BaseComponent<
  any,
  AddOrderItemViewModel
> {
  constructor(props) {
    super(props);
    var model = new AddOrderItemViewModel();

    model.shipment_id = this.props.route?.params?.shipmentid;
   console.log(model.shipment_id);
    // this.state.Model.IsPageLoading = true;
    this.state = new BaseState(model);
  }
  componentDidMount() {
    var model = this.state.Model;
    this.setState({protect_parcel_doc: model.protect_parcel_doc});
    this.setState({protect_parcel_pack: model.protect_parcel_pack});

  
 
  }

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
    //  'http://staging-rss.staqo.com/api/item_cat_list_by_shipping_cat ',

    'https://irpl.biz/royal-serry-dev/api/item_cat_list_by_shipping_cat',

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
    //  'http://staging-rss.staqo.com/api/item_subcat_list_by_shipping_cat_itemcat',
    'https://irpl.biz/royal-serry-dev/api/item_subcat_list_by_shipping_cat_itemcat',

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
     // 'http://staging-rss.staqo.com/api/item_list_by_cat_type',
     'https://irpl.biz/royal-serry-dev/api/item_list_by_cat_type',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(res.data)
        if(res.data?.ItemList){
    
        model.ItemList = res.data.ItemList as RoyalSerryItemCat[];

        // this.ShowToastMesage('Login Successfully', 'warning', 5000);
  
        this.UpdateViewModel();}
        else{
          this.ShowToastMesage(res.data?.message, 'warning', 5000);
        }
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };

  UpdateItem = async () => {
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('item_id', model.item_id);
    formData.append('quantity', model.quantity);
    formData.append('shipment_id', model.shipment_id);
    formData.append('type', model.type);

    formData.append('document_category', model.document_category);
    formData.append('document_sub_cat', model.document_sub_cat);
    formData.append('document_item', model.document_item);

    formData.append(
      'additional_charge_comment',
      model.additional_charge_comment,
    );
    formData.append('additional_charge', model.additional_charge);
    formData.append(
      'value_of_shipment_parcel_doc',
      model.value_of_shipment_parcel_doc,
    );
    formData.append(
      'protect_parcel_doc',
      this.state.protect_parcel_doc?.toString(),
    );

    formData.append('package_category', model.package_category);
    formData.append('package_sub_cat', model.package_sub_cat);
    formData.append('package_item', model.package_item);
    formData.append('package_category', model.package_category);
    formData.append('package_sub_cat', model.package_sub_cat);
    formData.append('package_item', model.package_item);

    formData.append('other_details_parcel', model.other_details_parcel);
    formData.append(
      'shipment_description_parcel',
      model.shipment_description_parcel,
    );
    formData.append(
      'value_of_shipment_parcel_pack',
      model.value_of_shipment_parcel_pack,
    );
    formData.append(
      'protect_parcel_pack',
      this.state.protect_parcel_pack?.toString(),
    );
    formData.append('referance_parcel', model.referance_parcel);
    formData.append('length', model.length);
    formData.append('height', model.height);
    formData.append('weight', model.weight);
    formData.append('breadth', model.breadth);
    formData.append('length_dimen', 'CM');
    formData.append('breadth_dimen', 'CM');
    formData.append('height_dimen', 'CM');
    formData.append('weight_dimen', 'CM');
console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
     // 'http://staging-rss.staqo.com/api/addOrderItem',
      'https://irpl.biz/royal-serry-dev/api/addOrderItem',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        // model.ItemList = res.data?.ItemList as RoyalSerryItemCat[];
        this.ShowToastMesage(res.data?.message, 'warning', 5000);

        console.log(JSON.stringify(res, null, 4));
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);
        this.props.navigation.navigate('AllOrderPage')
        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };

  handleProtectParcel = () => {
    this.setState({protect_parcel_doc: !this.state.protect_parcel_doc});
  };
  handleProtectPack = () => {
    this.setState({protect_parcel_pack: !this.state.protect_parcel_pack});
  };
  render() {
    var model = this.state.Model;
    console.log(this.state.protect_parcel_doc?.toString());
    console.log(this.state.protect_parcel_pack?.toString());
    var OrderTypeList = data.map((i, k) => {
      return <Picker.Item label={i.name} key={k} value={i.Type} />;
    });
if(model.CategoryList){
    var CategoryList = model.CategoryList?.map((i, k) => {
      return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
    });
}
if(model.SubCategoryList){
    var SubCategoryList = model.SubCategoryList?.map((i, k) => {
      return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
    });
}
if(model.ItemList){
    var ItemList = model.ItemList?.map((i, k) => {
      return <Picker.Item label={i.category_name} key={k} value={i.cat_id} />;
    });
}
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
            Add Item
              </Text>
              <View style={{margin: 10}}>
                <LongCustomPicker
                  Name="type"
                  LabelText="Item Type"
                  selectedValue={model.type}
                  onValueChange={this.LoadCategoryList}
                  IsRequired={true}
                  IsNullable={true}
                  Data={OrderTypeList}
                />
              </View>
              {model.type == '1' && (
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
                    Name="value_of_shipment_parcel_doc"
                    LabelText="Value of your shipment"
                    OnChangeText={this.SetModelValueX}
                    value={model.value_of_shipment_parcel_doc}
                    // IsRequired={true}
                  />
                  <CustomInput
                    Name="additional_charge_comment"
                    LabelText="Additional charge comment"
                    OnChangeText={this.SetModelValueX}
                    value={model.additional_charge_comment}
                    // IsRequired={true}
                  />
                  <CustomInput
                    Name="additional_charge"
                    LabelText="Additional charge "
                    OnChangeText={this.SetModelValueX}
                    value={model.additional_charge}
                    // IsRequired={true}
                  />
                  <CustomCheckBox
                    selected={this.state.protect_parcel_doc}
                    onPress={this.handleProtectParcel}
                    text="Protect your shipment"
                  />
                </View>
              )}
              {model.type == '2' && (
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
                    LabelText="package Subcategory"
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
                    Name="value_of_shipment_parcel_pack"
                    LabelText="Value of your shipment"
                    OnChangeText={this.SetModelValueX}
                    value={model.value_of_shipment_parcel_pack}
                    //   IsRequired={true}
                  />
                  <CustomInput
                    Name="shipment_description_parcel"
                    LabelText="shipment description"
                    OnChangeText={this.SetModelValueX}
                    value={model.shipment_description_parcel}
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
                    LabelText="Other details"
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
                  <CustomCheckBox
                    selected={this.state.protect_parcel_pack}
                    onPress={this.handleProtectPack}
                    text="Protect your shipment"
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
                      <CustomInput
                        Name="length"
                        LabelText="Length"
                        OnChangeText={this.SetModelValueX}
                        value={model.length}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="breadth"
                        LabelText="Breadth"
                        OnChangeText={this.SetModelValueX}
                        value={model.breadth}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="height"
                        LabelText="Height"
                        OnChangeText={this.SetModelValueX}
                        value={model.height}
                        //   IsRequired={true}
                      />
                      <CustomInput
                        Name="weight"
                        LabelText="Weight"
                        OnChangeText={this.SetModelValueX}
                        value={model.weight}
                        //   IsRequired={true}
                      />
                    </View>
                  </View>
                  <CustomInput
                    Name="additional_charge"
                    LabelText="Additional Charge Comment"
                    OnChangeText={this.SetModelValueX}
                    value={model.additional_charge}
                    //   IsRequired={true}
                  />
                  <CustomInput
                    Name="additional_charge_comment"
                    LabelText="Additional Charge"
                    OnChangeText={this.SetModelValueX}
                    value={model.additional_charge_comment}
                    //   IsRequired={true}
                  />
                </View>
              )}
              <View style={{margin: 10}}>
                <Button
                  onPress={this.UpdateItem}
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
                    Add
                  </Text>
                </Button>
              </View>
            </Content>
          </View>
        </Modal>
      </View>
    );
  }
}
