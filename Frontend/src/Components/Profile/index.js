import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import TopNavbar from "../NavBar";
import '../../styles/Profile.css';

const Profile = () => {
  const user = useSelector((state) => state.reducer.user.loggedUser);
  return (
    <div>
      <TopNavbar />
      <Card className="profile-card" bordered={false}>
        <div className="avatar-container">
          <Avatar size={100} icon={<UserOutlined />} />
        </div>
        <div className="profile-details">
          <h2>{user.userName}</h2>
          <p>User ID: {user.userId}</p>
          <p>Email: {user.email}</p>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
