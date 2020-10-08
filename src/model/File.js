const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const fileSchema = require("../schema/FileSchema");

fileSchema.statics.findByToken = async function (fileId, token) {
  if(!token) return token;
  const ownerId = await jwt.verify(token, config.SECRET);
  console.log(ownerId);
  return this.findOne({ id: fileId, ownerId: ownerId });
};

module.exports = mongoose.model('Files', fileSchema);
