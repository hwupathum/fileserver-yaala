mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9 ]{2,12}$/, 'Please enter a valid name'],
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    trim: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
});

module.exports = userSchema;
