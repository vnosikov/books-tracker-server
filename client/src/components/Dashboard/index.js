import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import BooksList from './BooksList';
import BookDetail from './BookDetails';


const Dashboard = ({ booksData }) => {
  const [activeBookId, setActiveBookId] = useState(null);

  const selectBook = id => {
    if (activeBookId === id) {
      setActiveBookId(null);
    } else {
      setActiveBookId(id);
    }
  }


  const getBookById = targetId => booksData.find(b => b.id === targetId);

  const activeBook = activeBookId ? getBookById(activeBookId) : nullBook;
  const bookReferences = activeBook.references.map(getBookById);
  const targetReferences = activeBook.pointers.map(getBookById);

  return (
    <div>
      <Card>
        <Card.Header>
          <Button href="/books/new">Add Book</Button>
        </Card.Header>
        <BooksList
          booksData={booksData}
          activeBookId={activeBookId}
          onItemClick={selectBook}
        />
      </Card>
      <BookDetail
        show={!!activeBookId}
        bookReferences={bookReferences}
        targetReferences={targetReferences}
        selectBook={selectBook}
      />
    </div>
  );
};


const nullBook = { references: [], pointers: [] };


Dashboard.propTypes = {
  booksData: PropTypes.array.isRequired,
};


export default Dashboard;
