import React,{ useEffect, useState} from 'react';
import MainContentComponent from './MainContent';
import './Dashboard.css'; 
import apiService from '../../services/appService';

const DashboardComponent = ({ onLogout }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.fetchData();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[]);


  return (
    <div className="dashboard-container">
        <MainContentComponent data={data} />
        <div className='right-sider'>
          RightSider
        </div>
    </div>
  );
};

export default DashboardComponent;