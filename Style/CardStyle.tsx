import React from 'react-native';

const { StyleSheet } = React;
import BaseColor from '../Core/BaseTheme';

export default {
 SearchCard:{
    backgroundColor: BaseColor.ColorWhite,
    borderRadius: 3,
    height: 35,
    marginLeft: 4,
    marginEnd: 4,
    marginTop: 0,
  },
  ProductVerticalCardStyle: {
    height: 220,
    maxWidth: 160,
    width: 160,
    alignItems: 'center',
    flex: 1,
    marginLeft:8,
    flexDirection: 'column',
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
  },
};
