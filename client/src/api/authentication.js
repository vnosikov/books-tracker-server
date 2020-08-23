import axios from 'axios';

export async function getCurrentUser() {
  const url = '/api/current_user'
  const data = await axios.get(url);
  return data;
};
