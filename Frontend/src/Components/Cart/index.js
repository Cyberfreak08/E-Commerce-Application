import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Card, Space, Typography } from "antd";
import {
  cartSelector,
  emptyCartItems,
  getItemsInCart,
  removeItemFromCartApi,
  updateQuantityApi,
} from "../../Redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import CheckoutModal from "../CheckoutModal";
import "../../styles/cart.css";
import { router } from "../../utils/routes";
import TopNavbar from "../NavBar";
const { Title, Text } = Typography;

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateQuantityApi({ productId: itemId, quantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCartApi(itemId));
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return totalPrice;
  };

  const handleEmptyCart = () => {
    dispatch(emptyCartItems());
  };

  useEffect(() => {
    dispatch(getItemsInCart());
  }, [dispatch]);
  return (
    <div>
      <TopNavbar />
      <div className="cart-container">
        <Title level={2}>Cart</Title>
        {cartItems?.length > 0 ? (
          cartItems?.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img
                src={'https://media.istockphoto.com/id/619052288/photo/laptop-and-computer-parts.jpg?s=612x612&w=0&k=20&c=ejIT6Owx79tk4E3z4FxS16kWQHPHL3VDE7TQRMauMLU='}
                className="cart-item-image"
                alt={item?.itemName.toUpperCase().charAt(0)}
              />
              <div className="cart-item-details">
                <Space direction="vertical">
                  <Text strong>{item.itemName}</Text>
                  <Text>Price: ₹{item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text strong className="cart-item-subtotal">
                    Subtotal: ₹{item.price * item.quantity}
                  </Text>
                </Space>
                <div className="cart-item-actions">
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    Decrease Quantity
                  </Button>
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    Increase Quantity
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to remove this item from the cart?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleRemoveItem(item.id)}
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>The cart is Empty</div>
        )}
        <div className="cart-total">
          {cartItems?.length > 0 && (
            <Title level={3}>Total: ₹{calculateTotalPrice()}</Title>
          )}
        </div>
        {cartItems?.length > 0 && (
          <div className="cart-checkout">
            <p>Taxes and shipping calculated at checkout</p>
            <Button onClick={showModal}>Proceed to Checkout</Button>
            {isModalOpen && (
              <CheckoutModal
                handleEmptyCart={handleEmptyCart}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemoveItem={handleRemoveItem}
                total={calculateTotalPrice()}
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
            )}
          </div>
        )}
        <div className="continue-shopping">
          <Button onClick={() => navigate(router.products)}>
            Continue Shopping
          </Button>
          <Button
            className="empty-cart-button"
            onClick={handleEmptyCart}
            type="primary"
          >
            Empty Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
