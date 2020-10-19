const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const folderSchema = require("../schema/FolderSchema");

folderSchema.statics.findByToken = async function (path, token) {
  const ownerId = await jwt.verify(token, config.SECRET);
  return this.findOne({ownerId, path});
};

folderSchema.statics.findSubFolders = async function (path, user) {
  const pathRegEx = new RegExp(`^${path}([^/]+)/$`);
  return this.find({ ownerId: user.id, path: { $regex: pathRegEx } });
};

folderSchema.statics.findSubFoldersAndDelete = async function (path, user) {
  const pathRegEx = new RegExp(`^${path}.*`);
  await this.deleteMany({ ownerId: user.id, path: { $regex: pathRegEx } });
  return this.deleteOne({ ownerId: user.id, path });
};

module.exports = mongoose.model('Folders', folderSchema);
