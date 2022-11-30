import BaseApi from '../Core/BaseApi';
import RoyalSerryUser from '../Entity/RoyalSerryUser';

import { Seller } from '../Entity/Seller';

export default class RoyalSerryUserDataAccess extends BaseApi{
   
 
      public static Login(Model:LoginRequsetEntity,callback:any){
        this.BasePostRequest("api/user_login",Model,callback);
    }

}


export class LoginRequsetEntity  {
    telephone: string = '';
    email: string = '';
    password: string = '';
  }