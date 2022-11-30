import BaseApi from '../Core/BaseApi';

import { Seller } from '../Entity/Seller';

export default class SellerDataAccess extends BaseApi{
   
    public static GetAll(Model:SellerRequestEntity) {
        return this.BasePostRequestAsync<Seller[]>('Customer.ProductItemCategory/GetAllCategoryWiseVendor', Model);
      }

}


export class SellerRequestEntity  {
    ProductItemCategoryId: string = '';
  }