// Requirements
const mongoose = require('mongoose');

// Instantiate mongoose schema
const Schema = mongoose.Schema;

// New user schema
const userSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  privateBedroom: {
    type: Boolean,
    required: true,
  },
  privateBathroom: {
    type: Boolean,
    required: true,
  },
  rentPrice: {
    type: Number,
    required: true,
  },
  moreInfo: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  user_id: { 
    type: String,
    required: true 
  },
  requests: {
    type: [Object],
    required: true
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', userSchema);

module.exports = Post;