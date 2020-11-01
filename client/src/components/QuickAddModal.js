import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';

import { addBook } from '../api/books';
import useControlledInput from '../utils/useControlledInput';


const QuickAddModal = ({ show, setShow }) => {
  const [title, setTitle] = useControlledInput('');
  const [authors, setAuthors] = useControlledInput('');
  const [isRead, setIsRead] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const handleSubmit = async () => {
    const book = {
      title,
      authors: authors.split('\n'),
      read: isRead,
    };

    setBlocked(true);
    await addBook(book);
    setBlocked(false);
  };

  const close = () => { setShow(false); }

  const submitAndClose = () => {
    close();
    handleSubmit();
  }

  return (
    <Modal show={show} onHide={() => { setShow(false); }}>
      <Modal.Header closeButton>
        <Modal.Title>Быстрое добавление</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
          <Form.Check
            type="checkbox"
            label="Прочитано"
            value={isRead}
            onChange={() => { setIsRead(!isRead); }}
            disabled={blocked}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close} disabled={blocked}>Close</Button>
        <Button variant="primary" onClick={handleSubmit} disabled={blocked}>Save</Button>
        <Button variant="primary" onClick={submitAndClose} disabled={blocked}>Save and close</Button>
      </Modal.Footer>
    </Modal>
  )
}


QuickAddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};


export default QuickAddModal;
