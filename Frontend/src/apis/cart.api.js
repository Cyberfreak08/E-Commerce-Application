import instance from "../utils/api";

export const getCartProductsApi = async (userId) => {
  const response = await instance.get(`/cart`);
  return response.data;
};
export const getCartProductById = async (id) => {
  const response = await instance.get(`/project?projectId=${id}`);
  return response.data;
};

export const addProductInCartApi = async (params) => {
  const response = await instance.post(`/cart`, params);
  return response.data;
};

export const emptyCartApi = async () => {
  const response = await instance.delete(`/cart`);
  return response.data;
};
export const deleteCartProductApi = async (itemId) => {
  const response = await instance.delete(`/cart/${itemId}`);
  return response.data;
};
