import React from 'react';
import { Space, Table, Layout } from 'antd';


const { Content } = Layout;
const columns  = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Website',
    key: 'website',
    dataIndex: 'website',
  },
  {
    title: 'Company',
    key: 'company',
    render: (_, company) => (
      <Space size="middle">
        <a> {company.name}</a>
      </Space>
    ),
  },
];



const MainContentComponent = ({data}) => (
  <Content style={{ padding: '24px', margin: 0, minHeight: 280 }} >
    {data && (
      <Table columns={columns} dataSource={data} />
      )}
  </Content>
);

export default MainContentComponent;