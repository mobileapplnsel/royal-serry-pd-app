import { ProductItems } from "../../Entity/ProductItems";


export default class CartOrderItemViewModel{
    OrderItemId:string="";
    ProductItem:ProductItems;
    TotalAmount:number=0;
    Count:number=0;
}