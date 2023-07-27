import { combineReducers } from '@reduxjs/toolkit';
import { productReducer, PRODUCT_KEY } from './productSlice';
import { cartReducer, CART_KEY } from './cartSlice';
import { USER_KEY, userReducer } from './userSlice';
import { ORDER_KEY, orderReducer } from './orderSlice';

export const reducer = () => {
  return combineReducers({
    [PRODUCT_KEY]: productReducer,
    [CART_KEY]: cartReducer,
    [USER_KEY]: userReducer,
    [ORDER_KEY]: orderReducer,
  });
};
