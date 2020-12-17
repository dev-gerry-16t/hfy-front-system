import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { callApiLogin } from "../../utils/actions/actions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LoginDemo = () => {
  const onFinish = async (values) => {
    try {
      const response = await callApiLogin({
        email: values.username,
        password: values.password,
      });
      console.log("hola", response);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginDemo;
