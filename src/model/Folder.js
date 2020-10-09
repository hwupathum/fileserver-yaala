const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const folderSchema = require("../schema/FolderSchema");

folderSchema.static.createBaseFolder = async function (token) {
  if(!token) return token;
  this.ownerId = await jwt.verify(token, config.SECRET);
  return this.save();
};

folderSchema.statics.findByToken = async function (path, token) {
  if(!token) return token;
  const ownerId = await jwt.verify(token, config.SECRET);
  return this.findOne({ownerId, path});
};

folderSchema.statics.findSubFoldersByToken = async function (path, token) {
  if(!token) return token;
  const ownerId = await jwt.verify(token, config.SECRET);
  const pathRegEx = new RegExp(`${path}([^/]+)/`);
  return this.find({ownerId, path: { $regex: pathRegEx }});
};

folderSchema.statics.findSubFoldersByTokenAndDelete = async function (path, token) {
  if(!token) return token;
  const ownerId = await jwt.verify(token, config.SECRET);
  const pathRegEx = new RegExp(`${path}([^/]+)/`);
  await this.deleteMany({ownerId, path: { $regex: pathRegEx }});
  return this.deleteOne({ownerId, path});
};

module.exports = mongoose.model('Folders', folderSchema);
