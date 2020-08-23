import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { addProjectAction } from '../reducers/authReducer';

const ProjectsList = () => {
  const [ currentName, setCurrentName ] = useState('');
  const data = useSelector(state => state.auth.data, shallowEqual);
  const dispatch = useDispatch();

  const onAddProject = () => {
    dispatch(addProjectAction(currentName));
  };

  return (
    <div>
      <h2>Projects List</h2>
      <ul class="collection">
        {data && data.projects.map((p, i) => <li class="collection-item" key={i}>{p}</li>)}
      </ul>
      <div class="row">
        <div class="input-field col s6">
          <input
            id="new_project"
            type="text"
            class="validate"
            value={currentName}
            onChange={e => { setCurrentName(e.target.value) }}
          />
          <label for="new_project">Project Name</label>
        </div>
        <button
          type="button"
          class="waves-effect waves-light btn"
          onClick={onAddProject}
          button
        >
          Add Project
        </button>
      </div>
    </div>
  )
}

export default ProjectsList;
