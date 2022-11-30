import React from 'react';
import { Icon, Item, Label, Picker } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { View } from 'react-native-animatable';

export default function LongCustomPicker(props) {
  var {
    Name,
    LabelText,
    onValueChange,
    selectedValue,
    IsRequired,
    IsNullable,
    keyboardType,
    Data } = props;

  if (!selectedValue) {
    selectedValue = '';
  }

  React.useEffect(() => {
    setIsEmpty(selectedValue === '');
  });

  const [isEmpty, setIsEmpty] = React.useState(selectedValue === '');
  if (!LabelText) {
    LabelText =
      (IsRequired ? '' : '') +
      ' Choose ' +
      Name.match(/[A-Z][a-z]+|[0-9]+/g).join(' ').replace(' Id', '');
  }
  const OnChangeInternal = (text: any) => {
    var event = {
      name: Name,
      value: text,
    };
    setIsEmpty(text === '');

    onValueChange && onValueChange(event);
  };
  if (!IsNullable) {
    IsNullable = false
  }

  if (IsNullable) {
    Data.push(<Picker.Item label="Select" key="" value="" />)
  }

  return (
    <>
    <View
      style={{ margin: 0, padding: 0,marginLeft:'2%'}}>
      <Label style={{ marginTop: 5, color: "grey", fontWeight: "bold" ,fontSize:16}}>{LabelText}</Label>
      <Picker
      style={{
        height: 60,
        width: '100%',
        color: '#344953',
       
      }}
        // mode="dialog"
        // iosIcon={<Icon name="arrow-down" />}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => OnChangeInternal(itemValue)}>
        {Data}
      </Picker>
      </View>
      {/* {IsRequired && (
        <FontAwesomeIcon
          style={{ fontSize: 20, marginEnd: 10 }}
          color={isEmpty ? 'red' : 'green'}
          name={isEmpty ? 'close' : 'check'}
        />
      )} */}
    </>
  );
}

LongCustomPicker.propTypes = {
  Name: PropTypes.string.isRequired,
  LabelText: PropTypes.string,
  onValueChange: PropTypes.func,
  selectedValue: PropTypes.any,
  IsRequired: PropTypes.bool,
  Data: PropTypes.any.isRequired,
  IsNullable: PropTypes.bool
};
