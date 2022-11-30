import BaseApi from '../Core/BaseApi';
import AppShowCaseSetting from '../Entity/AppShowCaseSetting';

export default class AppShowCaseSettingDataAccess extends BaseApi {
   
    public static GetAll(Model:AppShowcaseRequestEntity) {
        return this.BasePostRequestAsync<AppShowCaseSetting[]>('Customer.AppShowCaseSettings/GetAll', Model);
      }
}

export class AppShowcaseRequestEntity  {
    ProductItemCategoryId: string='';
    VendorId: string='';
  }