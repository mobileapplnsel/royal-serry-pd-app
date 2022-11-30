import { Documents } from "./Documents";

export interface ProductItemCategory {
    ProductItemCategoryId: string;
    Name: string;
    Status: string;
    Documents: Documents[];
}