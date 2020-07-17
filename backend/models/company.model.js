// Requirements
const mongoose = require('mongoose');

// Instantiate mongoose schema
const Schema = mongoose.Schema;

// New user schema
const userSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyNameLowerCase: {
    type: String,
    required: true,
  }
}, 
{
  timestamps: true,
});

const Company = mongoose.model('Company', userSchema);

module.exports = Company;