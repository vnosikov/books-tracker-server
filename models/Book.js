const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  authors: { type: Array, default: [] },
  name: String,
  references: { type: Array, default: [] },
  _project: { type: Schema.Types.ObjectId, ref: 'Project' },

});

mongoose.model('books', bookSchema);
