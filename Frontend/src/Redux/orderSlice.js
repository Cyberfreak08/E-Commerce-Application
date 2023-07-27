import { createSlice } from "@reduxjs/toolkit";
import { getOrderByUserIdApi, getCurrentOrderApi } from "../apis/order.api";
export const ORDER_KEY = "order";

const orderSlice = createSlice({
  name: ORDER_KEY,
  initialState: {
    orders: [],
    currentOrder: {},
  },
  reducers: {
    getOrdersSuccess: (state, action) => {
      state.orders = action.payload;
    },
    getCurrentOrderSuccess: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
});

export const { getCurrentOrderSuccess, getOrdersSuccess } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

export const getAllOrders = () => {
  return async (dispatch) => {
    const modifiedData = await getOrderByUserIdApi();
    dispatch(getOrdersSuccess(modifiedData));
  };
};

export const getCurrentOrder = (params) => {
  return async (dispatch) => {
    const modifiedData = await getCurrentOrderApi(params);
    dispatch(getCurrentOrderSuccess(modifiedData));
  };
};
