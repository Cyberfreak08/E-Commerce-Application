import React from "react";
import { Button, Card, Modal, Popconfirm, Space, Typography } from "antd";
import PayButton from "../PayButton";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector } from "../../Redux/cartSlice";
import { setPayment } from "../../Redux/userSlice";

const { Text } = Typography;

const CheckoutModal = ({
    handleEmptyCart,
  handleUpdateQuantity,
  handleRemoveItem,
  isModalOpen,
  handleOk,
  handleCancel,
  total,
}) => {
  const cartItems = useSelector(cartSelector);
  const dispatch = useDispatch()
  const handlePayment = () => {
    dispatch(setPayment(true));
  }
  return (
    <>
      <Modal
        title="Checkout Process"
        open={isModalOpen}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <PayButton onClick = {handlePayment} total={total} handleOk={handleOk} handleEmptyCart={handleEmptyCart} />,
        ]}
      >
        {cartItems?.length > 0 && <p>Total items: {cartItems?.length}</p>}
        {cartItems?.length > 0 ? (
          cartItems?.map((item) => (
            <div>
              <Card
                key={item.id}
                style={{ marginBottom: 16 }}
                bodyStyle={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={'https://media.istockphoto.com/id/619052288/photo/laptop-and-computer-parts.jpg?s=612x612&w=0&k=20&c=ejIT6Owx79tk4E3z4FxS16kWQHPHL3VDE7TQRMauMLU='}
                  style={{ width: "120px", height: "90px", marginRight: 16 }}
                  alt={item?.itemName.toUpperCase().charAt(0)}
                />
                <div>
                  <Space direction="vertical">
                    <Text strong>{item.itemName}</Text>
                    <Text>Price: ${item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text strong>Subtotal: ${item.price * item.quantity}</Text>
                  </Space>
                  <div style={{ marginTop: 16 }}>
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
              </Card>
            </div>
          ))
        ) : (
          <div>The cart is Empty</div>
        )}
        {cartItems?.length > 0 && <h2>Total Amount to be paid:₹{total}</h2>}
      </Modal>
    </>
  );
};
export default CheckoutModal;
