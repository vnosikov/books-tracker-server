export default [
  {
    _id: '1',
    title: 'Глазами государства',
    authors: ['James Scott'],
    references: ['2', '3'],
    nRefs: 1,
    read: true,
  },
  {
    _id: '2',
    title: 'The Great Transformation',
    authors: ['Karl Polyani'],
    references: [],
    nRefs: 1,
    read: false,
  },
  {
    _id: '3',
    title: 'Тестова книга',
    authors: ['Первый Автор', 'Второй Автор'],
    references: [],
    nRefs: 2,
    read: false,
  },
  {
    _id: '4',
    title: 'Ахинея: Сборник',
    authors: ['Первый Автор'],
    references: ['3', '1'],
    nRefs: 0,
    read: false,
  },

];
