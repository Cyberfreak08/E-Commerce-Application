// SignUp.js
import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { warning } from "../../utils/sharedService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../Redux/userSlice";
import { router } from "../../utils/routes";
import { Link } from "react-router-dom";
import "../../styles/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const success = useSelector((state) => state?.reducer?.user?.success);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      navigate(router.products);
    }
  },[success,navigate]);
  const onFinish = (values) => {
    dispatch(signUpUser(values));
  };
  const onFinishFailed = () => {
    warning("error", "Something went wrong!");
  };
  return (
    <div>
      <div className="sign-up-form-container">
        <h2 className="form-title">Sign Up</h2>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                pattern: /^[a-zA-Z0-9_]{4,20}$/,
                message:
                  "Username must be 4 to 20 characters long and can only contain letters, numbers, and underscores.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Enter a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/,
                message:
                  "Password must contain at least 6 characters, including at least one uppercase letter, one digit, and one special symbol (!@#$%^&*).",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
					<div className="d-flex flex-column align-center">
          <p>
            Already have an account?{" "}
            <Link className="ml-8 m-w-500" to={router.login}>
              Sign In
            </Link>
          </p>
        </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
