import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Card, Space } from "antd";
import { getAllOrders } from "../../Redux/orderSlice";
import TopNavbar from "../NavBar";
const { Title, Text } = Typography;

const Orders = () => {
  const pastOrders = useSelector((state) => state?.reducer?.order?.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  return (
    <div>
      <TopNavbar />
      <Title level={2}>Past Orders</Title>
      {pastOrders?.length > 0 ? (
        pastOrders?.map((order) => (
          <Card
            key={order.id}
            style={{ marginBottom: 16 }}
            bodyStyle={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <Space direction="vertical">
                <Text>Order id: {order.id}</Text>
                <Text>Date ordered: {formatDate(order.date_ordered)}</Text>
                <Text strong>Total Price: ₹{order.price}</Text>
              </Space>
            </div>
          </Card>
        ))
      ) : (
        <div>No past orders available.</div>
      )}
    </div>
  );
};

export default Orders;
