import BaseApi from '../Core/BaseApi';
import { CustomerDeliveryTimeSlot, CustomerPaymentMode } from '../Entity/Order';

export default class OrderDataAccess extends BaseApi {
  public static Create<T>(Model: any) {
   return this.BasePostRequestAsync<T>('Customer.Order/Create', Model);
  }
  // public static GetAll(Model: any, callback: any) {
  //   this.BasePostRequest(
  //     'Customer/Order/GetAll',
  //     Model,
  //     callback,
  //   );
  // }
  public static Get<T>(Model: any) {
    return this.BasePostRequestAsync<T>('Customer/Order/Get', Model);
  }
  public static GetExpectedDeliveryDateBySlot<T>(Model: any) {
    return this.BasePostRequestAsync<T>('Customer.Order/GetExpectedDeliveryDateBySlot', Model);
  }
  public static GetAllDeliveryTimeSlot<T>() {
    return this.BasePostRequestAsync<T>('Customer.Order/GetAllDeliveryTimeSlot', {});
  }

  public static IsValidPincodeForDelivery<T>(Model:any) {
    return this.BasePostRequestAsync<T>('Customer.Order/IsValidPincodeForDelivery', Model);
  }
   
}
export class OrderTimeSlotRequestEntity{
  DeliverySlot:CustomerDeliveryTimeSlot;
}

export class OrderPincodeRequestEntity{
  Pincode:string;
}
export  class OrderTimeSlotResponseEntity{
  ExpectedDeliveryDate:Date;
}
export class CartRequestEntity{
  ApiToken?: string;
  DeliveryTimeSlot?: CustomerDeliveryTimeSlot;
  CustomerAddressId?:string;
  PaymentMode?: CustomerPaymentMode;
  CustomerId?: string;
  OrderItems?:OrderItemsrequestEntity[]=[];
  CouponId?:string;
}
export class OrderItemsrequestEntity{
  ProductItemId: string;
  Quantity: number;
}