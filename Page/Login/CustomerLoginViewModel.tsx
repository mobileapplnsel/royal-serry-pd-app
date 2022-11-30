import BaseViewModel from "../../Core/BaseViewModel";


export class CustomerLoginViewModelBase extends BaseViewModel{
    FromPage:FromPageToLogin=FromPageToLogin.Order;
    MobileNo:string="";
}
export enum FromPageToLogin{
    Drawer,
    Order
}