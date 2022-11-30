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
import { FlatGrid } from 'react-native-super-grid';
import { EmptyCollectionPage } from '../../../Control/Index';

const data = [
  {
    icons: require('../../../assets/addproduct.png'),
    name: 'Pending Order',
    page: 'PendingOrderPage',
  },
  {
    icons: require('../../../assets/box.png'),
    name: 'All Order',
    page: 'AllAcceptedOrderPage',
  },
  {
    icons: require('../../../assets/warehouse.png'),
    name: 'Order History',
    page: 'AllOrderHistoryPage',
  },]
export class DeliveryBoySiginViewModel extends BaseViewModel {
//   PendingOrderList: OrderDeliveryBoyMapping[] = [];
//   DeliveryBoyName: string;
 }

export default class DasboardPage extends BaseComponent<
  any,
  DeliveryBoySiginViewModel
> {
  constructor(props) {
    super(props);
    this.state = new BaseState(new DeliveryBoySiginViewModel());
    // this.state.Model.IsPageLoading = true;
  }

  async componentDidMount() {
    // this.LoadPendingOrderList();
    // var deliveryBoy = await SessionHelper.GetDeliveryBoySession();
    // this.state.Model.DeliveryBoyName = deliveryBoy.Name;
    // this.UpdateViewModel();
  }

  // LoadPendingOrderList = async () => {
  //   var model = this.state.Model;
  //   var user = await SessionHelper.GetDeliveryBoySession();
  //   var requestEntity = new DeliveryBoyRequestEntity();

  //   requestEntity.DeliveryBoyId = user.DeliveryBoyId;
  //   requestEntity.SessionToken = user.ApiSessionToken;
  //   var res = await DeliveryBoyDataAccess.GetAllCurrentlyAssigned(
  //     requestEntity,
  //   );
  //   this.ShowPageLoader(false);

  //   this.ProcessResponseData(res, false);
  //   if (!res.IsSuccess) {
  //     return;
  //   }

  //   model.PendingOrderList = res.Data;
  //   this.UpdateViewModel();
  // };

  // HandleLogout = async () => {
  //   var result = await this.ShowConfirmBox('Do you want to logout?');

  //   if (result !== ConfirmBoxResult.OK) {
  //     return;
  //   }

  //   SessionHelper.SetDeliveryBoySession(null);
  //   this.props.navigation.navigate({name: 'AppShowCase'});
  //   this.ShowToastMesage(
  //     'You have been successfully logged out!!!',
  //     'success',
  //     2000,
  //   );
  // };

  // HandleAcceptRejectOrder = async (
  //   OrderDeliveryBoyMappingId: string,
  //   IsAccept: boolean,
  // ) => {
  //   var actionTaking = IsAccept ? 'Accept' : 'Reject';

  //   var result = await this.ShowConfirmBox(
  //     'You are about to ' + actionTaking + ' the order, are you sure?',
  //   );

  //   if (result !== ConfirmBoxResult.OK) {
  //     return;
  //   }

  //   var user = await SessionHelper.GetDeliveryBoySession();
  //   var requestEntity = new DeliveryOrderConfirmRequestEntity();

  //   requestEntity.SessionToken = user.ApiSessionToken;
  //   requestEntity.OrderConformation = actionTaking;
  //   requestEntity.OrderDeliveryBoyMappingId = OrderDeliveryBoyMappingId;
  //   this.ShowPageLoader(true);
  //   var res = await DeliveryBoyDataAccess.DoAcceptOrReject(requestEntity);
  //   this.ShowPageLoader(false);
  //   this.ProcessResponseData(res);

  //   if (!res.IsSuccess) {
  //     return;
  //   }
  //   this.LoadPendingOrderList();
  // };

  render() {
    var model = this.state.Model;
    return (
      <Container>
          <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={BaseColor.HeaderColor}
          translucent={true}
        />
        <CustomModalIndicator IsLoading={model.IsPageLoading} />
        <Content>
            <View style={ViewStyle.DoctorSearchListItem}>
              <ListItem style={{justifyContent: 'center'}}>
                <Body>
                  <Thumbnail
                    source={require('../../../assets/doctor.png')}
                    style={{marginLeft: '40%'}}
                  />

                  <View style={styles.RowView}>
                    <Text style={styles.CustomerName}>Rahul Roy</Text>

                  
                  </View>
                  {/* <Text style={styles.TextStyle}>Rahul@yopmail.com</Text>

              <Text style={styles.TextStyle}>9876543235</Text> */}
              
              <Button
                style={{backgroundColor: BaseColor.ColorPink, borderRadius: 10,alignSelf:'center',marginTop:5,height:35}}
                // onPress={this.HandleLogout}
                >
                <Text>Sign Out</Text>
              </Button>
                </Body>
              </ListItem>
             
              <FlatGrid
            data={data}
            style={ViewStyle.gridView}
            // staticDimension={300}
            // fixed
            itemDimension={100}
            spacing={16}
            renderItem={({item}) => {
              return (
                <View style={ViewStyle.DashboarditemContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate(item.page)}>
                    <CustomImage
                      source={item.icons}
                      style={{width: 90, height: 90, alignSelf: 'center'}}
                    />

                    <Text style={TextStyle.DashboarditemName}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

        
       
</View>
</Content>
{/* <Footer>
          <FooterTab style={{backgroundColor: BaseColor.ColorGreen}}>
            <Button
              // onPress={() =>
              //   this.props.navigation.navigate('DeliveryBoyOrderHistoryPage')
              // }
              >
              <Icon name="history" size={25} color={BaseColor.ColorWhite} />
              <Text style={{color: BaseColor.ColorWhite}}>Order History</Text>
            </Button>

            <Button
              // onPress={() =>
              //   this.props.navigation.navigate('DeliveryBoyProfilePage')
              // }
              >
              <Icon name="user-md" size={25} color={BaseColor.ColorWhite} />
              <Text style={{color: BaseColor.ColorWhite}}>My Profile</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  Icon: {
    fontSize: 80,
    alignSelf: 'center',
    color: BaseColor.HeaderColor,
  },
  RowView: {flexDirection: 'row', alignSelf: 'center'},
  CustomerName: {
    alignSelf: 'center',
    marginTop: 5,
    color: BaseColor.ColorGreen,

    fontSize: 17,
  },
});
