import React from 'react';
import { Input, Item, Label, Textarea, View } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardTypeOptions } from 'react-native';
import { ValueType } from './Index';


export interface CustomInputProps {
  Name: string,
  LabelText: string,
  OnChangeText?: (value: ValueType) => void,
  value?: any,
  IsRequired?: boolean,
  keyboardType?: KeyboardTypeOptions,
  Last?: boolean,
  IsDisabled?: boolean,
  IsTextArea?: boolean
};

export default function CustomInput(props: CustomInputProps) {



  var { Name, LabelText, OnChangeText, value, IsRequired, keyboardType, Last, IsDisabled, IsTextArea, ...rest } = props;

  if (!value) {
    value = '';
  }
  if (!IsDisabled) {
    IsDisabled = false
  }
  React.useEffect(() => {
    setIsEmpty(value === '')
  });

  const [isEmpty, setIsEmpty] = React.useState(value === '');
  if (!LabelText) {
    LabelText =
      (IsRequired ? '*' : '') +
      ' Enter ' +
      Name.match(/[A-Z][a-z]+|[0-9]+/g).join(' ');
  }
  const OnChangeInternal = (text: any) => {
    var event: ValueType = {
      name: Name,
      value: text,
    };
    setIsEmpty(text === '');

    OnChangeText && OnChangeText(event);
  };
  //console.log(value +":"+ isEmpty)
  var IsError = IsRequired && isEmpty;
  var IsSucess = IsRequired && !isEmpty;

  if (IsDisabled) {
    IsError = false
    IsSucess = false
  }
  return (
    <Item
      style={{ margin: 0, padding: 0, marginBottom: Last ? 5 : 0 }}
      stackedLabel
      disabled={IsDisabled}
      error={IsError}
      success={IsSucess}>
      <Label style={{ marginTop: 5, color: "grey", fontWeight: "bold" }}>{LabelText}</Label>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {
          !IsTextArea &&
          <Input disabled={IsDisabled} style={{ margin: 0, padding: 0 }} keyboardType={keyboardType} value={value + ""} onChangeText={OnChangeInternal} />
        }
        {
          IsTextArea &&
          <Textarea bordered={false} disabled={IsDisabled} underline={true} value={value + ""} onChangeText={OnChangeInternal} style={{ width: '90%', borderRadius: 5, }} rowSpan={4} />
        }
        {
          IsRequired && <FontAwesomeIcon style={{ fontSize: 20, marginEnd: 10 }} color={isEmpty ? "red" : "green"} name={isEmpty ? "close" : "check"} />
        }
      </View>
    </Item>
  );
}


