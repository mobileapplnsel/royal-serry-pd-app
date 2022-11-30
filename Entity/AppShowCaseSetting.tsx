import { ProductItemCategory } from "./ProductItemCategory";
import { ProductItems} from "./ProductItems";
import { ProductSubCategories } from "./ProductSubCategories";
import SponsorBanner from "./SponsorBanner";


export default interface AppShowCaseSetting {
    AppShowCaseSettingId: string;
    Ordinal: number;
    Type: AppShowcaseType;
    ProductItemCategoryId: string;
    ProductItemCategory: ProductItemCategory;
    Brands:any[];
    Categories:ProductItemCategory[];
    Banners:SponsorBanner[];    
    ProductSubCategories: ProductSubCategories[];

   
    ProductItems: ProductItems[];
       
 
}

export enum AppShowcaseType {
    CategoryVendorWiseProductItem = 'CategoryVendorWiseProductItem',
    HeaderBanner = 'HeaderBanner',
    MarketingBanner = 'MarketingBanner',
    ProductCategoryList = 'ProductCategoryList',
    CategoryAndVendorWiseBrand = 'CategoryAndVendorWiseBrand',
    CategoryAndVendorWiseSubCategory = 'CategoryAndVendorWiseSubCategory'
}