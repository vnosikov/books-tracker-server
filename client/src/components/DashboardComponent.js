import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import BooksList from './BooksList';
import BookDetails from './BookDetails';


const DashboardComponent = () => {
  const books = useSelector(
    (state) => state.books.data,
    shallowEqual,
  );

  const [activeBookId, setActiveBookId] = useState(null);

  const onBookSelect = id => { setActiveBookId(id); }

  return (
    <React.Fragment>
       <h2>Books</h2>
      <BooksList 
        books={books}
        onSelect={onBookSelect}
        activeBookId={activeBookId}
      />
      {activeBookId && (
        <BookDetails
          references={getReferences(activeBookId, books)} />
      )}
    </React.Fragment>
  );
};

const getReferences = (id, books) =>
  books.find(b => b._id === id).references.map(refId => books.find(b => b._id === refId));


export default DashboardComponent;
