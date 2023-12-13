import React, { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, cartSelector } from "../../Redux/cartSlice";
import { productSelector } from "../../Redux/productSlice";
import ProductModal from "../ProductModal";
const { Meta } = Card;

const ProductCard = () => {
  const dispatch = useDispatch();
  const productArray = useSelector(productSelector);
  const cartItems = useSelector(cartSelector);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
  return (
    <div>
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

export default ProductCard;
