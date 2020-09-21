import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getFullBookName from '../utils/getFullBookName';


const BooksList = ({ books, activeBookId, onSelect }) => (
  <ul className="collection">
    {books.map(b => (
      <li
        key={b._id}
        className={classnames('collection-item', { active: b._id === activeBookId })}
        onClick={() => { onSelect(b._id); }}
      >
        {getFullBookName(b.title, b.authors)}
        <span className="badge">{b.nRefs}</span>
      </li>
    ))}
  </ul>
);

BooksList.defaultProps = {
  activeBookId: null,
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  activeBookId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default BooksList;
