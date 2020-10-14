mongoose = require('mongoose');
const uuid = require('uuid');

const fileSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: "/"
  },
  ownerId: {
    type: String,
    required: true
  }
});

module.exports = fileSchema;
