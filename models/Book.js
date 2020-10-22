const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  authors: { type: Array, default: [] },
  title: String,
  references: { type: Array, default: [] },
  read: Boolean,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('books', bookSchema);
