import axios from 'axios';


export async function getBooks(name) {
  const url = '/api/books';
  const res = await axios.get(url);

  return res.data;
}
