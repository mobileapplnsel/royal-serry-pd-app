import { Documents } from "./Documents";

export interface ProductItems {
    ProductItemId: string;
    Name: string;
    Barcode: string;
    Price: number;
    IsFreeItem: boolean;
    OfferPrice: number;
    ProductItemCategoryId: string;
    ProductItemSubcategoryId: string;
    BrandId: string;
    UnitId: string;
    ShortDescription: string;
    Description: string;
    GSTPercentage: string;
    GSTAmount: number;
    Status: string;
    OfferPercentage: number;
    Documents: Documents[];
}