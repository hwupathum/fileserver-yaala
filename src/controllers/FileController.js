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
    res.json({success: true, message: "File Uploaded Successfully"});
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};

module.exports.fileDelete = async (req, res) => {
  const token = req.cookies.auth;
  try {
    // check file exists
    const existingFile = await File.findByToken(req.params.fileId, token);
    if(!existingFile) {
      return res.json({success: false, message: "File Does not Exist"});
    }
    await existingFile.delete();
    res.json({success: true, message: "File Deleted"});
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};

module.exports.fileView = async (req, res) => {
  const token = req.cookies.auth;
  try {
    // check file exists
    const existingFile = await File.findByToken(req.params.fileId, token);
    if(!existingFile) {
      return res.json({success: false, message: "File Does not Exist"});
    }
    res.json({success: true, existingFile });
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};

module.exports.fileEdit = async (req, res) => {
  // upload
  res.send('edit');
};

module.exports.fileSearch = async (req, res) => {
  // upload
  res.send('search');
};
