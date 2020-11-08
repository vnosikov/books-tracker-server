const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Book = mongoose.model('books');
const User = mongoose.model('users');


module.exports = (app) => {
  app.get('/api/books/', requireLogin, async (req, res) => {
    const books = await Book.find({ _user: req.user.id });

    const calculatedBooks = books.map(b => {
      const pointers = getReverseRefs(books, b._id);
      return {
        id: b._id,
        title: b.title,
        authors: b.authors,
        references: b.references,
        read: b.read,
        pointers,
      };
    });
    
    res.send(calculatedBooks);
  });

  app.post('/api/books/add', requireLogin, async (req, res) => {
    try {
      const newBook = new Book({
        _user: req.user.id,
        ...req.body,
      });
      await newBook.save();
      res.status(200).send();
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  app.delete('/api/books/delete/:id', requireLogin, async (req, res) => {
    try {
      console.log('REQ BODY', req.params);
      const book = await Book.findById(req.params.id);
      console.log('BOOK USER ID: ', typeof book._user);
      console.log('SENDER USER ID: ', req.user.id);
      if (book._user.equals(req.user.id)) {
        book.remove();
        res.status(200).send();
      } else {
        res.status(401).send('No access to this book');
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // app.delete('/api/projects/:id', requireLogin, async (req, res) => {
  //   await Project.findByIdAndDelete(req.params.id);
  //   res.status(200).send();
  // });

  // app.post('/api/projects/current', requireLogin, async (req, res) => {
  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { _id: req.user.id },
  //       { currentProjectId: req.body.projectId },
  //     );

  //     await user.save();
  //     res.send(user);
  //   } catch (err) {
  //     res.status(500).send({ error: err.message });
  //   }
  // });
};

const getReverseRefs = (books, targetId) =>
  books.filter(b => b.references.includes(targetId)).map(b => b._id); 