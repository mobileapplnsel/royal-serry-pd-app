import BaseApi from "../Core/BaseApi";

 

export default class UserDataAccess extends BaseApi{

    public static SendOTP(Model:CustomerLoginOtpRequestEntity) {
        return this.BasePostRequestAsync<any>('Customer.OTP/SendOTPCustomerRegister', Model);
      }
      public static VerifyOTP(Model:CustomerOTPRequestEntity) {
        return this.BasePostRequestAsync<any>('Customer.OTP/VerifyOTPCustomerRegister', Model);
      }
 
      public static GetAll_Test(Model:any) {
        return this.BasePostRequestAsync<any>('Customer.OTP/GetAllTest', Model);
      }
    // public static GetAll_Test(callback:any){
    //     //TODO:Remove before prod
    //     this.BasePostRequest("Web/OTP/GetAll_Test",{},callback);
 //  }
}

export  class CustomerLoginOtpRequestEntity{
    DeviceID:string="";
    MobileNo:string="";
}
export  class CustomerOTPRequestEntity{ 
    Code:string="";
    MobileNo:string="";
  }