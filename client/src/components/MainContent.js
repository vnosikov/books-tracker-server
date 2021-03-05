import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import Dashboard from './Dashboard';
import BookEditor from './BookEditor';
import { booksListState } from '../atoms/booksListState';


const MainContent = () => {
  const booksDataL = useRecoilValueLoadable(booksListState);

  // TODO: Better info display
  if (booksDataL.state === 'loading') {
    return <div>Loading...</div>
  }

  if (booksDataL.state === 'hasError') {
    throw booksData.contents;
  }

  const booksData = booksDataL.contents;
  return (
    <Switch>
      <Route exact path={["/", "/books"]} render={() => <Dashboard booksData={booksData} />} />
      <Route exact path="/books/new" render={() => <BookEditor booksData={booksData} newBook />} />
      <Route exact path="/books/edit/:bookId" render={() => <BookEditor booksData={booksData}/>} />
    </Switch>
  );
};


export default MainContent;