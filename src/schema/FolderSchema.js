mongoose = require('mongoose');
const uuid = require('uuid');

const folderSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  }
});

module.exports = folderSchema;
