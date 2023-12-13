import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography } from "antd";
import {
  cartSelector,
  emptyCartItems,
  getItemsInCart,
  removeItemFromCartApi,
  updateQuantityApi,
} from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "../../Components/CheckoutModal";
import "../../styles/cart.css";
import { router } from "../../utils/routes";
import TopNavbar from "../../Components/NavBar";
import CartCard from "../../Components/CartCard";
import { cartTitle, checkout } from "../../utils/constants";
const { Title } = Typography;

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
      <Title level={2}>{cartTitle}</Title>
      <div className="cart-container">
        <CartCard />
        <div className="cart-total">
          {cartItems?.length > 0 && (
            <Title level={3}>Total: ₹{calculateTotalPrice()}</Title>
          )}
        </div>
        {cartItems?.length > 0 && (
          <div className="cart-checkout">
            <p>Taxes and shipping calculated at checkout</p>
            <Button onClick={showModal}>{checkout}</Button>
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
