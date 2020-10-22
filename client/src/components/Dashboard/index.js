import React, { useState } from 'react';

import BooksList from './BooksList';
import BookDetail from './BookDetails';

import { getBooks } from '../../api/books';
import useFetch from '../../utils/useFetch';


const nullBook = { references: [], pointers: [] };

const Dashboard = () => {
  const [activeBookId, setActiveBookId] = useState(null);
  const [booksData, loading, error] = useFetch(getBooks);

  const selectBook = id => {
    debugger;
    if (activeBookId === id) {
      setActiveBookId(null);
    } else {
      setActiveBookId(id);
    }
  }

  if (loading) return null;
  if (error) return null;

  const getBookById = targetId => booksData.find(b => b.id === targetId);

  const activeBook = activeBookId ? getBookById(activeBookId) : nullBook;
  const bookReferences = activeBook.references.map(getBookById);
  const targetReferences = activeBook.pointers.map(getBookById);

  return (
    <div>
      <BooksList
        booksData={booksData}
        activeBookId={activeBookId}
        onItemClick={selectBook}
      />
      <BookDetail
        show={!!activeBookId}
        bookReferences={bookReferences}
        targetReferences={targetReferences}
        selectBook={selectBook}
      />
    </div>
  );
};


export default Dashboard;
