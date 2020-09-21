import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/App';
import authReducer from './reducers/authReducer';
import projectsReducer from './reducers/projectsReducer';
import booksReducer from './reducers/booksReducer';

import 'materialize-css/dist/css/materialize.css';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    books: booksReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
