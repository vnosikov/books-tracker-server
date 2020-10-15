import React from 'react';
import PropTypes from 'prop-types';

import { ListGroup } from 'react-bootstrap';

import getFullBookName from '../../utils/getFullBookName';


const Enumeration = ({
  books,
  withAction,
  isActiveFunction,
  onItemClick,
  AdditionalComponent
}) => (
  <ListGroup>
    {books.map(b => (
      <ListGroup.Item
        key={b._id}
        className="d-flex align-items-baseline"
        action={withAction}
        active={isActiveFunction(b._id)}
        onClick={() => { onItemClick(b._id); }}
      >
        {getFullBookName(b.title, b.authors)}
        <AdditionalComponent {...b} />
      </ListGroup.Item>
    ))}
  </ListGroup>
);


Enumeration.defaultProps = {
  withAction: false,
  isActiveFunction: () => false,
  onItemClick: () => {},
  AdditionalComponent: () => null,
};


Enumeration.popTypes = {
  books: PropTypes.array.isRequired,
  withAction: PropTypes.bool,
  isActiveFunction: PropTypes.func,
  onItemClick: PropTypes.func,
  AdditionalComponent: PropTypes.func,
}

export default Enumeration;
