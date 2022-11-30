import React from 'react';
import {
  View,
  StatusBar,
  Switch,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
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
import BaseComponent, { ConfirmBoxResult } from '../../../Core/BaseComponent';
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
  OrderPriceDetail,
  OrderStatu,
  OrderToDetail,
  order_price_details,
  RoyalSerryOrderDetails,
} from '../../../Entity/RoyalSerryOrderDetails.';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LongCustomPicker from '../../../Control/LongCustomPicker';
import SessionHelper from '../../../Core/SessionHelper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNPrint from 'react-native-print';
import RNFetchBlob from 'rn-fetch-blob';

const htmlcontent = `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  font-family: Arial;
  height: 100vh;
}
.coupon {
  border: 1px solid rgb(3, 3, 3);
  width: 80%;
  padding: 8px;
  display: block;
  margin: 0 auto;
  max-width: 600px;
  max-height: 95vh;
}
.container {
  padding: 2px 16px;
  background-color: #F1F1F1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(3, 3, 3);
}
.containerTwo{
  padding: 2px 16px;
  background-color: #F1F1F1;
  border: 1px solid rgb(3, 3, 3);
}
.containerThree{
  padding: 2px 16px;
  background-color: #F1F1F1;
  border: 1px solid rgb(3, 3, 3);
}
.containerFour{
  padding: 2px 16px;
  background-color: #F1F1F1;
  border: 1px solid rgb(3, 3, 3);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
ul{
    margin: 0px;
}
ul li{
    margin: 2px;
}
ul li p{
    font-size: 14px;
    font-weight: 400;
    margin: 6px;
}
h4{
    margin: 2px;;
}
.containerTwo ul{
    padding: 0px;
}
.containerThree ul{
    padding: 0px;
}
.image{
    width: 200px;
}
@media only screen and (max-width: 600px){
   .image{
       width: 100px;
   }
   ul li p{
       font-size: 12px;
   }
   ul{
       padding: 0!important;
   }
}
</style>
</head>
<body>
<div class="coupon">
  <div class="container">
    <img src="barcode.png" alt="Avatar" class="image">
    <ul style="list-style-type:none;">
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
    </ul>
  </div>
  <div class="containerTwo" style="background-color:white">
    <h4>Ship To</h4>
    <ul style="list-style-type:none;">
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
    </ul>
  </div>
  <div class="containerThree">
    <h4>Ship From</h4>
    <ul style="list-style-type:none;">
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
    </ul>
    <p style="text-align: center;">Legal Terms Goes Hear</p>
  </div>
  <div class="containerFour">
  
    <ul style="list-style-type:none;">
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
        <li><p>Recipient Name:Twst Bdhd</p></li>
    </ul>
  </div>
</div>
</body>
</html>
`;
const status = [
  {
    Name: 'Re-Schedule',
    ID: 'Rescheduled',
  },
  {
    Name: 'Returned',
    ID: 'Returned',
  },
  {
    Name: 'Undelivered',
    ID: 'Undelivered',
  },
];
const data = [
  {
    OrderNo: '123',
    Location: 'kolkata',
    Type: 'Pickup',
  },
  {
    OrderNo: '123',
    Location: 'kolkata',
    Type: 'Pickup',
  },
  {
    OrderNo: '123',
    Location: 'kolkata',
    Type: 'Pickup',
  },
];
export class OrderDetailsViewModel extends BaseViewModel {
  OrderId: string = '';
  OrderDetails: RoyalSerryOrderDetails;
  OrderFromDetail: OrderFromDetail;
  OrderToDetail: OrderToDetail;
  OrderItemDetail: OrderItemDetail[] = [];
  order_details: OrderDetail;
  order_status: OrderStatu;
  order_price_details: OrderPriceDetail;
  Type: any;
  Total: number = 0;
  isItemlist: boolean = false;
  changeStatus: string = '';
  comment: string = '';
  OrderNo:string = '';
}

export default class OrderDetailsPage extends BaseComponent<
  any,
  OrderDetailsViewModel
