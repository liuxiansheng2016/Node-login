import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const items = [
    {
      key: '1',
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '2',
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} items={items} />
    </Header>
  );
};

export default HeaderComponent;