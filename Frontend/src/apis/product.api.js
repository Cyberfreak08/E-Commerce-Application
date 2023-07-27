import instance from "../utils/api";

export const getProductsApi = async (searchKeyword, sortOption) => {
  const queryParams = {};
  if (searchKeyword && searchKeyword?.length >= 3) {
    queryParams.search = searchKeyword?.trim();
  }
  if (sortOption) {
    queryParams.sortBy = sortOption;
  }
  const response = await instance.get("/items", {
    params: queryParams,
  });

  return response?.data;
};
