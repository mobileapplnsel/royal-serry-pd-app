import React, { Component } from 'react';
import { View, StatusBar, ImageBackground,StyleSheet } from 'react-native';

import { Container } from 'native-base';
import BaseComponent from '../../../Core/BaseComponent';
import CustomIndicator from '../../../Control/CustomIndicator';
import BaseColor from '../../../Core/BaseTheme';



export default class Splash extends BaseComponent<any, any>{

    constructor(props) {
        super(props);
        setTimeout(() => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'LoginPage' }],
            });
        }, 3000);
    }
    render() {
        return (
            <Container>
            <StatusBar barStyle="dark-content" hidden={true} backgroundColor={BaseColor.ColorWhite} translucent={true} />
            <ImageBackground source={require('../../../assets/splash-screen.jpg')} style={styles.image}>
            <View style={{ alignSelf: 'center', marginTop: 200 }}>
                {/* <Animatable.View animation="zoomIn" useNativeDriver={true} direction="alternate">
                    <AppIconImage />
                </Animatable.View> */}
                <CustomIndicator IsLoading={true} />
            </View>
            </ImageBackground>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      width: '100%', height: '100%',
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    }
  });