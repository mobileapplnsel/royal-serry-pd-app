import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';



import { TouchableOpacity, Text } from 'react-native';
import BaseColor from '../Core/BaseTheme';


const CustomCheckBox = ({ selected, onPress, style, textStyle, size = 30, color = BaseColor.HeaderColor, text = '', ...props}) => (
    <TouchableOpacity style={[{
        flexDirection: 'row',
        alignItems: 'center'
    }, style]} onPress={onPress} {...props}>
        <Icon
            size={size}
            color={color}
            name={ selected ? 'check-box' : 'check-box-outline-blank'}
        />

        <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
)

export default CustomCheckBox