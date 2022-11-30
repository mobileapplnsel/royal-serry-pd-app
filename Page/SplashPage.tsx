import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import AppIconImage from '../assets/AppIconImage';
import * as Animatable from 'react-native-animatable';
import BaseColor from '../Core/BaseTheme';
import ActivityIndicator from '../ActivityIndicatorExample'
import { CustomIndicator } from '../Control/Index';
import BaseComponent from '../Core/BaseComponent';
import { Container } from 'native-base';


export default class SplashPage extends BaseComponent<any, any>{

    constructor(props) {
        super(props);
        setTimeout(() => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'SellerLoginPage' }],
            });
        }, 2500);
    }
    render() {
        return (
            <Container>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={BaseColor.ColorWhite} translucent={true} />
                <View style={{ alignSelf: 'center', marginTop: 200 }}>
                    <Animatable.View animation="zoomIn" useNativeDriver={true} direction="alternate">
                        <AppIconImage />
                    </Animatable.View>
                    <CustomIndicator IsLoading={true} />
                </View>
            </Container>
        );
    }

    public static RouteName() {
        return "SplashPage"
    }
}