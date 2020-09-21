import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import classnames from 'classnames';

import { addProjectAction, deleteProjectAction } from '../reducers/projectsReducer';
import { selectProjectAction } from '../reducers/authReducer';

const ProjectsList = () => {
  const [currentName, setCurrentName] = useState('');
  const projects = useSelector(
    (state) => state.projects.data,
    shallowEqual,
  );
  const currentProjectId = useSelector((state) => state.auth.data && state.auth.data.currentProjectId);
  const dispatch = useDispatch();

  const onAddProjectClick = () => {
    dispatch(addProjectAction(currentName));
    setCurrentName('');
  };

  const onDeleteProjectClick = (id, e) => {
    e.stopPropagation();
    dispatch(deleteProjectAction(id));
  };

  const onSelectProjectClick = (id) => {
    dispatch(selectProjectAction(id));
  };

  return (
    <div>
      <h2>Projects List</h2>
      <ul className="collection">
        {projects && projects.map(({ _id, name }) => (
          <li
            key={_id}
            className={classnames('collection-item', { active: _id === currentProjectId })}
            onClick={() => { onSelectProjectClick(_id); }}
          >
            {name}
            <a onClick={(e) => { onDeleteProjectClick(_id, e); }}> Delete</a>
          </li>
        ))}
      </ul>
      <div className="row">
        <div className="input-field col s6">
          <input
            id="new_project"
            type="text"
            className="validate"
            value={currentName}
            onChange={(e) => { setCurrentName(e.target.value); }}
          />
          <label
            htmlFor="new_project"
            className={currentName.length > 0 ? 'active' : undefined}
          >
            Project Name
          </label>
        </div>
        <button
          type="button"
          className="waves-effect waves-light btn"
          onClick={onAddProjectClick}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsList;
