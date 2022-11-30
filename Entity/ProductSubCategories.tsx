import { Documents } from "./Documents";

export interface ProductSubCategories {
    ProductItemSubcategoryId: string;
    ProductItemCategoryId: string;
    Name: string;
    Status: string;
    Documents: Documents[];
}
