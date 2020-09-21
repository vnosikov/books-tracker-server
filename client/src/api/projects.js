import axios from 'axios';

export async function addProject(name) {
  const url = '/api/projects/add';
  const res = await axios.post(url, {
    name,
  });

  return res;
}

export async function getProjects(name) {
  const url = '/api/projects';
  const res = await axios.get(url);

  return res;
}

export async function deleteProject(id) {
  const url = `/api/projects/${id}`;
  await axios.delete(url);
}

export async function setCurrentProject(id) {
  const url = '/api/projects/current';
  await axios.post(url, { projectId: id });
}
