import { Documents } from "./Documents";

export interface Brand {
    BrandId: string;
        Name: string;
        Status: string;
        Documents: Documents[];
}