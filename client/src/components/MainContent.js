import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import Dashboard from './Dashboard';
import BookEditor from './BookEditor';
import { booksListState } from '../atoms/booksListState';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../api/books';


const MainContent = () => {

  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 5 * 3600 * 1000,
  });

  // TODO: Better info display
  if (booksQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (booksQuery.isError === 'hasError') {
    throw booksQuery.error;
  }

  const booksData = booksQuery.data;
  return (
    <Switch>
      <Route exact path={["/", "/books"]} render={() => <Dashboard booksData={booksData} />} />
      <Route exact path="/books/new" render={() => <BookEditor booksData={booksData} newBook />} />
      <Route exact path="/books/edit/:bookId" render={() => <BookEditor booksData={booksData}/>} />
    </Switch>
  );
};


export default MainContent;