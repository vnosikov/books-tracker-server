import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Card, Button } from 'react-bootstrap';
import Select from 'react-select';
import QuickAddModal from './QuickAddModal';
import { useParams } from 'react-router-dom';

import { addBook, editBook } from '../api/books';
import useControlledInput from '../utils/useControlledInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const BookEditor = ({ booksData, newBook }) => {
  const bookId = useParams().bookId || null;
  const bookToEdit = newBook ? emptyBook :
    booksData.find(b => b.id === bookId);

  const [title, setTitle] = useControlledInput(bookToEdit.title);
  const [authors, setAuthors] = useControlledInput(bookToEdit.authors.join('\n'));
  const [references, setReferences] = useState(
    bookToEdit.references.map(r => ({
      value: r,
      label: booksData.find(b => b.id === r).title,
    })),
  );
  const [isRead, setIsRead] = useState(bookToEdit.read);

  const [show, setShow] = useState(false);

  const selectOptions = booksData.map(b => ({
    label: b.title,
    value: b.id,
  }));

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: book => addBook(book),
    onSuccess: data => {
      console.log('pDATA',data)
      queryClient.useQueryData(['books'], data);
    },
    mutationKey: ['addBook'],
  });

  const editMutation = useMutation({
    mutationFn: book => editBook(book, bookId),
    onSuccess: (data, variables, context) => {
      console.log('eDATA',data, variables, context)
      // queryClient.useQueryData(['books'], data);
    },

    mutationKey: ['editBook'],
  });

  const blocked = addMutation.isPending || editMutation.isPending;

  const handleSubmit = async () => {
    const book = {
      title,
      authors: authors.split('\n'),
      references: references ? references.map(r => r.value) : [],
      read: isRead,
    };

    if (newBook) {
      addMutation.mutate(book);
    } else {
      await editMutation.mutate(book);
    }
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Button onClick={() => { setShow(true); } }>Добавить быстро</Button>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Label>
              Название
            </Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={setTitle}
              disabled={blocked}
            />

            <Form.Label>
              Авторы
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={authors}
              onChange={setAuthors}
              disabled={blocked}
            />
            <Form.Label>
              Ссылки на:
            </Form.Label>
            <Select
              isMulti
              isClearable
              options={selectOptions}
              defaultValue={references}
              onChange={setReferences}
              disabled={blocked}  
            />
            <Form.Check
              type="checkbox"
              label="Прочитано"
              checked={isRead}
              onChange={() => { setIsRead(!isRead); }}
              disabled={blocked}
            />
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={blocked}
              className="mt-4"
            >
              Сохранить
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <QuickAddModal show={show} setShow={setShow} />
    </React.Fragment>
  );
};


const emptyBook = {
  title: '',
  authors: [],
  references: [],
  read: false,
};

BookEditor.defaultProps = {
  newBook: false,
}

BookEditor.propTypes = {
  booksData: PropTypes.array.isRequired,
  newBook: PropTypes.bool,
};


export default BookEditor;