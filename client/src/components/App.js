import React from 'react';
import { useDispatch } from 'react-redux';
import { test } from '../reducers/authReducer';


const App = () => {
  const dispatch = useDispatch();
  return (
    <div>
      Hello, man!
      <button onClick={() => {dispatch(test()); }}>OK</button>
    </div>
  );
}


export default App;
