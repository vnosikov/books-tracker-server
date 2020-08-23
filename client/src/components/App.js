import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { requestCurrentUserAction } from '../reducers/authReducer';
import Header from './Header';
import Landing from './Landing';
import ProjectsList from './ProjectsList';


const Dashboard = () => <h2>Dashboard</h2>
const NewItem = () => <h2>New Item</h2>

const App = () => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(requestCurrentUserAction());
    },
    [dispatch]
  );

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/projects" component={ProjectsList} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/new" component={NewItem} />
      </div>
    </BrowserRouter>
  );
}


export default App;
