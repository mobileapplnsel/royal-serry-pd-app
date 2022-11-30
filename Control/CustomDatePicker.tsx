import React, { useState } from 'react';
import { Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


import { Input, Item, Label, Row, Textarea, View } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseProp from '../Core/BaseProp';
import BaseViewModel from '../Core/BaseViewModel';
import BaseComponent from '../Core/BaseComponent';
import BaseState from '../Core/BaseState';
import { DateTimeHelper } from '../Core/Index';

export class CustomDatePickerProps extends BaseProp {
  onDateChange: ({ name: string, value: Date }) => void;
  PlaceHolderText?: string;
  disabled?: boolean;
  value?: Date;
  Mode?: DateTimeType;
  IsRequired?: boolean;
  IsDisabled?: boolean;
  Name: string;
  MaxDate?: Date;
  MinDate?: Date;
}

export class CustomDatePickerViewModel extends BaseViewModel {
  //PropsData: CustomDatePickerProps;
  ActualMode: DateTimeType;
  Mode: DateTimeType;
  Value: Date;
  ActualValue?: Date;
  Label: string = "";
  Show: boolean = false;
  IsEmpty: boolean = true;
  PlaceHolderText: string = "Select Date & time";
  IsDisabled: boolean = false;
}

export default class CustomDatePicker extends BaseComponent<CustomDatePickerProps, CustomDatePickerViewModel>{
  constructor(props: CustomDatePickerProps) {
    super(props);
    var model = new CustomDatePickerViewModel();
    this.state = new BaseState(model);
  }

  componentDidMount() {
    this.HandleUpdateData(false);
  }

  componentDidUpdate() {
    this.HandleUpdateData(true);
  }

  HandleUpdateData = (FromUpdate: boolean) => {
    var model = this.state.Model;

    //console.log("FromUpdate",FromUpdate)
    //console.log("value",this.props.value)
    if ((FromUpdate && this.props.value === model.ActualValue) || model.IsPageLoading) {
      //console.log("returning")
      return;
    }

    //var PropsData= this.state.Model.PropsData;

    if (!this.props.PlaceHolderText) {
      model.PlaceHolderText = "Select date & time"
    }

    model.IsDisabled = this.props.IsDisabled
    // var tempPlaceHolderText =placeHolderText;

    model.ActualMode = this.props.Mode;
    if (!model.ActualMode) {
      model.ActualMode = DateTimeType.date
    }

    model.Mode = model.ActualMode;

    //if datetime then firstdate will show
    if (model.Mode === DateTimeType.datetime) {
      model.Mode = DateTimeType.date
    }

    model.Value = this.props.value;
    model.ActualValue = this.props.value;
    if (!model.Value) {
      model.Value = DateTimeHelper.GetToday();
    }

    model.IsEmpty = model.ActualValue === undefined;
    model.Label = this.GetFormattedLabel(model.ActualValue)
    model.IsPageLoading = false;
    this.UpdateViewModel();
  }




  GetFormattedLabel = (date: Date | undefined): string => {
    var model = this.state.Model;
    var tempLabel = "";
    if (date) {
      switch (model.ActualMode) {
        case DateTimeType.date:
          tempLabel = DateTimeHelper.ToDdMmmYyyy(date)
          break;
        case DateTimeType.time:
          tempLabel = DateTimeHelper.ToHhMmssAmPm(date)
          break;
        case DateTimeType.datetime:
          tempLabel = DateTimeHelper.ToDdMmmYyyyHhMmssAmPm(date)
          break;
      }
    }
    //console.log("tempLabel", tempLabel)
    return tempLabel
  }

  onChange = (event, selectedDate) => {

    var model = this.state.Model;

    const currentDate = selectedDate || model.Value;
    model.Show = false;
    model.Value = currentDate;
    model.ActualValue = selectedDate;
    model.IsEmpty = (selectedDate === undefined)
    model.Label = this.GetFormattedLabel(selectedDate)
    model.IsPageLoading = false;
    if (model.ActualMode == DateTimeType.datetime && model.Mode == DateTimeType.date && selectedDate) {
      this.ShowMode(DateTimeType.time)
      this.UpdateViewModel()
      return;
    }

    //firing event
    var tempEvent = {
      name: this.props.Name,
      value: selectedDate,
    };
    this.props.onDateChange && this.props.onDateChange(tempEvent)

  };

  ShowMode = (mode: DateTimeType) => {
    var model = this.state.Model;
    model.IsPageLoading = true
    model.Show = true
    model.Mode = mode;
    this.UpdateViewModel();
  };

  ShowPicker = () => {
    var model = this.state.Model;
 
    switch (model.ActualMode) {
      case DateTimeType.date:
        
      case DateTimeType.datetime:
        this.ShowMode(DateTimeType.date);
        break;
      case DateTimeType.time:
        this.ShowMode(DateTimeType.time);
        break;
    }
  }



  //setFormattedLabel(value)



  // if (IsDisabled) {
  //   IsError = false
  //   IsSucess = false
  // }
  render() {
    var model = this.state.Model
    var IsError = this.props.IsRequired && model.IsEmpty;
    var IsSucess = this.props.IsRequired && model.IsEmpty;

    return (
      <Item
        style={{ margin: 0, padding: 0 }}
        stackedLabel
        disabled={model.IsDisabled}
        error={IsError}
        success={IsSucess}>
        <Label style={{ marginTop: 5, color: "grey", fontWeight: "bold" }}>{model.PlaceHolderText}{this.props.IsRequired ? " *" : ""}</Label>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Input disabled={true} style={{ margin: 0, padding: 0 }} value={model.Label} />
          <MaterialCommunityIcon onPress={this.ShowPicker} style={{ fontSize: 25, marginEnd: 10 }} color={"green"} name={"timetable"} />
          {
            this.props.IsRequired && <FontAwesomeIcon style={{ fontSize: 20, marginEnd: 10 }} color={model.IsEmpty ? "red" : "green"} name={model.IsEmpty ? "close" : "check"} />
          }
        </View>
        {model.Show && (
          <DateTimePicker
            maximumDate={this.props.MaxDate}
            minimumDate={this.props.MinDate}
            testID="dateTimePicker"
            value={model.Value}
            mode={model.Mode}
            is24Hour={true}
            display="default"
            onChange={(event, date) => { this.onChange(event, date) }}

          />
        )}
      </Item>

    )
  }
}


export enum DateTimeType {
  date = "date",
  time = "time",
  datetime = "datetime"
}