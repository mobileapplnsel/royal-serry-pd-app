import BaseApi from '../Core/BaseApi';
import SponsorBanner from '../Entity/SponsorBanner';
export default class SponsorBannerDataAccess extends BaseApi{
    public static GetAll(callback:any){
        this.BasePostRequestAsync<SponsorBanner[]>("Customer/SponsorBanner/GetAll", {});
    }
}