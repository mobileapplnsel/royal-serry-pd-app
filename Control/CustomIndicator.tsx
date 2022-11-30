
import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import BaseColor from '../Core/BaseTheme';


export interface CustomIndicatorProps {
    IsLoading: boolean,
}

export default function CustomIndicator(props: CustomIndicatorProps) {
    const {
        IsLoading,
        ...rest
    } = props;
    return (
        <ActivityIndicator style={styles.activityIndicator} size="large" color={BaseColor.ColorRed} animating={IsLoading} {...rest}></ActivityIndicator>
    )
}




const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25
    }
});
