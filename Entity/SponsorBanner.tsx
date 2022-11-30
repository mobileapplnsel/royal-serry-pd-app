import { Documents } from "./Documents";




export interface SponsorBannerImage {
    SponsorBannerImageId: string;
    SponsorBannerId: string;
    ImageUrl: string;
    Ordinal: number;
    CreateBy?: any;
    CreateDate: Date;
    ModifyBy?: any;
    ModifyDate: Date;
}




export interface SponsorBannerProductItem {
 

    SponsorBannerImageId: string;
        SponsorBannerId: string;
        ProductItemId: string;
        DiscountRate: number;
        Ordinal: number;
}


export default interface SponsorBanner {
    
 
    SponsorBannerId: string;
    Name: string;
    Type: string;
    StartDate: Date;
    EndDate: Date;
    Documents: Documents[];
    SponsorBannerProductItems: SponsorBannerProductItem[];
}

export enum SponsorBannerType{
    Header="Header", 
    Marketing="Marketing"
}