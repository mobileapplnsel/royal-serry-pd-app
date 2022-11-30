import Axios from 'axios';
import React, {Component} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';

import BarcodeScanner from 'react-native-scan-barcode';
import BaseComponent from '../../../Core/BaseComponent';
import BaseState from '../../../Core/BaseState';
import BaseViewModel from '../../../Core/BaseViewModel';
import SessionHelper from '../../../Core/SessionHelper';

export class ScanBarcodeViewModel extends BaseViewModel {
  torchMode: 'off';
  cameraType: 'back';
  user_id: string = '';
  branch_id: string = '';
  barcode: any;
  orderId: any;
  ItemId: any;
  showViewFinder: boolean = true;
  OrderID: string = '';
}

export default class ScanBarcodePage extends BaseComponent<
  any,
  ScanBarcodeViewModel
> {
  constructor(props) {
    super(props);

    var model = new ScanBarcodeViewModel();

    // this.state.Model.IsPageLoading = true;
    this.state = new BaseState(model);
    this.state.Model.OrderID = props.route.params.OrderId;
    console.log(this.state.Model.OrderID)
  }
  IsRecevied = false;
  componentDidMount() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    this.IsRecevied = false;
  }
  componentDidUpdate() {
    //this.IsRecevied=false
  }
  barcodeReceived = async (e: any) => {
    if (this.IsRecevied) {
      return;
    }
    var model = this.state.Model;

    // console.log(JSON.stringify(e));

    // console.log('Barcode: ' + e.data);
    // console.log('Type: ' + e.type);

    if (e.data) {
      this.IsRecevied = true;
      model.showViewFinder = false;
      this.UpdateViewModel();
      this.barcode(e.data);
    }
  };
  barcode = async (data: any) => {
    var model = this.state.Model;

    var value = await SessionHelper.GetSession();
    console.log(data);
    model.user_id = value.user_id;
    model.branch_id = value.branch_id;
    
    var orderId = data.substring(2, 9);
    // console.log(typeof orderIdfull);
    // var orderId = orderIdfull.replace(0, "");
    var ItemId = data.substring(9);
    console.log("OrderId"+orderId)
    const formData = new FormData();
    formData.append('user_id', model.user_id);
    formData.append('branch_id', model.branch_id);
    formData.append('order_id', orderId);
    formData.append('item_id', ItemId);
    formData.append('visited_order_id', model.OrderID);
    console.log(formData);
    var config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    Axios.post(
      'http://staging-rss.staqo.com/api/orderItemBarcodeScan',
      formData,
      config,
    )
      .then((res) => {
        this.ShowPageLoader(false);
        console.log(res.data);
        // model.ItemList = res.data?.ItemList as RoyalSerryItemCat[];
        this.ShowToastMesage(res.data?.message, 'warning', 5000);
        this.props.navigation.navigate('OrderDetailsPage');
        // console.log(JSON.stringify(res, null, 4));
        // this.ShowToastMesage('Login Successfully', 'warning', 5000);

        // this.UpdateViewModel();
      })
      .catch((err) => {
        this.ShowPageLoader(false);
        this.ShowToastMesage(err.data?.message, 'warning', 5000);
      });
  };
  render() {
    var model = this.state.Model;
    return (
      <BarcodeScanner
        onBarCodeRead={this.barcodeReceived}
        style={{flex: 1}}
        showViewFinder={model.showViewFinder}
        torchMode={model.torchMode}
        cameraType={model.cameraType}
      />
    );
  }
}
