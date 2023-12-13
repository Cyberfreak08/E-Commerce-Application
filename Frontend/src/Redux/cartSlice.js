import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import {
  addProductInCartApi,
  deleteCartProductApi,
  emptyCartApi,
  getCartProductsApi,
} from "../apis/cart.api";

export const CART_KEY = "cart";

const cartSlice = createSlice({
  name: CART_KEY,
  initialState: {
    items: [],
  },
  reducers: {
    getCartItems: (state, action) => {
      state.items = action.payload;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 0;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      notification.success({
        message: "Item Removed",
        description: "The item has been removed from the cart.",
        placement: "bottomRight",
      });
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { getCartItems, updateQuantity, removeFromCart, emptyCart } =
  cartSlice.actions;
export const cartSelector = (state) => state.reducer.cart.items;

export const getItemsInCart = () => {
  return async (dispatch) => {
    try {
      const items = await getCartProductsApi();
      dispatch(getCartItems(items.cartItem));
    } catch (err) {
      console.log(err);
      notification.success({
        message: "Error",
        description: err.response.data.message,
        placement: "bottomRight",
      });
    }
  };
};

export const addItemToCart = (productId, quantity) => {
  return async (dispatch) => {
    try {
      if (quantity) {
        await addProductInCartApi({ productId, quantity: quantity });
        const items = await getCartProductsApi();
        dispatch(getCartItems(items.cartItem));
        return;
      }
      await addProductInCartApi({ productId, quantity: 1 });
      const items = await getCartProductsApi();
      dispatch(getCartItems(items.cartItem));
      notification.success({
        message: "Item Added",
        description: "The item has been added to the cart.",
        placement: "bottomRight",
      });
    } catch (err) {
      console.log(err);
      notification.success({
        message: "Error",
        description: 'please login to continue',
        placement: "bottomRight",
      });
    }
  };
};

export const updateQuantityApi = (params) => {
  return async (dispatch) => {
    try {
      await addProductInCartApi(params);
      dispatch(updateQuantity(params));
    } catch (err) {
      console.log(err);
      notification.success({
        message: "Error",
        description: 'cannot remove item from cart',
        placement: "bottomRight",
      });
    }
  };
};
export const removeItemFromCartApi = (itemId) => {
  return async (dispatch) => {
    try {
      await deleteCartProductApi(itemId);
      dispatch(removeFromCart(itemId));
    } catch (err) {
      notification.success({
        message: "Error",
        description: 'cannot remove item from cart',
        placement: "bottomRight",
      });
    }
  };
};

export const emptyCartItems = () => {
  return async (dispatch) => {
    try {
      await emptyCartApi();
      dispatch(emptyCart());
    } catch (err) {
      notification.success({
        message: "Error",
        description: 'Cannot empty cart',
        placement: "bottomRight",
      });
    }
  };
};
export const cartReducer = cartSlice.reducer;
