import React from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  StyleSheet,
  RefreshControl,
  Modal,
  ActivityIndicator,
} from 'react-native';
 
import PropTypes from 'prop-types';

import * as Animatable from 'react-native-animatable';
import BaseColor from '../Core/BaseTheme';

export default function CustomModalIndicator(props) {
  const {IsLoading, ...rest} = props;

  return (
    <Modal animationType="fade" transparent={true} visible={IsLoading}>
      <View style={styles.modalContainer}></View>
      <View style={styles.activityIndicator}>
      <ActivityIndicator style={styles.activityIndicator} size="large" color={BaseColor.ColorRed}  animating={IsLoading} {...rest}></ActivityIndicator>
        {/* <Animatable.View
          animation="rotate"
          direction="normal"
          iterationCount="infinite"
          useNativeDriver={true}>
          <AppIconImage style={{maxHeight: 75, maxWidth: 75, opacity: 1}} />
        </Animatable.View> */}
      </View>
    </Modal>
  );
}

CustomModalIndicator.propTypes = {
  IsLoading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.2,
  },
});
