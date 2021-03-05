import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import Header from './Header';
import MainContent from './MainContent';

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
    <RecoilRoot>
      <div className="container">
        <Header authStatus={authStatus} />
        {authStatus && <MainContent />}
      </div>
    </RecoilRoot>
  );
};

export default App;
