import { Component } from 'react'
import { NavigationState } from '@react-navigation/native';
import BaseState from './BaseState';
import { ActionSheet, Toast } from 'native-base';
import BaseResponse, { ErrorMessage, ErrorType } from './BaseResponse';
import { BackHandler, Alert } from 'react-native';
import BaseViewModel from './BaseViewModel';
import ConstantMessage from './ConstantMessage';
import BaseColor from './BaseTheme';



export default abstract class BaseComponent<T, U> extends Component<T, BaseState<U>> {
  ViewModel: any = undefined;
  constructor(props: T) {
    super(props)
    this.HandleAuthentication(props);
  }
  onBackPress?(): boolean;
  // componentWillMount() {     
  //     BackHandler.addEventListener('hardwareBackPress', this.HandleBackButtonClick); 
  // }

  // componentWillUnmount() {         
  //     BackHandler.removeEventListener('hardwareBackPress', this.HandleBackButtonClick);
  // }
  // HandleBackButtonClick=()=> {     
  //   console.log("HandleBackButtonClick called : " + this.onBackPress)
  //   var navigation=  (this.props as any).navigation;
  //   if(this.onBackPress){
  //     return this.onBackPress();
  //   }else if(navigation){
  //     navigation.goBack(null);
  //   }

  //   return true;
  // }





  HandleAuthentication(props: T) {
    //var user = SessionHelper.GetSession();
    // console.log(token);
    // if (user === null) {
    //   this.props.navigator.resetTo({
    //     title: 'Categories',
    //     component: CategoryView,
    // })
    //}

  }
  SetModelValueX = (event: any) => {
    this.SetModelValue(event.name, event.value)
  }

  SetModelValue = (name: string, text: any) => {

    if (!name) {
      alert("propertyName undefined")
    }

    //console.log({ [name]: text })
    Object.assign(this.state.Model, { [name]: text })

    //console.log(this.state.Model)

    this.setState({
      Model: this.state.Model
    } as Pick<BaseState<U>, keyof BaseState<U>>);
  }

  UpdateViewModelUnknown(Model: any) {
    this.setState({
      Model: Model as unknown as U
    })
  }
  UpdateViewModel() {
    this.setState({
      Model: this.state.Model
    })
  }

  public ShowToastMesage(Message: string, type: "danger" | "success" | "warning", duration: number) {
    Toast.show({
      text: Message,
      position: "bottom",

      type: type,
      style: {
        margin: 20,
        borderRadius: 5,
        opacity: .9,
        backgroundColor: '#031c30'
      },
      duration: duration || 5000
    })
  }

  // #region Toast message
  public ProcessResponseData(Response: BaseResponse, ShowIsSucessMessage: boolean = true) {

    if (Response.IsSessionExpired) {


      //TODO:when redux is rady redirect to login automaticaly
      //belowis not working need redux to handle this, so for now we ares showing a message only
      //this.props.history.push("/");
      //return;
      if (!ShowIsSucessMessage) {


        this.ShowToastMesage("Your session is expired, please try to re-login", "danger", 5000)

      }

    }


    if (!ShowIsSucessMessage && Response.IsSuccess) {



      return;

    }


    var allMessages: ErrorMessage[] = [];

    var mainMesageType = Response.IsSuccess ? ErrorType.Info : ErrorType.Warning;

    allMessages.push(new ErrorMessage(

      {

        ErrorType: mainMesageType,
        Message: Response.Message,
        AdditionInfo: undefined,
        FieldName: ""
      }))

    // Response.Errors.forEach(err => {
    //   allMessages.push(new ErrorMessage(
    //     {
    //       ErrorType: err.ErrorType,
    //       Message: err.Message,
    //       AdditionInfo: err.AdditionInfo,
    //       FieldName: err.FieldName
    //     }))
    // });
    var tempM = allMessages[0];
    this.ShowToastMesage(tempM.Message, tempM.ErrorType === ErrorType.Warning ? "danger" : "success", 5000);

  }


  ShowPageLoader(IsLoading: boolean, LabelText: string = "") {
    var model = this.state.Model as unknown as BaseViewModel;
    model.IsPageLoading = IsLoading;
    model.PageLoadingLabel = LabelText ? model.TableLoadingLabel : LabelText;
    this.UpdateViewModelUnknown(model);
  }

  public async ShowConfirmBox(Title: string): Promise<ConfirmBoxResult> {
    return this.ShowConfirmBoxDetail(Title, ConstantMessage.DefaultConfirmBoxYesButtonText, ConstantMessage.DefaultConfirmBoxNoButtonText)
  }
  public async ShowConfirmBoxDetail(Title: string, OkButtonText: string, CancelButtonText: string): Promise<ConfirmBoxResult> {

    return new Promise((resolve, reject) => {
      var BUTTONS = [
        { text: OkButtonText, icon: 'checkmark', iconColor: 'green' },
        { text: CancelButtonText, icon: 'close', iconColor: 'red' },
      ];

      ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: 1,
          destructiveButtonIndex: 1,
          title: Title,
        },
        (buttonIndex) => {

          var result = ConfirmBoxResult.Cancel;
          if (BUTTONS[buttonIndex].text === OkButtonText) {
            result = ConfirmBoxResult.OK
          }
          resolve(result)
        },
      );
    })

  }

  static RouteName(): string {
    throw new Error("RouteName not implemented")
  }
}



export enum ConfirmBoxResult {
  OK,
  Cancel
}
