const File = require('./../model/File');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.fileUpload = async (req, res) => {
  const token = req.cookies.auth;
  try {
    const ownerId = await jwt.verify(token, config.SECRET);

    const file = new File({
      fileName: req.body.fileName,
      data: req.body.data,
      path: req.body.path,
      uploadDate: Date.now(),
      ownerId: ownerId
    });

    // check file exists
    const existingFile = await File.findOne({fileName: file.fileName, ownerId: file.ownerId});
    if(existingFile) {
      return res.json({success: false, message: "File Already Exists"});
    }

    await file.save();
    res.send({success: true, message: "File Uploaded Successfully"});
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};

module.exports.fileDelete = async (req, res) => {
  // upload
  res.send('delete');
};

module.exports.fileView = async (req, res) => {
  // upload
  res.send('view');
};

module.exports.fileEdit = async (req, res) => {
  // upload
  res.send('edit');
};

module.exports.fileSearch = async (req, res) => {
  // upload
  res.send('search');
};
