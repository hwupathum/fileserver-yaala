const mongoose = require('mongoose');

const folderSchema = require("../schema/FolderSchema");

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
