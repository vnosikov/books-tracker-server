import React from 'react';
import PropTypes from 'prop-types';

import { ListGroup, Badge } from 'react-bootstrap';
import getFullBookName from '../../utils/getFullBookName';


const BooksList = ({ booksData, activeBookId, onItemClick }) => (
  <ListGroup>
    {booksData.map(b => (
      <ListGroup.Item
        key={b._id}
        className="d-flex align-items-baseline"
        action
        active={b._id === activeBookId}
        onClick={() => { onItemClick(b._id); }}
      >
        {getFullBookName(b.title, b.authors)}
        <Badge variant="info" className="ml-auto">{b.nRefs}</Badge>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

BooksList.defaultProps = {
  activeBookId: null,
};

BooksList.propTypes = {
  booksData: PropTypes.array.isRequired,
  activeBookId: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
};

export default BooksList;
