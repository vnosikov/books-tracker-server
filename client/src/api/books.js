import axios from 'axios';


export async function getBooks(name) {
  const url = '/api/books';
  const res = await axios.get(url);

  return res.data;
}

export async function addBook(book) {
  const url = '/api/books/add';

  await axios.post(url, book); 
}

export async function deleteBook(id) {
  const url = `/api/books/delete/${id}`;
  await axios.delete(url, id);
}

export async function editBook(book, bookId) {
  const url = `/api/books/edit/${bookId}`;

  await axios.put(url, book); 
}
