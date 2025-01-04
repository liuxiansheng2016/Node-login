import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/appService";
import LoadingComponent from "../components/common/LoadingComponent";

const GitHubCallback = ({ onLogin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      try {
        const response = await apiService.verifyToken(token);
        if (response.success) {
          sessionStorage.setItem("token", token);
          onLogin();
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate, onLogin]);

  return <LoadingComponent tip="登录中..." />;
};

export default GitHubCallback;
