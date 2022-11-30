
import CartOrderItemViewModel from "../../Page/Order/CartOrderItemViewModel";
import { OrderItemActionTypes, REMOVE_FROM_CART, CLEAR_All_FROM_CART, SET_ITEM_COUNT_ON_CART } from "../actions/OrderItemAction";

export class OrderItemStoreState {
    OrderItemList: CartOrderItemViewModel[] = [];
}


const initialState: OrderItemStoreState = {
    OrderItemList: [] = []
}


const OrderItemReducer = (state = initialState, action: OrderItemActionTypes) => {    
    switch (action.type) {
         
        case REMOVE_FROM_CART:
            //console.log(action.Data)
            var remaingItems = state.OrderItemList.filter(i => i.OrderItemId !== action.Data)
            var item :OrderItemStoreState= {
                ...state,
                OrderItemList: remaingItems
            };
            //console.log(JSON.stringify(item))
            return item;             
        case CLEAR_All_FROM_CART:
            return initialState;
        case SET_ITEM_COUNT_ON_CART:             
            var tempOrderList = state.OrderItemList.map(i => {
                return (i.ProductItem.ProductItemId === action.Data.ProductItem.ProductItemId) ? {
                     ...i, 
                     Count: action.Data.Count,
                     TotalAmount:i.ProductItem.OfferPrice*action.Data.Count
                     } : i
            })

            //if not i.e new item add to array with count 1 and if similar product is added it will 
            //trigger the previous method
            if (!tempOrderList.find(i => i.ProductItem.ProductItemId === action.Data.ProductItem.ProductItemId)) {
                tempOrderList = tempOrderList.concat(
                    { ...action.Data, 
                        Count: 1,
                        TotalAmount:action.Data.ProductItem.OfferPrice*action.Data.Count }
                        )
            }

            var item :OrderItemStoreState= {
                ...state,
                OrderItemList: tempOrderList
            };
            //console.log(item)
            return item;
        default:
            return state;

    }
}
export default OrderItemReducer;