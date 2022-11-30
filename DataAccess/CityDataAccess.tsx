import BaseApi from '../Core/BaseApi';

export default class CityDataAccess extends BaseApi{
     

 
    public static GetAll(Model:any) {
        return this.BasePostRequestAsync<any>('Customer.City/GetAll', Model);
      }
   
}