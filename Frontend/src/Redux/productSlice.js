import { createSlice } from "@reduxjs/toolkit";
import { getProductsApi } from "../apis/product.api";
export const PRODUCT_KEY = "product";

const productSlice = createSlice({
  name: PRODUCT_KEY,
  initialState: {
    products: [],
    order: "",
    searchValue: "",
  },
  reducers: {
    getProductsSuccess: (state, action) => {
      state.products = action.payload;
    },
    setProductSortOrder: (state, action) => {
      state.order = action.payload;
    },
    setProductSearchKeyword: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  getProductsSuccess,
  setProductSearchKeyword,
  setProductSortOrder,
} = productSlice.actions;
export const productSelector = (state) => state.reducer.product.products;
export const orderSelector = (state) => state.reducer.product.order;
export const searchValueSelector = (state) => state.reducer.product.searchValue;

export const productReducer = productSlice.reducer;

export const getProducts = (searchKeyword, sortOption) => {
  return async (dispatch) => {
    const modifiedData = await getProductsApi(searchKeyword, sortOption);
    dispatch(getProductsSuccess(modifiedData));
    dispatch(setProductSearchKeyword(""));
    // dispatch(setProductSortOrder(""));
  };
};
export const searchProducts = (searchKeyword, sortOption) => {
  return async (dispatch) => {
    dispatch(setProductSearchKeyword(searchKeyword));

    const modifiedData = await getProductsApi(searchKeyword, sortOption);
    dispatch(getProductsSuccess(modifiedData));
    dispatch(setProductSearchKeyword(""));
    dispatch(setProductSortOrder(""));
  };
};

export const sortProducts = (searchKeyword, sortOption) => {
  return async (dispatch) => {
    const modifiedData = await getProductsApi(searchKeyword, sortOption);
    dispatch(getProductsSuccess(modifiedData));
    // dispatch(setProductSearchKeyword(""));
    dispatch(setProductSortOrder(""));
  };
};
