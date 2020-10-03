import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Dashboard from './Dashboard';
import { getCurrentUser } from '../api/authentication';


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
    <div className="container">
      <Header authStatus={authStatus} />
      {authStatus && (
        <BrowserRouter>
          <Route exact path="/" component={Dashboard} />
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
