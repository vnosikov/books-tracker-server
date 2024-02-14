import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Header from './Header';
import MainContent from './MainContent';

import { getCurrentUser } from '../api/authentication';


const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="container">
            <Header authStatus={authStatus} />
            {authStatus && <MainContent />}
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
