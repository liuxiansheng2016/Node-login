import React from "react";
import { Card, Col, Row, Switch, Space, Typography } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";

const { Title } = Typography;

const Settings = ({ isDarkMode, onThemeChange }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={2}> 设置 </Title>{" "}
      </Col>{" "}
      <Col span={8}>
        <Card title="主题设置" bordered={false}>
          <Space direction="vertical" size="middle">
            <Space>
              {" "}
              {isDarkMode ? <BulbOutlined /> : <BulbFilled />}{" "}
              <span> 深色模式 </span>{" "}
              <Switch
                checked={isDarkMode}
                onChange={onThemeChange}
                checkedChildren="开"
                unCheckedChildren="关"
              />
            </Space>{" "}
          </Space>{" "}
        </Card>{" "}
      </Col>{" "}
      <Col span={8}>
        <Card title="其他设置" bordered={false}>
          其他设置内容{" "}
        </Card>{" "}
      </Col>{" "}
      <Col span={8}>
        <Card title="关于" bordered={false}>
          关于内容{" "}
        </Card>{" "}
      </Col>{" "}
    </Row>
  );
};

export default Settings;
