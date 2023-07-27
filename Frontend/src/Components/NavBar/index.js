import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown, Button, Space, Avatar } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";

import "../../styles/NavBar.css";
import {
  getCurrentUser,
  logoutUser,
  updateSuccess,
} from "../../Redux/userSlice";
import { getAllOrders } from "../../Redux/orderSlice";
import { router } from "../../utils/routes";

const { Header } = Layout;

const TopNavbar = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.reducer.user.loggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    loggedUser && dispatch(getCurrentUser());
  }, [dispatch]);

  const handleMenuClick = (menuItem) => {
    switch (menuItem.key) {
      case "order":
        dispatch(getAllOrders());
        navigate(router.allOrders);
        break;
      case "signIn":
        navigate(router.login);
        break;
      case "logout":
        dispatch(logoutUser());
        break;
      case "profile":
        navigate(router.profile);
        break;
      case "cart":
        navigate(router.cart);
        break;
      case "products":
        navigate(router.products);
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {loggedUser?.userName && (
        <>
          <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
            Go to Cart
          </Menu.Item>
          <Menu.Item key="products" icon={<UserOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="order" icon={<UserOutlined />}>
            Your Orders
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
            Logout
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Header className="top-navbar">
      <Button type="link" onClick={() => navigate(-1)} className="back-button">
        Back
      </Button>
      <Space align="center">
        <div className="logo">Shopping Cart</div>
        <div className="user-section">
          {loggedUser?.userName ? (
            <>
              {/* <a onClick={() => navigate(router.profile)}> */}
              <Avatar icon={<UserOutlined />} />
              Welcome,
              <span className="user-greeting">{loggedUser?.userName}</span>
              {/* </a> */}
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button type="link" className="user-name">
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Button
                type="link"
                onClick={() => navigate(router.cart)}
                className="back-button"
              >
                Go to cart
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                dispatch(updateSuccess(false));
                navigate(router.login);
              }}
              className="login-button"
              type="link"
            >
              Sign In
            </Button>
          )}
        </div>
      </Space>
    </Header>
  );
};

export default TopNavbar;
