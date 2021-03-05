import { atom, selector, useSetRecoilState } from 'recoil';
import { getBooks } from '../api/books';


export const booksReset = atom({
  key: 'booksListForceToUpdate',
  default: 0,
});

export const booksListState = selector({
  key: 'booksListState',
  get: async ({ get }) => {
    get(booksReset);
    const books = await getBooks();
    return books;
  },
});

export const useForceUpdate = () => {
  const forceUpdate = useSetRecoilState(booksReset);
  return () => {
    forceUpdate(flag => flag + 1);
  };
}
