import { createSlice } from '@reduxjs/toolkit';
import { getProjects, addProject, deleteProject } from '../api/projects';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [],
  },
  reducers: {
    FETCH_PROJECTS_SUCCESS: (state, action) => {
      state.data = action.payload;
    },
    ADD_PROJECT: (state, action) => {
      state.data.push(action.payload);
    },
    DELETE_PROJECT: (state, action) => {
      state.data = state.data.filter(
        (project) => project._id !== action.payload,
      );
    },
  },
});

const {
  FETCH_PROJECTS_SUCCESS,
  ADD_PROJECT,
  DELETE_PROJECT,
} = projectsSlice.actions;

export const getProjectsListAction = () => async (dispatch) => {
  try {
    const { data } = await getProjects();
    dispatch(FETCH_PROJECTS_SUCCESS(data));
  } catch (err) {
    // error should be here
  }
};

export const addProjectAction = (name) => async (dispatch) => {
  try {
    const { data } = await addProject(name);
    dispatch(ADD_PROJECT(data));
  } catch (err) {
    // TODO: WTF should come here - ??
  }
};

export const deleteProjectAction = (id) => async (dispatch) => {
  try {
    await deleteProject(id);
    dispatch(DELETE_PROJECT(id));
  } catch (err) {
    // TODO: WTF should come here - ??
  }
};

export default projectsSlice.reducer;
