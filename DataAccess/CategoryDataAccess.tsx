import BaseApi from '../Core/BaseApi';
import { ProductItemCategory } from '../Entity/ProductItemCategory';
import SponsorBanner from '../Entity/SponsorBanner';
export default class CategoryDataAccess extends BaseApi{
   
    public static GetAll(Model:any) {
        return this.BasePostRequestAsync<ProductItemCategory[]>('Customer.ProductItemCategory/GetAll', Model);
      }

}