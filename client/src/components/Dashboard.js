import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';

const Dashboard = () => {
  const authData = useSelector((state) => state.auth.data, shallowEqual);
  if (authData === null) {
    return null;
  }

  if (authData === false) {
    return <div>You have to Login</div>;
  }

  if (!authData.currentProjectId) {
    return <Redirect to="/projects" />;
  }

  return <DashboardComponent />;
};

export default Dashboard;
