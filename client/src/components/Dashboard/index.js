import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Card, Button } from 'react-bootstrap';

import BooksList from './BooksList';
import BookDetail from './BookDetails';

import { deleteBook } from '../../api/books';
import { useForceUpdate } from '../../atoms/booksListState';
import { Link } from 'react-router-dom';


const Dashboard = ({ booksData }) => {
  const [activeBookId, setActiveBookId] = useState(null);
  const forceUpdate = useForceUpdate();

  const selectBook = id => {
    if (activeBookId === id) {
      setActiveBookId(null);
    } else {
      setActiveBookId(id);
    }
  }

  const onRemoveBook = async () => {
    if (!activeBookId) {
      return;
    }
    await deleteBook(activeBookId);
    forceUpdate();
    // setActiveBookId(null);
  }

  const getBookById = targetId => booksData.find(b => b.id === targetId);

  const activeBook = activeBookId ? getBookById(activeBookId) : nullBook;
  const bookReferences = activeBook.references.map(getBookById);
  const targetReferences = activeBook.pointers.map(getBookById);

  return (
    <div>
      <Card>
        <Card.Header className="">
          <Link 
            to="/books/new"
            className="btn btn-primary btn-sm mr-1"
          >
            Новая книга
          </Link>
          <Link
            to={`/books/edit/${activeBookId}`}
            className={cn('btn btn-info btn-sm mr-1', { disabled: !activeBookId })}
          >
            Изменить
          </Link>
          <Button
            variant="danger"
            disabled={!activeBookId}
            onClick={onRemoveBook}
            size="sm"
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
