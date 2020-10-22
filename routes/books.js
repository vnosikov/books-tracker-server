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

  // app.get('/api/projects', requireLogin, async (req, res) => {
  //   const projects = await Project.find({ _user: req.user.id });
  // });

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