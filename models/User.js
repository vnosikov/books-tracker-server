const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  currentProjectId: { type: Schema.Types.ObjectId, ref: 'Project' },
});

mongoose.model('users', userSchema);
