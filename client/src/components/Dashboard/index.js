import React, { useState } from 'react';
import { ListGroup, Badge, Card, ListGroupItem } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';

import getFullBookName from '../../utils/getFullBookName';

import booksData from '../../dummies/books';


const Dashboard = () => {
  const [activeBookId, setActiveBookId] = useState(null);

  const onItemClick = id => {
    if (activeBookId === id) {
      setActiveBookId(null);
    } else {
      setActiveBookId(id);
    }
  }

  const activeBook = booksData.find(b => b._id === activeBookId);
  const references = !activeBook ? [] :
    activeBook.references.map(id => booksData.find(b => b._id === id));

  return (
    <div>
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
      <Collapse in={activeBookId} className="mt-5">
        <Card body>
          <ListGroup>
            {references.map(rb => (
              <ListGroup.Item
                key={rb._id}
                className="d-flex align-items-baseline"
                action
              >
                {getFullBookName(rb.title, rb.authors)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Collapse>
    </div>
  );
};


export default Dashboard;
