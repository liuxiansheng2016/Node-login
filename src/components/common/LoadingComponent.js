import React from "react";
import { Spin } from "antd";

const LoadingComponent = ({ tip = "加载中...", fullScreen = true }) => {
  const style = fullScreen
    ? {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }
    : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      };

  return (
    <div style={style}>
      <Spin size="large" tip={tip} />{" "}
    </div>
  );
};

export default LoadingComponent;
