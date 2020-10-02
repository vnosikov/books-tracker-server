import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import { getCurrentUser } from '../api/authentication';


const Dashboard = () => <h2>New Item</h2>;

const App = () => {
  const [authStatus, setAuthStatus] = useState(undefined);
  useEffect(
    () => {
      async function doRequest() {
        const { data } = await getCurrentUser();
        setAuthStatus(!!data);
      }
      doRequest();
    },
    [],
  );

  return (
    <BrowserRouter>
      <div className="container">
        <Header authStatus={authStatus} />
        <Route exact path="/" component={Dashboard} />
      </div>
    </BrowserRouter>
  );
};

export default App;
