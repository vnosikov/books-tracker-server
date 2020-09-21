import { createSlice } from '@reduxjs/toolkit';
import books from '../dummies/books';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    data: books,
  },
  reducers: {
    SET_BOOKS: (state, action) => {
      state.data = action.payload;
    },
    ADD_BOOK: (state, action) => {
      state.data.push(action.payload);
    }
  },
});

const {
  SET_BOOKS,
  ADD_BOOK,
} = booksSlice.actions;

export const setBooksAction = (books) => (dispatch) => {
  dispatch(SET_BOOKS(books));
};


export default booksSlice.reducer;