> {
  constructor(props) {
    super(props);
    var model = new OrderDetailsViewModel();

    model.OrderId = this.props.route?.params?.OrderIdId;
    model.Type = this.props.route?.params?.Type;
    console.log(model.OrderId);
    // this.state.Model.IsPageLoading = true;
    this.state = new BaseState(model);
  }

  componentDidMount() {

    this.LoadOrderList();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  }
  handleOpenModal = async () => {
    var model = this.state.Model;
    model.isItemlist = true;
    this.UpdateViewModel();
    // this.props.navigation.navigate('DashboardPage');

    // this.ShowToastMesage('Order Accepted ', 'success', 5000);
  };
  LoadOrderList = async () => {
    var model = this.state.Model;

    const formData = new FormData();
    formData.append('order_id', model.OrderId);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/viewOrderDetails ',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        model.OrderDetails = res.data?.orderDetails as RoyalSerryOrderDetails;
        model.OrderFromDetail = model.OrderDetails?.order_from_details[0];
        model.OrderToDetail = model.OrderDetails?.order_to_details[0];
        model.OrderItemDetail = model.OrderDetails
          ?.order_item_details as OrderItemDetail[];
        model.order_details = model.OrderDetails?.order_details[0];
        model.order_status = model.OrderDetails?.order_status[0];
        model.order_price_details = model.OrderDetails?.order_price_details[0];

        console.log(JSON.stringify(res.data?.orderDetails, null, 4));
        var a: any;
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);
        model.OrderItemDetail.forEach(function (i) {
          model.Total = model.Total + i.item_total;
          console.log('Total', model.Total);

          console.log(a);
        });

        this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        // this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  HandleUpdateStatus = async () => {
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
    const formData = new FormData();
    formData.append('order_id', model.OrderId);
    formData.append('branch_id', value.branch_id);
    formData.append('user_id', value.user_id);
    formData.append('status_text', model.changeStatus);
    formData.append('comment', model.comment);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/addCustomStatus',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(res.data?.message, 'warning', 5000);
        // model.OrderDetails = res.data?.orderDetails as RoyalSerryOrderDetails;
        console.log(res);
        model.isItemlist = false;
        this.UpdateViewModel();
        this.LoadOrderList();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  closeModal = () => {
    var model = this.state.Model;
    model.isItemlist = false;
    this.UpdateViewModel();
  };
  createPDF = async (item: OrderItemDetail) => {
    var model = this.state.Model;
    var logo = require('./../../../assets/nopreview.jpeg');
if(model.order_details?.payment_mode=="1"){
  var payment="Pay Later";
}
if(model.order_details?.payment_mode=="2"){
  var payment="Credit Card";
}
if(model.order_details?.payment_mode=="3"){
  var payment="Credit Amount";
}
  
var OrderNo = model.order_details?.shipment_no.replace("-","");
var PdfName=OrderNo.replace("/","");
var final=PdfName.replace("/","");
console.log(PdfName)
    console.log(JSON.stringify(model.OrderDetails, null, 4));
    let options = {
      html: `
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
      body {
        font-family: Arial;
        height: 100vh;
      }
      .coupon {
        border: 1px solid rgb(3, 3, 3);
        width: 80%;
        padding: 8px;
        display: block;
        margin: 0 auto;
        max-width: 600px;
        max-height: 95vh;
      }
      .container {
        padding: 2px 16px;
        background-color: #F1F1F1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 1px solid rgb(3, 3, 3);
      }
      .containerTwo{
        padding: 2px 16px;
        background-color: #F1F1F1;
        border: 1px solid rgb(3, 3, 3);
      }
      .containerThree{
        padding: 2px 16px;
        background-color: #F1F1F1;
        border: 1px solid rgb(3, 3, 3);
      }
      .containerFour{
        padding: 2px 16px;
        background-color: #F1F1F1;
        border: 1px solid rgb(3, 3, 3);
        display: flex;
        flex-direction: row;
        align-items: flex-start;
      }
      ul{
          margin: 0px;
      }
      ul li{
          margin: 2px;
      }
      ul li p{
          font-size: 14px;
          font-weight: 400;
          margin: 6px;
      }
      h4{
          margin: 2px;;
      }
      .containerTwo ul{
          padding: 0px;
      }
      .containerThree ul{
          padding: 0px;
      }
      .image{
          width: 200px;
      }
      @media only screen and (max-width: 600px){
         .image{
             width: 100px;
         }
         ul li p{
             font-size: 12px;
         }
         ul{
             padding: 0!important;
         }
      }
      </style>
      </head>
      <body>
      <div class="coupon">
        <div class="container">
          <img src= ${item.barcode_img} alt="Avatar" class="image">
          <ul style="list-style-type:none;">
              <li><p>${payment}</p></li>
              <li><p>Order${model.order_details?.shipment_no}</p></li>
              <li><p>Order date:${model.order_details?.created_date}</p></li>
          </ul>
        </div>
        <div class="containerTwo" style="background-color:white">
          <h4>Shipped To</h4>
          <ul style="list-style-type:none;">
          <li><p>Recipient Name:${model.OrderToDetail?.firstname} ${model.OrderToDetail?.lastname}</p></li>
          <li><p>Address line1:${model.OrderToDetail?.address}</p></li>
          <li><p>Address line2:${model.OrderToDetail?.address2}</p></li>
          <li><p>State City Zipcode:${model.OrderToDetail?.state_name},${model.OrderToDetail?.city_name},${model.OrderToDetail?.country_name},${model.OrderToDetail?.zip}</p></li>
          <li><p>Country:${model.OrderToDetail?.country_name}</p></li>
          <li><p>Contact No:${model.OrderToDetail?.telephone}</p></li>
          </ul>
        </div>
        <div class="containerThree">
          <h4>Billed To</h4>
          <ul style="list-style-type:none;">
          <li><p>Sender Name:${model.OrderFromDetail?.firstname} ${model.OrderFromDetail?.lastname}</p></li>
          <li><p>Address line1:${model.OrderFromDetail?.address}</p></li>
          <li><p>Address line2:${model.OrderFromDetail?.address2}</p></li>
          <li><p>State City CountryZipcode:${model.OrderFromDetail?.state_name},${model.OrderFromDetail?.city_name},${model.OrderFromDetail?.country_name},${model.OrderFromDetail?.zip}</p></li>
          <li><p>Country:${model.OrderFromDetail?.country_name}</p></li>
          <li><p>Contact No:${model.OrderFromDetail?.telephone}</p></li>

         
      </ul>
          <p style="text-align: center;">Legal Terms Goes Hear</p>
        </div>
        <div class="containerFour">
  
          <ul style="list-style-type:none;">
              <li><p>Service sold on:royalserry.com</p></li>
              <li><p>Royal Serry</p></li>
              <li><p>info@royalserry.com</p></li>
          </ul>
        </div>
      </div>
      </body>
      </html>
      `,
      fileName:'barcode-'+final,

      // directory: 'Documents',
      directory: 'Documents',
      base64: true,
    };
console.log(options);
    let file = await RNHTMLtoPDF.convert(options);
    console.log('file',file);
    let filePath = RNFetchBlob.fs.dirs.DownloadDir + '/barcode-'+model.order_details?.shipment_no+'.pdf';
    // let filePath = RNFetchBlob.fs.dirs.DownloadDir + '/testPDF.pdf';
    RNFetchBlob.fs
    .writeFile(filePath, file.base64, 'base64')
      .then((response) => {
        console.log('Success Log: ', response);
      })
      .catch((errors) => {
        console.log(' Error Log: ', errors);
      });
    console.log(file);
    // await RNPrint.print({filePath:file.filePath});
    // console.log(file.filePath);
    alert(file.filePath);
    // var path =file.filePath // absolute-path-to-my-local-file.
    // alert(path);
    // FileViewer.open(file.filePath)
    // .then(() => {
    //   alert('success');
    // })
    // .catch(error => {
    //   alert(error);
    //     // error
    // });
    // this.handleAllStudemt();
  };
  Pickup = async () => {
    var result = await this.ShowConfirmBox("Have you generated barcode for all items of the order? ")
    if (result === ConfirmBoxResult.Cancel) {
      return;
    }

  //   BackHandler.exitApp();
  // }

    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
    const formData = new FormData();
    formData.append('order_id', model.OrderId);
    formData.append('branch_id', value.branch_id);
    formData.append('user_id', value.user_id);
 

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/manualpickup',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(res.data?.message, 'warning', 5000);
        // model.OrderDetails = res.data?.orderDetails as RoyalSerryOrderDetails;
        console.log(res);
        // model.isItemlist = false;
        this.UpdateViewModel();
        this.props.navigation.navigate('AllOrderPage');
        // this.LoadOrderList();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };

  Delivery= async () => {
    var model = this.state.Model;
    var value = await SessionHelper.GetSession();
    const formData = new FormData();
    formData.append('order_id', model.OrderId);
    formData.append('branch_id', value.branch_id);
    formData.append('user_id', value.user_id);
 

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.ShowPageLoader(true);
    Axios.post(
      'http://staging-rss.staqo.com/api/manualdelivery',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(res.data?.message, 'warning', 5000);
        // model.OrderDetails = res.data?.orderDetails as RoyalSerryOrderDetails;
        console.log(res);
        // model.isItemlist = false;
        this.UpdateViewModel();
        this.props.navigation.navigate('AllOrderPage');
        // this.LoadOrderList();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  render() {
    var model = this.state.Model;
    var StatusList = status.map((i, k) => {
      return <Picker.Item label={i.Name} key={k} value={i.ID} />;
    });
    return (
      <View style={{height: '100%', backgroundColor: BaseColor.ColorWhite}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={BaseColor.ColorWhite}
          translucent={true}
        />
        <CustomModalIndicator IsLoading={model.IsPageLoading} />
        <Modal
          isVisible={model.isItemlist}
          onBackButtonPress={() => {
            this.props.navigation.goBack();
          }}>
          <View
            style={{
              height: '50%',
              width: '100%',
              backgroundColor: BaseColor.ColorWhite,
              borderRadius: 10,
            }}>
            <View style={{marginLeft: '10%'}}>
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 15,

                  fontWeight: '600',
                  color: BaseColor.ColorGreyDeep,
                }}>
                Order No : {model.order_details?.shipment_no}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 20,

                  fontWeight: '600',
                  color: BaseColor.ColorGreyDeep,
                  marginBottom: -20,
                }}>
                Select Order Status
              </Text>

              <CustomPicker
                Name="changeStatus"
                LabelText=""
                selectedValue={model.changeStatus}
                onValueChange={this.SetModelValueX}
                Data={StatusList}
              />
              <CustomInput
                Name="comment"
                LabelText="Comment"
                OnChangeText={this.SetModelValueX}
                value={model.comment}
                //   IsRequired={true}
              />
              <View style={{flexDirection: 'row'}}>
                <Button
                  onPress={this.HandleUpdateStatus}
                  style={{
                    width: 120,
                    height: 30,
                    backgroundColor: BaseColor.ColorGreen,
                    marginTop: '5%',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginEnd: '5%',
                    // marginLeft: '22%',
                  }}>
                  <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                    Update Status
                  </Text>
                </Button>
                <Button
                  onPress={this.closeModal}
                  style={{
                    width: 120,
                    height: 30,
                    backgroundColor: BaseColor.ColorRed,
                    marginTop: '5%',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginEnd: '5%',
                    // marginLeft: '22%',
                  }}>
                  <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                    Cancel
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
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
              <View style={{flexDirection: 'row'}}>
                {/* <View style={{flexDirection:'row',marginLeft:'30%'}}> */}
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    marginLeft: '35%',
                    alignSelf: 'center',
                    fontWeight: '600',
                    color: BaseColor.ColorGreyDeep,
                  }}>
                  Order Details
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginLeft: '10%'}}>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 15,

                    fontWeight: '600',
                    color: BaseColor.ColorGreyDeep,
                  }}>
                  {model.order_details?.shipment_no}
                </Text>
                {model.Type == '1' && (
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate('AddOrderItemPage', {
                        shipmentid: model.OrderId,
                      })
                    }
                    style={{
                      width: '40%',
                      height: '80%',
                      backgroundColor: BaseColor.ColorGreen,
                      marginTop: '5%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '21%',
                    }}>
                    <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                      Add Items
                    </Text>
                  </Button>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: '10%',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: 140}}>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 15,

                      fontWeight: '900',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    Customer Details
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.firstname +
                      ' ' +
                      model.OrderFromDetail?.lastname}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.telephone}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.email}
                  </Text>
                </View>
                <View style={{width: 140}}>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 15,
                      fontWeight: '900',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    From Location
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.address}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.address2}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.company_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.country_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.state_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.city_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderFromDetail?.zip}
                  </Text>
                </View>
              </View>
              {/* 2nd part */}
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: '10%',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 15,

                      fontWeight: '900',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.order_status?.status_name}
                  </Text>
                  {model.Type !== '1' && (
                  <Button
                    onPress={this.handleOpenModal}
                    style={{
                      width: 120,
                      height: 30,
                      backgroundColor: BaseColor.ColorGreen,
                      marginTop: '5%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginEnd: '5%',
                      // marginLeft: '22%',
                    }}>
                    <Text style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                      Update Status
                    </Text>
                  </Button>
                  )}
                </View>
                <View style={{marginEnd: '12%'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 15,
                      fontWeight: '900',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    To Location
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderToDetail?.address}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderToDetail?.address2}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderToDetail?.company_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderToDetail?.company_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderToDetail?.state_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderToDetail?.city_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    {model.OrderToDetail?.zip}
                  </Text>
                </View>
              </View>
              {/* #3rd part */}
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,

                  alignSelf: 'center',
                  fontWeight: '600',
                  color: BaseColor.ColorGreyDeep,
                }}>
                Parcel Details
              </Text>
              <FlatList
                data={model.OrderItemDetail}
                extraData={model.IsPageLoading}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '10%',
                      marginBottom: '5%',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{marginTop: 5}}>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 2,
                          fontWeight: '600',
                          color: BaseColor.ColorGreyDeep,
                        }}>
                        {item.item_name}
                      </Text>
                      {item.type == '2' && (
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              marginTop: 2,
                              fontWeight: '600',
                              color: BaseColor.ColorGreyDeep,
                            }}>
                           Weight: {item.weight+ ' ' + item.weight_dimen}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginTop: 2,
                              fontWeight: '600',
                              color: BaseColor.ColorGreyDeep,
                            }}>
                           Length: { item.length+ ' ' + item.length_dimen}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginTop: 2,
                              fontWeight: '600',
                              color: BaseColor.ColorGreyDeep,
                            }}>
                           height: {item.height + ',' + item.height_dimen}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginTop: 2,
                              fontWeight: '600',
                              color: BaseColor.ColorGreyDeep,
                            }}>
                           breadth: {item.breadth + ',' + item.breadth_dimen}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={{marginLeft: '10%'}}>
                      <Body>
                        {model.Type == '1' && (
                          <Button
                            onPress={() =>
                              this.props.navigation.navigate(
                                'EditOrderItemPage',
                                {
                                  Item: item,
                                },
                              )
                            }
                            style={{
                              width: 120,
                              height: 30,
                              backgroundColor: BaseColor.ColorGreen,
                              marginTop: '5%',
                              // alignContent: 'center',
                              // alignItems: 'center',
                              justifyContent: 'center',
                              // marginLeft: '22%',
                              marginEnd: '5%',
                            }}>
                            <Text
                              style={{
                                color: BaseColor.ColorWhite,
                                fontSize: 11,
                              }}>
                              Edit Item
                            </Text>
                          </Button>
                        )}

                        <Button
                          onPress={() => {
                            this.props.navigation.navigate('ScanBarcodePage',
                            {
                              OrderId: model.order_details?.id,
                             
                            }
                            );
                          }}
                          style={{
                            width: 120,
                            height: 30,
                            backgroundColor: BaseColor.ColorGreen,
                            marginTop: '5%',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginEnd: '5%',
                            // marginLeft: '22%',
                          }}>
                          <Text
                            style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                            Scan Barcode
                          </Text>
                        </Button>
                        <Button
                          onPress={() => {
                            this.createPDF(item);
                          }}
                          style={{
                            width: 120,
                            height: 30,
                            backgroundColor: BaseColor.ColorGreen,
                            marginTop: '5%',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginEnd: '5%',
                            // marginLeft: '22%',
                          }}>
                          <Text
                            style={{color: BaseColor.ColorWhite, fontSize: 11}}>
                            Print Barcode
                          </Text>
                        </Button>
                      </Body>
                    </View>
                  </View>
                )}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: '2%',
                  marginBottom: '10%',
                  marginTop: '5%',
                  marginEnd: '2%',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: '7%',
                      // alignSelf: 'center',
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    Total: ${model.order_price_details?.grand_total}
                  </Text>
                  {/* <Text
                    style={{
                      fontSize: 12,
                      marginTop: '7%',
                      alignSelf: 'center',
                      fontWeight: '600',
                      color: BaseColor.ColorGreyDeep,
                    }}>
                    Payable :{' '}
                    {model.Total -
                      parseFloat(model.order_price_details?.grand_total)}
                  </Text> */}
                </View>
                 {model.Type == '1' && (
                  <Button
                  onPress={this.Pickup}
                    style={{
                      width: '70%',
                      height: '70%',
                      backgroundColor: BaseColor.ColorGreen,
                      marginTop: '10%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // marginLeft: '2%',
                    }}>
                    <Text
                      style={{
                        color: BaseColor.ColorWhite,
                        fontSize: 9,
                        fontWeight: 'bold',
                      }}>
                      Pickup
                    </Text>
                  </Button>
                )} 
                   {model.Type == '2' && (
                  <Button
                  onPress={this.Delivery}
                    style={{
                      width: '70%',
                      height: '70%',
                      backgroundColor: BaseColor.ColorGreen,
                      marginTop: '10%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // marginLeft: '2%',
                    }}>
                    <Text
                      style={{
                        color: BaseColor.ColorWhite,
                        fontSize: 9,
                        fontWeight: 'bold',
                      }}>
                      Delivery
                    </Text>
                  </Button>
                )} 
                {/* {model.Type == '1' && (
                  <Button
                    style={{
                      width: '40%',
                      height: '70%',
                      backgroundColor: BaseColor.ColorGreen,
                      marginTop: '5%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '2%',
                    }}>
                    <Text
                      style={{
                        color: BaseColor.ColorWhite,
                        fontSize: 9,
                        fontWeight: 'bold',
                      }}>
                      Send Payment Link
                    </Text>
                  </Button>
                )} */} 
              </View>
            </Content>
          </View>
        </Modal>
      </View>
    );
  }
}
