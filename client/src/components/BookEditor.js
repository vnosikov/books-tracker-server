import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Button } from 'react-bootstrap';
import Select from 'react-select';
import QuickAddModal from './QuickAddModal';

import { addBook } from '../api/books';
import useControlledInput from '../utils/useControlledInput';

const BookEditor = ({ booksData }) => {
  const [title, setTitle] = useControlledInput('');
  const [authors, setAuthors] = useControlledInput('');
  const [references, setReferences] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const [show, setShow] = useState(false);

  const selectOptions = booksData.map(b => ({
    label: b.title,
    value: b.id,
  }));

  const handleSubmit = async () => {
    const book = {
      title,
      authors: authors.split('\n'),
      references: references.map(r => r.value),
      read: isRead,
    };

    setBlocked(true);
    await addBook(book);
    setBlocked(false);
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
              onChange={setReferences}
              disabled={blocked}  
            />
            <Form.Check
              type="checkbox"
              label="Прочитано"
              value={isRead}
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


BookEditor.propTypes = {
  booksData: PropTypes.array.isRequired,
};


export default BookEditor;