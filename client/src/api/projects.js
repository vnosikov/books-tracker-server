import axios from 'axios';

export async function addProject(name) {
  const url = '/api/projects/add';
  const res = await axios.post(url, {
    name,
  });

  return res;
}
