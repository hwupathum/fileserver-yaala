mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    maxLength: 255
  },
  data: {
    type: Buffer,
    maxLength: 6e+6,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now()
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
