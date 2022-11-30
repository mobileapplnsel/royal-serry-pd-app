import { createStore, combineReducers } from 'redux';
import OrderItemReducer from '../reducers/OrderItemReducer';


const rootReducer = combineReducers({
    OrderItemList:OrderItemReducer
})

const store = createStore(rootReducer)

export default store;
export type RootReduxState = ReturnType<typeof rootReducer>