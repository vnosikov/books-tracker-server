import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, ListGroup, Collapse } from 'react-bootstrap';

import getFullBookName from '../../utils/getFullBookName';



const BookDetail = ({ show, bookReferences, targetReferences }) => (
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

        <ListGroup>
          {bookReferences.map(rb => (
            <ListGroup.Item
              key={rb._id}
              className="d-flex align-items-baseline"
              action
            >
              {getFullBookName(rb.title, rb.authors)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Tab>

      <Tab eventKey="target" title="Target of Refs">
        <ListGroup>
          {targetReferences.map(rb => (
            <ListGroup.Item
              key={rb._id}
              className="d-flex align-items-baseline"
              action
            >
              {getFullBookName(rb.title, rb.authors)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Tab>
    </Tabs>
  </Collapse>
);


BookDetail.propTypes = {
  show: PropTypes.bool.isRequired,
  bookReferences: PropTypes.array.isRequired,
  targetReferences: PropTypes.array.isRequired,
};


export default BookDetail;
