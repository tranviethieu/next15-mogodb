"use client";
import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import { Button, Form, Input, Tabs, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onRegister = async (values: any) => {
    setLoading(true);
    try {
      await axios.post("/api/auth/register", values);
      //message.success("Đăng ký thành công");
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Lỗi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (values: any) => {
    setLoading(true);
    try {
      await axios.post("/api/auth/login", values);
      //message.success("Đăng nhập thành công");
      router.push("/"); // hoặc redirect theo role
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl p-6 rounded-lg w-full max-w-md">
        <Tabs
          defaultActiveKey="login"
          centered
          items={[
            {
              key: "login",
              label: "Đăng nhập",
              children: (
                <Form layout="vertical" onFinish={onLogin}>
                  <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                    block
                  >
                    Đăng nhập
                  </Button>
                </Form>
              ),
            },
            {
              key: "register",
              label: "Đăng ký",
              children: (
                <Form layout="vertical" onFinish={onRegister}>
                  <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                    block
                  >
                    Đăng ký
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AuthPage;
