import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header';
import SidebarComponent from './Sidebar';
import FooterComponent from './Footer';


const LayoutComponent = ({ children, onLogout}) => {
  return (
    <Layout>
      <HeaderComponent  onLogout={onLogout}/>
      <Layout>
        <SidebarComponent />
        <Layout.Content>
          {children}
        </Layout.Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default LayoutComponent;