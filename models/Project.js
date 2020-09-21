const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('projects', projectSchema);
