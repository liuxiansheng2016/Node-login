import React, { useState,  useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LayoutComponent from './components/layout/LayoutComponent';
import Login from './pages/Login';
import DashboardComponent from './pages/dashboard/Dashboard';
import Settings from './pages/Settings';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // 立即调用函数表达式来初始化状态
    return !!localStorage.getItem('token');
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
          <Route path="dashboard" element={<DashboardComponent />} />
          <Route path="settings" element={<Settings />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;