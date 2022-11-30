import React, {Component} from 'react';
import {PermissionsAndroid, StyleSheet, Text, View,Image,} from 'react-native';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import BaseComponent from '../../../Core/BaseComponent';
import BaseState from '../../../Core/BaseState';
import BaseViewModel from '../../../Core/BaseViewModel';
import SessionHelper from '../../../Core/SessionHelper';

import RoyalSerryPickedOrder, { MapOrder } from '../../../Entity/RoyalSerryPickedOrder';
import Geolocation from '@react-native-community/geolocation';
// ...
const coordinates= [
    { name: 'Burger', latitude: 37.8025259, longitude: -122.4351431,  },
    { name: 'Pizza', latitude: 37.7946386, longitude: -122.421646 },
    { name: 'Soup', latitude: 37.7665248, longitude: -122.4165628,  },
    { name: 'Sushi', latitude: 37.7834153, longitude: -122.4527787,},
    { name: 'Curry', latitude: 37.7948105, longitude: -122.4596065,  },
  ]
  var alertInterval,LoadBeautyExecutiveInterval;
  export class AllOrderViewModel extends BaseViewModel {
    coordinate: any[]=[];
    coordinates: map[]=[];
    currentLocation: any;
    Drop: dropClass = new dropClass();
  }
  export class map {
    name: string='';
    latitude?: number;
    longitude?: number;
  }
  export class dropClass {
    latitude: any;
    longitude: any;
    latitudeDelta: 0.0922;
    longitudeDelta: 0.0421
  
  }
  export default class MapViewPage extends BaseComponent<
  any,
  AllOrderViewModel
> {
  constructor(props) {
    super(props);
    var model = new AllOrderViewModel();
    model.coordinates = this.props.route?.params?.coordinates;
    model.coordinate = this.props.route?.params?.coordinates;
  console.log("coordinates",model.coordinates)
    // this.state.Model.IsPageLoading = true;
    this.state = new BaseState(model);
  }
componentDidMount() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    LoadBeautyExecutiveInterval= setInterval(this.LoadBeautyExecutive, 4000);
    var model = this.state.Model;
    // var value = await SessionHelper.GetSession();
    Geolocation.getCurrentPosition(info => {
  
      model.currentLocation = info;
   console.log("info",info)
      model.Drop.latitude=model.currentLocation?.coords?.latitude;
      model.Drop.longitude=model.currentLocation?.coords?.longitude;
      // model.heading=model.currentLocation?.coords?.heading;
      
      this.UpdateViewModel();
      })
    }
    LoadBeautyExecutive = async () => {
      var model = this.state.Model;
    // var value = await SessionHelper.GetSession();
    Geolocation.getCurrentPosition(info => {
  
      model.currentLocation = info;
   console.log("info",info)
      model.Drop.latitude=model.currentLocation?.coords?.latitude;
      model.Drop.longitude=model.currentLocation?.coords?.longitude;
      // model.heading=model.currentLocation?.coords?.heading;
      
      this.UpdateViewModel();
      })
    }
    componentWillUnmount(): void {
      clearInterval(LoadBeautyExecutiveInterval)
  
  }
  render() {
    var model = this.state.Model;
    console.log(model.Drop,model.currentLocation )
    return (
        <MapView
        style={{flex:1}}
        initialRegion={{
          latitude: model.coordinates[0].latitude,
          longitude: model.coordinates[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
          
          <Polygon
            coordinates={model.coordinate}
            fillColor={'rgba(100, 100, 200, 0.3)'}
          />
       {
            model.coordinates.map((marker, index) => (
         
              <Marker
                key={marker.name}
                // ref={ref => this.state.markers[index] = ref}
                // onPress={() => this.onMarkerPressed(marker, index)}
                coordinate={{ latitude: marker?.latitude, longitude: marker?.longitude }}
              >
                <Callout>
                  <Text>{marker?.name}</Text>
                </Callout>

              </Marker>
         
            ))
          }
            {model?.Drop?.latitude && model?.Drop?.longitude &&(
          <Marker
        // coordinate={model.Drop}
        coordinate={{ latitude: model.Drop?.latitude, longitude: model.Drop?.longitude }}
            // coordinate={model.Drop}
          >
            <Image source={require('./car.png')} style={{ height: 45, width: 45 }} />
          </Marker>
         )} 
        </MapView>
    );}
}
