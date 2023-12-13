import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  searchValueSelector,
  orderSelector,   
} from "../../Redux/productSlice";
import TopNavbar from "../../Components/NavBar";
import SearchSort from "../../Components/SearchSort";
import ProductCard from "../../Components/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();
  const searchKeyword = useSelector(searchValueSelector);
  const sortOption = useSelector(orderSelector);
  useEffect(() => {
    dispatch(getProducts(searchKeyword, sortOption));
  }, [dispatch]);
// need to add an seperate component for titles...
  return (
    <div>
      <TopNavbar />
      <h2>Products</h2>
      <SearchSort />
      <ProductCard />
    </div>
  );
};

export default ProductList;
