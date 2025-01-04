import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/appService';


const Login = ({ onLogin }) => {
  const [form] = Form.useForm();
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin  = async () => {
    try {
      let name = form.getFieldValue("username");
      let password = form.getFieldValue("password");
      if(name && password) {
        const response = await apiService.login(name, password);
        localStorage.setItem('token', response.token);
        onLogin(); 
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      let name = form.getFieldValue("username");
      let password = form.getFieldValue("password");
      if (name && password) {
        await apiService.register(name, password);
        setIsRegistering(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={isRegistering ? handleRegister : handleLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
            {isRegistering ? 'Register' : 'Log in'}
          </Button>
          <Button type="link" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Log in' : 'Don\'t have an account? Register'}
          </Button>
          {
            !isRegistering && (
              <Button type="link" href="api/auth/github">
               {'Login with GitHub'}
            </Button>
            )
          }
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;