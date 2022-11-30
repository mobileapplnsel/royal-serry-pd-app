
import { BASE_Action } from "."
import CartOrderItemViewModel from "../../Page/Order/CartOrderItemViewModel"
 
 
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_All_FROM_CART = 'CLEAR_All_FROM_CART'
export const SET_ITEM_COUNT_ON_CART = 'SET_ITEM_COUNT_ON_CART'

 
interface REMOVE_FROM_CART_Action extends BASE_Action<typeof REMOVE_FROM_CART,String> {
    type: typeof REMOVE_FROM_CART
    Data: String
  }

interface CLEAR_All_FROM_CART_Action extends BASE_Action<typeof CLEAR_All_FROM_CART,String> {
  type: typeof CLEAR_All_FROM_CART    
}
interface SET_ITEM_COUNT_ON_CART_Action extends BASE_Action<typeof SET_ITEM_COUNT_ON_CART,CartOrderItemViewModel> {
  type: typeof SET_ITEM_COUNT_ON_CART,
  Data:CartOrderItemViewModel    
}
 
export const RemoveOrderItemFromCart = (OrderItemId:string):OrderItemActionTypes => ({
  type: REMOVE_FROM_CART,
  Data: OrderItemId
})
export const  ClearAllFromCart = ():OrderItemActionTypes => ({
  type: CLEAR_All_FROM_CART,
  Data: null
})
export const SetItemCountOnCart = (orderItem:CartOrderItemViewModel):OrderItemActionTypes => ({
  type: SET_ITEM_COUNT_ON_CART,
  Data: orderItem
})

export type OrderItemActionTypes =   REMOVE_FROM_CART_Action 
| CLEAR_All_FROM_CART_Action | SET_ITEM_COUNT_ON_CART_Action