import instance from "../utils/api";

export const getOrderByUserIdApi = async () => {
  const response = await instance.get("/order");
  return response.data;
};

export const getCurrentOrderApi = async (params) => {
  const billAmount = { total: params };
  const response = await instance.post("/order/current", billAmount);
  return response?.data;
};
