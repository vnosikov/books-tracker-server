import React from 'react';
import PropTypes from 'prop-types';
import getFullBookName from '../utils/getFullBookName';

const BookDetails = ({ references }) => (
  <ul className="collection">
    {references.map(b => (
      <li
        key={b._id}
        className={'collection-item'}
      >
        {getFullBookName(b.title, b.authors)}
      </li>
    ))}
  </ul>
);

BookDetails.propTypes = {
  references: PropTypes.array.isRequired,
};

export default BookDetails;