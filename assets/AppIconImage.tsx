import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

const AppIconImage = (props:any) => (
   <Image source={require('../assets/logo.png')}
      style={props.style??styles.DefaultStyle}
   />
)

const styles = StyleSheet.create({
   DefaultStyle: {
      // width: 250, height: 250
   }
})
export default AppIconImage