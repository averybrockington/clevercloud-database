import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './index.css';
//ZB

const Dashboard = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleLogout = () => {
        navigate('/');
    };

    return (
    <div className = "dashboard">
        <h1>User Dashboard</h1>
        <h2>User Overview</h2>
        <h3>Etc...</h3>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};



export default Dashboard;
