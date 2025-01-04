import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import MainContentComponent from "./MainContent";
import "./Dashboard.css";
import apiService from "../../services/appService";
import LoadingComponent from "../../components/common/LoadingComponent";

const DashboardComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.fetchData();
        if (response) {
          setData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingComponent tip="加载中..." />;

  if (error) return <div> 错误: {error} </div>;
  if (!data) return <div> 暂无数据 </div>;

  return (
    <div className="dashboard-container">
      <MainContentComponent data={data} />{" "}
      <div className="right-sider">RightSider </div>{" "}
    </div>
  );
};

export default DashboardComponent;
