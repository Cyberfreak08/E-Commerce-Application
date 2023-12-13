import React from "react";
import { Button, Modal, Typography } from "antd";
import PayButton from "../PayButton";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector } from "../../Redux/cartSlice";
import { setPayment } from "../../Redux/userSlice";
import CartCard from "../CartCard";


const CheckoutModal = ({
  handleEmptyCart,
  isModalOpen,
  handleOk,
  handleCancel,
  total,
}) => {
  const cartItems = useSelector(cartSelector);
  const dispatch = useDispatch();
  const handlePayment = () => {
    dispatch(setPayment(true));
  };
  return (
    <>
      <Modal
        title="Checkout Process"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <PayButton
            onClick={handlePayment}
            total={total}
            handleOk={handleOk}
            handleEmptyCart={handleEmptyCart}
          />,
        ]}
      >
        <CartCard />
        {cartItems?.length > 0 && <h2>Total Amount to be paid:₹{total}</h2>}
      </Modal>
    </>
  );
};
export default CheckoutModal;
