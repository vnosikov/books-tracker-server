import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { requestCurrentUserAction } from '../reducers/authReducer';
import { getProjectsListAction } from '../reducers/projectsReducer';
import Header from './Header';
import Dashboard from './Dashboard';
import ProjectsList from './ProjectsList';

const NewItem = () => <h2>New Item</h2>;

const App = () => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(requestCurrentUserAction());
      dispatch(getProjectsListAction());
    },
    [dispatch],
  );

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/projects" component={ProjectsList} />
        <Route exact path="/new" component={NewItem} />
      </div>
    </BrowserRouter>
  );
};

export default App;
