import React,{ useEffect, useState} from 'react';
import MainContentComponent from './MainContent';
import './Dashboard.css'; 
import apiService from '../../services/appService';

const DashboardComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.fetchData();
        if (response ) {
          setData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[]);

  if (!data) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="dashboard-container">
        <MainContentComponent data={data || {}} />
        <div className='right-sider'>
          RightSider
        </div>
    </div>
  );
};

export default DashboardComponent;