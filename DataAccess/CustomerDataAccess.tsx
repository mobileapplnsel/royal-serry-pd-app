import BaseApi from '../Core/BaseApi';
import BaseApiRequestModel from '../Core/BaseApiRequestModel';
import Customer, { CustomerAddress, CustomerAddressType } from '../Entity/Customer';

export default class CustomerDataAccess extends BaseApi{
    // public static Create(Model:any,callback:any) {
    //     this.BasePostRequest("Customer/Customer/Create",Model,callback);
    // }  
    public static Create(Model:CustomerProfileRequestEntity) {
        return this.BasePostRequestAsync<Customer>('Customer.Customer/Create', Model);
      }
      public static NewAddressForExistingCostomer(Model:CustomerAddAddressRequestEntity) {
        return this.BasePostRequestAsync<CustomerAddress>('Customer.Customer/NewAddressForExistingCostomer', Model);
      }
    
    //  public static UpdateProfile(Model:any,callback:any) {
    //     this.BasePostRequest("Customer/Customer/UpdateProfile",Model,callback);
    // }
}
export class CustomerAddAddressRequestEntity extends BaseApiRequestModel {
    CustomerAddressId?:string;
    CustomerId?: string;
    AddressType?: string;
    HouseNo?: string;
    ApartmentName?: string;
    StreetDetails?: string;
    Landmark?: string;
    AreaDetails?: string;
    Pincode?: string;
    LocationLatitude?: number;
    LocationLongitude?: number;
    CityId?: string;
    ApiToken?: string;
}
export class CustomerProfileRequestEntity{
    OTPId:string;
    CustomerId?: string;
    ApiToken?: string;
    FirstName?: string;
    LastName?: string;
    Email?: string;
    CouponId?: string;
    MembershipId?: string;
    ReferId?: string;
    IsSubscribedNotification?: boolean;
    CustomerAddresses:CustomerAddressRequestEntity[]=[];
}
export class CustomerAddressRequestEntity {
    AddressType?: CustomerAddressType;
    HouseNo?: string;
    ApartmentName?: string;
    StreetDetails?: string;
    Landmark?: string;
    AreaDetails?: string;
    Pincode?: string;
    LocationLatitude?: number;
    LocationLongitude?: number;
    CityId?: string;
}