import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Popconfirm, Space, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  cartSelector,
  removeItemFromCartApi,
  updateQuantityApi,
} from "../../Redux/cartSlice";
const { Text } = Typography;

const CartCard = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(cartSelector);
  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateQuantityApi({ productId: itemId, quantity }));
  };
  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCartApi(itemId));
  };
  return (
    <div>
      {cartItems?.length > 0 && <p>Total items: {cartItems?.length}</p>}
      {cartItems?.length > 0 ? (
        cartItems?.map((item) => (
          <div key={item.id} className="cart-item-card">
            <Card
              key={item.id}
              style={{ marginBottom: 16 }}
              bodyStyle={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={
                  "https://media.istockphoto.com/id/619052288/photo/laptop-and-computer-parts.jpg?s=612x612&w=0&k=20&c=ejIT6Owx79tk4E3z4FxS16kWQHPHL3VDE7TQRMauMLU="
                }
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
            </Card>
          </div>
        ))
      ) : (
        <div>The cart is Empty</div>
      )}
    </div>
  );
};

export default CartCard;
