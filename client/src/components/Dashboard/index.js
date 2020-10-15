import React, { useState } from 'react';

import BooksList from './BooksList';
import BookDetail from './BookDetails';

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
  const bookReferences = !activeBook ? [] :
    activeBook.references.map(id => booksData.find(b => b._id === id));
  const targetReferences = !activeBook ? [] :
    booksData.filter(b => b.references.includes(activeBookId));

  return (
    <div>
      <BooksList
        booksData={booksData}
        activeBookId={activeBookId}
        onItemClick={onItemClick}
      />
      <BookDetail
        show={activeBookId}
        bookReferences={bookReferences}
        targetReferences={targetReferences}
      />
    
      {/* <Collapse in={activeBookId} className="mt-5">
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
      </Collapse> */}
    </div>
  );
};


export default Dashboard;
