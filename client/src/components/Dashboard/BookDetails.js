import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Collapse } from 'react-bootstrap';

import Enumeration from './Enumeration';


const BookDetail = ({
  show,
  bookReferences,
  targetReferences,
  selectBook,
}) => (
  <Collapse in={show} className="mt-5">
    <Tabs defaultActiveKey="details">
      <Tab eventKey="details" title="Details">
        {show && (
          <div>
            <h5></h5>
            <h5>Description:</h5>
            <p>Some random text preview</p>
          </div>
        )}
        <Enumeration
          books={bookReferences}
          withAction
          onItemClick={selectBook}
        />
      </Tab>

      <Tab eventKey="target" title="Target of Refs">
        <Enumeration
          books={targetReferences}
          withAction
          onItemClick={selectBook}
        />
      </Tab>
    </Tabs>
  </Collapse>
);


BookDetail.propTypes = {
  show: PropTypes.bool.isRequired,
  bookReferences: PropTypes.array.isRequired,
  targetReferences: PropTypes.array.isRequired,
  selectBook: PropTypes.func.isRequired,
};


export default BookDetail;
