import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LayoutComponent from "./components/layout/LayoutComponent";
import Login from "./pages/Login";
import DashboardComponent from "./pages/dashboard/Dashboard";
import Settings from "./pages/Settings";
import GitHubCallback from "./pages/GitHubCallback"; // 新增导入
import "./App.css";
import { ConfigProvider, theme } from "antd";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // 立即调用函数表达式来初始化状态
    return !!sessionStorage.getItem("token");
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return sessionStorage.getItem("theme") === "dark";
  });

  const handleThemeChange = (checked) => {
    setIsDarkMode(checked);
    sessionStorage.setItem("theme", checked ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      checked ? "dark" : "light"
    );
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/auth/github/callback"
            element={<GitHubCallback onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <LayoutComponent onLogout={handleLogout}>
                  <Outlet />
                </LayoutComponent>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route path="dashboard" element={<DashboardComponent />} />{" "}
            <Route
              path="settings"
              element={
                <Settings
                  isDarkMode={isDarkMode}
                  onThemeChange={handleThemeChange}
                />
              }
            />
            <Route index element={<Navigate to="dashboard" replace />} />{" "}
          </Route>{" "}
        </Routes>{" "}
      </Router>{" "}
    </ConfigProvider>
  );
};

export default App;
