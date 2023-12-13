import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../Redux/userSlice";
import { warning } from "../../utils/sharedService";
import "../../styles/SignIn.css";
import { router } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state?.reducer?.user?.success);
  const onFinish = (values) => {
    dispatch(signIn(values));
  };

  const onFinishFailed = () => {
    warning("error", "Something went wrong!");
  };
  useEffect(() => {
    console.log("===", success);
    if (success) {
    console.log('inside success',success);

      navigate(router.products);
    }
    
  }, [success]);
  return (
    <div>

      <div className="sign-in-form-container">
        <h2 className="form-title">Sign In</h2>

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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <div className="d-flex flex-column align-center">
            <p>
              Don't have an account?{" "}
              <Link className="ml-8 m-w-500" to={router.register}>
                Sign Up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
