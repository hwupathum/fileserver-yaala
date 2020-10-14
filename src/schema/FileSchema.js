mongoose = require('mongoose');
const uuid = require('uuid');

const fileSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
    maxLength: 255
  },
  size: {
    type: Number,
    required: true
  },
  data: {
    type: String,
    maxLength: 6e+6,
    required: true
  },
  uploadDate: {
    type: Date,
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
