const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  projects: { type: Array, default: [] },
});

mongoose.model('users', userSchema);
