const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const fileSchema = require("../schema/FileSchema");

fileSchema.statics.findByPath = async function (path, user) {
  return this.find({ path, ownerId: user.id });
};

fileSchema.statics.findByPathAndDelete = async function (path, user) {
  return this.deleteMany({ path, ownerId: user.id });
};

module.exports = mongoose.model('Files', fileSchema);
