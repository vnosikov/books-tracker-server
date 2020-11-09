import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import BookEditor from './BookEditor';

import { getBooks } from '../api/books';
import useFetch from '../utils/useFetch';


const MainContent = () => {
  const [booksData, loading, error] = useFetch(getBooks);

  // TODO: Better info display
  if (loading) return null;
  if (error) return null;

  return (
    <BrowserRouter>
      <Route exact path={["/", "/books"]} render={() => <Dashboard booksData={booksData}/>} />
      <Route exact path="/books/new" render={() => <BookEditor booksData={booksData} newBook />} />
      <Route exact path="/books/edit/:bookId" render={() => <BookEditor booksData={booksData}/>} />
    </BrowserRouter>
  );
};


export default MainContent;