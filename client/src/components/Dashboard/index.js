import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import BooksList from './BooksList';
import BookDetail from './BookDetails';

import { deleteBook } from '../../api/books';


const Dashboard = ({ booksData }) => {
  const [activeBookId, setActiveBookId] = useState(null);

  const selectBook = id => {
    if (activeBookId === id) {
      setActiveBookId(null);
    } else {
      setActiveBookId(id);
    }
  }

  const onRemoveBook = () => {
    if (!activeBookId) {
      return;
    }
    deleteBook(activeBookId);
  }

  const getBookById = targetId => booksData.find(b => b.id === targetId);

  const activeBook = activeBookId ? getBookById(activeBookId) : nullBook;
  const bookReferences = activeBook.references.map(getBookById);
  const targetReferences = activeBook.pointers.map(getBookById);

  return (
    <div>
      <Card>
        <Card.Header className="">
          <Button
            className="mr-1"
            href="/books/new"
          >
            Новая книга
          </Button>
          <Button
            variant="info"
            className="mr-1"
            disabled={!activeBookId}
          >
            Изменить
          </Button>
          <Button
            variant="danger"
            disabled={!activeBookId}
            onClick={onRemoveBook}
          >
            Удалить
          </Button>
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
