const File = require('./../model/File');
const Folder = require('./../model/Folder');
const User = require('./../model/User');

module.exports.fileUpload = async (req, res) => {
  const token = req.cookies.auth;
  try {
    // check user exits
    const existingUser = await User.findByToken(token);
    if(!existingUser) {
      return res.json({success: false, message: "User Does not Exist"});
    }

    const file = new File({
      fileName: req.body.fileName,
      data: req.body.data,
      path: req.body.path,
      size: req.body.size,
      uploadDate: Date.now(),
      ownerId: existingUser.id
    });

    // check folder exists
    const existingFolder = await Folder.findOne({ownerId: file.ownerId, path: file.path});
    if(!existingFolder) {
      return res.json({success: false, message: "Folder Does not Exists"});
    }

    // check file exists in the same directory
    const existingFile = await File.findOne({fileName: file.fileName, ownerId: file.ownerId, path: file.path});
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
    res.json({success: true, file: existingFile });
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};

module.exports.fileSearch = async (req, res) => {
  const token = req.cookies.auth;
  try {
    // check file exists
    const files = await File.findByPathAndToken(req.query.path, token);
    res.json({success: true, files });
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};
