import BaseApi from '../Core/BaseApi';
import { ProductItems } from '../Entity/ProductItems';
export default class ProductItemDataAccess extends BaseApi{
    public static Get<T>(Model:any){
       return this.BasePostRequestAsync<ProductItems>("Customer.ProductItem/Get",Model);
    } 
    // public static GetProductItemsByEntityId(Model:any,callback:any){
    //     this.BasePostRequest("Customer/ProductItem/GetProductItemsByEntityId",Model,callback);
    // }
    // public static SearchFromAppShowcase(Model:any,callback:any){
    //     this.BasePostRequest("Customer/Search/SearchFromAppShowcase",Model,callback);
    // }
    public static GetAll<T>(Model:ProductItemVendorAndSubCategoryWiseRequestEntity){
        return this.BasePostRequestAsync<ProductItems[]>("Customer.ProductItem/GetAllProductItemVendorAndSubCategoryWise",Model);
    }
    public static GetDeliveryChargeAmount<T>(Model:any){
        return this.BasePostRequestAsync<T>("Customer.Order/GetDeliveryChargeAmount",Model);
    }
}
export  class ProductItemVendorAndSubCategoryWiseRequestEntity{
    ProductItemSubcategoryId: string='';
    VendorId: string='';
}