import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, orderSelector, searchProducts, searchValueSelector, sortProducts } from "../../Redux/productSlice";
import { Input, Select } from "antd";
const { Search } = Input;
const { Option } = Select;

const SearchSort = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector(orderSelector);
  const searchKeyword = useSelector(searchValueSelector);

  const handleSearch = (value) => {
    const trimmedValue = value?.trim();
    if (trimmedValue.length >= 2) {
      dispatch(searchProducts(trimmedValue, sortOption));
      return;
    }
    return dispatch(getProducts(searchKeyword, sortOption));
  };

  const handleSort = (value) => {
    return dispatch(sortProducts(searchKeyword, value));
  };
  return (
    <div style={{ marginBottom: "16px" }}>
      <Search
        placeholder="Search by product title"
        onSearch={handleSearch}
        style={{ width: 200, marginRight: "16px" }}
      />
      <Select defaultValue="desc" style={{ width: 120 }} onChange={handleSort}>
        <Option value="desc">Sort Descending</Option>
        <Option value="asc">Sort Ascending</Option>
        <Option value="priceLowToHigh">Price Low to High</Option>
        <Option value="priceHighToLow">Price High to Low</Option>
      </Select>
    </div>
  );
};

export default SearchSort;