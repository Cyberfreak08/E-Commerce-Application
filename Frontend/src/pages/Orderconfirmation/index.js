import React from "react";
import { Result, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "../../styles/OrderConfirmation.css"; 
import { useNavigate } from "react-router-dom";
import { router } from "../../utils/routes";
import { useDispatch } from "react-redux";
import { setPayment } from "../../Redux/userSlice";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleContinueShopping = ()=>{
        dispatch(setPayment(false));
        navigate(`${router.products}`);
    }
    const handleOrder = () => {
        dispatch(setPayment(false));
        navigate(`${router.allOrders}`);
    }
  return (
    <div className="order-confirmation-container">
      <Result
        icon={<CheckCircleOutlined className="success-icon" />}
        title="Order Placed Successfully"
        subTitle="Thank you for your purchase!"
        extra={[
          <Button key="continue-shopping" type="primary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>,
          <Button key="view-order" style={{ marginLeft: 8 }} onClick={handleOrder}>
            View Order
          </Button>,
        ]}
      />
    </div>
  );
};

export default OrderConfirmation;
