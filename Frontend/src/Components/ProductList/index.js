import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, cartSelector } from "../../Redux/cartSlice";
import {
  getProducts,
  productSelector,
  setProductSortOrder,
  setProductSearchKeyword,
  searchValueSelector,
  orderSelector,
  searchProducts,
  sortProducts,
} from "../../Redux/productSlice";
import { Row, Col, Card, Button, Input, Select } from "antd";
import ProductModal from "../ProductModal";
import TopNavbar from "../NavBar";

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const ProductList = () => {
  const dispatch = useDispatch();
  const productArray = useSelector(productSelector);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const cartItems = useSelector(cartSelector);
  const searchKeyword = useSelector(searchValueSelector);
  const sortOption = useSelector(orderSelector);
  useEffect(() => {
    dispatch(getProducts(searchKeyword, sortOption));
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    const index = cartItems?.findIndex(
      (product) => product.productId === productId
    );
    if (index > -1) {
      const quantity = cartItems[index].quantity;
      dispatch(addItemToCart(productId, quantity));
      setModalVisible(false);
      return;
    }
    dispatch(addItemToCart(productId));
    setModalVisible(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleSearch = (value) => {
    console.log(value);
    const trimmedValue = value?.trim();
    if (trimmedValue.length >= 2) {
      // dispatch(setProductSearchKeyword(trimmedValue));
      // dispatch(getProducts());
      dispatch(searchProducts(trimmedValue, sortOption));
      return;
    }
    dispatch(getProducts(searchKeyword, sortOption));
  };

  const handleSort = (value) => {
    console.log(value);
    dispatch(sortProducts(searchKeyword, value));
    // dispatch(getProducts());
  };

  return (
    <div>
      <TopNavbar />
      <h2>Products</h2>
      <div style={{ marginBottom: "16px" }}>
        <Search
          placeholder="Search by product title"
          onSearch={handleSearch}
          style={{ width: 200, marginRight: "16px" }}
        />
        <Select
          defaultValue="desc"
          style={{ width: 120 }}
          onChange={handleSort}
        >
          <Option value="desc">Sort Descending</Option>
          <Option value="asc">Sort Ascending</Option>
          <Option value="priceLowToHigh">Price Low to High</Option>
          <Option value="priceHighToLow">Price High to Low</Option>
        </Select>
      </div>
      <Row gutter={[16, 16]}>
        {productArray?.map((product, index) => (
          <Col key={product?.id} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              hoverable
              cover={
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={
                      "https://media.istockphoto.com/id/619052288/photo/laptop-and-computer-parts.jpg?s=612x612&w=0&k=20&c=ejIT6Owx79tk4E3z4FxS16kWQHPHL3VDE7TQRMauMLU="
                    }
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    alt={product.title.toUpperCase().charAt(0)}
                  />
                </div>
              }
            >
              <Meta
                title={product.title}
                description={`Price: ₹${product.price}`}
                style={{ marginBottom: "10px" }}
              />
              <Button
                type="primary"
                onClick={() => handleAddToCart(product.id)}
                style={{ marginTop: "10px" }}
              >
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          visible={modalVisible}
          onCancel={handleModalCancel}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductList;
