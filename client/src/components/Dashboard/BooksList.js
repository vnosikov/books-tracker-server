import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'react-bootstrap';
import Enumeration from './Enumeration';


const BooksList = ({ booksData, activeBookId, onItemClick }) => (
  <Enumeration
    books={booksData}
    withAction
    isActiveFunction={ id => (id === activeBookId) }
    onItemClick={onItemClick}
    AdditionalComponent={({ nRefs }) => <Badge variant="info" className="ml-auto">{nRefs}</Badge>} 
  />
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
