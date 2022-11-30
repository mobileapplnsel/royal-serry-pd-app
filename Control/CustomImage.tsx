import React, { useState } from 'react';
import { StyleSheet, Image, NativeSyntheticEvent, ImageProgressEventDataIOS, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';
import PropTypes from "prop-types";
import { View } from 'native-base';
import NoPreviewImage from '../assets/NoPreviewImage';

export interface CustomImageProps {
    source: ImageSourcePropType;
    style?: StyleProp<ImageStyle>,
};


export default function CustomImage(props: CustomImageProps) {
    const {
        source,
        style,
        ...rest
    } = props;


    const [complete, setcomplete] = useState(true);

    const onStart = () => {
        setcomplete(false)
    }

    const onLoadEnd = () => {
        setcomplete(true)
    }



    return (
        <View>
            {
                !complete &&
                <Image source={NoPreviewImage} style={style} />
            }

            <Image source={source}
                onLoadStart={onStart}
                onLoadEnd={onLoadEnd}
                onLoad={onLoadEnd}
                style={complete ? style : styles.NoShow}
                {...rest}
            />
        </View>
    )
}




const styles = StyleSheet.create({
    NoShow: {
        display: "none",
        height: 0,
        width: 0
    }
});
