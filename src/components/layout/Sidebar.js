import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: '1',
      label: 'Overview',
      children: [
        {
          key: '1-1', 
          label: <Link to="/dashboard">Overview</Link>,
        },
        {
            key: '1-2', 
            label: <Link to="/settings">settings</Link>,
          },
      ],
    },
    {
      key: '2',
      label: 'Settings',
      children: [
        {
          key: '2-1', 
          label: <Link to="/settings">Settings</Link>,
        },
      ],
    },
  ];

  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse} style={siderStyle} >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
    </Sider>
  );
};

export default SidebarComponent;