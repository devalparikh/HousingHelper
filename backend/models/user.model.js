// Requirements
const mongoose = require('mongoose');

// Instantiate mongoose schema
const Schema = mongoose.Schema;

// New user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  incoming_requests: {
    type: [Object],
    required: true
  },
  outgoing_requests: {
    type: [Object],
    required: true
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;