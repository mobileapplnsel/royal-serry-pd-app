import React, { Component } from 'react';
import { SafeAreaView, TouchableHighlight, View } from 'react-native';


import { CustomImage } from './Index';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import BaseColor from '../Core/BaseTheme';

export function EmptyCollectionPage(props: any) {
  var {
    EmptyText,
    IconName,
    IconOnClick,
    OnPress,
    TextOnPress,
    Child,
    IsLoading,
    ...rest
  } = props;

  //if UI on loading mode don't show exmpty view text
  if (IsLoading) {
    return (<></>)
  }

  if (!EmptyText) {
    EmptyText = 'No items found';
  }
  if (!IconName) {
    IconName = 'sad-tear';
  }
  return (
    <View
      onMagicTap={() => {
        OnPress && OnPress();
      }}
      style={{
        justifyContent: 'center',

        backgroundColor: BaseColor.ColorWhite,
      }}>
      <SafeAreaView style={{ margin: 20 }}>
        <IconFontAwesome
          onPress={() => {
            IconOnClick && IconOnClick();
          }}
          name={IconName}
          style={{
            marginTop: 5,
            fontSize: 70,
            alignSelf: 'center',
            color: BaseColor.ColorGreen,
          }}
        />


        <Text
          onPress={() => {
            TextOnPress && TextOnPress();
          }}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            color: BaseColor.ColorGreen,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          {EmptyText}
        </Text>
        {Child}
      </SafeAreaView>
    </View>
  );
}

EmptyCollectionPage.propTypes = {
  IsLoading: PropTypes.bool,
  IconName: PropTypes.string,
  EmptyText: PropTypes.string,
  IconOnPress: PropTypes.func,
  OnPress: PropTypes.func,
  TextOnPress: PropTypes.func,
  Child: PropTypes.any,
};
