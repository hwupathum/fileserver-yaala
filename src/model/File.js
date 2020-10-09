const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const fileSchema = require("../schema/FileSchema");

fileSchema.statics.findByToken = async function (fileId, token) {
  if(!token) return token;
  const ownerId = await jwt.verify(token, config.SECRET);
  return this.findOne({ id: fileId, ownerId });
};

fileSchema.statics.findByPathAndToken = async function (path, token) {
  if(!token) return token;
  const ownerId = await jwt.verify(token, config.SECRET);
  return this.find({ path: path ? path : '/', ownerId });
};

fileSchema.statics.findByPathAndTokenAndDelete = async function (path, token) {
  if(!token) return token;
  const ownerId = await jwt.verify(token, config.SECRET);
  return this.deleteMany({ path, ownerId });
};

module.exports = mongoose.model('Files', fileSchema);
