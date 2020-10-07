mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: uuidv4()
  },
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9 ]{2,12}$/, 'Please enter a valid name']
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Users', UserSchema)