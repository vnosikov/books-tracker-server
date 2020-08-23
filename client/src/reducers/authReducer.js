import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '../api/authentication';
import { addProject } from '../api/projects';

/* 
data = null means we don't know if a user is logged in
data = false means we know that a user is not logged in
data = {User model} means that a user is logged in and we got its props  
*/

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    FETCH_USER_SUCCESS: (state, action) => {
      state.data = action.payload || false;
      state.error = null;
    },
    FETCH_USER_FAILURE: (state, action) => {
      state.data = null;
      state.error = action.payload;
    },

  }
});

const {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} = authSlice.actions;

export const requestCurrentUserAction = () => async dispatch => {
  try {
    const { data } = await getCurrentUser();
    dispatch(FETCH_USER_SUCCESS(data));
  } catch(err) {
    dispatch(FETCH_USER_FAILURE(err));
  }
};

export const addProjectAction = name => async dispatch => {
  try {
    const { data } = await addProject(name);
    dispatch(FETCH_USER_SUCCESS(data));
  } catch(err) {
    // TODO: WTF should come here - ??
  }
};

export default authSlice.reducer;
