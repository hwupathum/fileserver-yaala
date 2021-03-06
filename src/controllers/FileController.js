const File = require('./../model/File');
const Folder = require('./../model/Folder');
const uuid = require('uuid');

module.exports.fileUpload = async (req, res) => {
  const { user, body } = req;
  try {
    // check folder exists
    const existingFolder = await Folder.findOne({ ownerId: user.id, path: body.path });
    if (!existingFolder) {
      return res.json({ success: false, message: "Folder Does not Exists" });
    }

    // check file exists in the same directory
    const existingFile = await File.findOne({ fileName: body.fileName, ownerId: user.id, path: body.path });
    if (existingFile) {
      return res.json({ success: false, message: "File Already Exists" });
    }

    const file = new File({
      id: uuid.v1(),
      fileName: body.fileName,
      data: body.data,
      path: body.path,
      size: body.size,
      uploadDate: Date.now(),
      ownerId: user.id
    });


    await file.save();
    res.json({ success: true, message: "File Uploaded Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};

module.exports.fileDelete = async (req, res) => {
  const { user } = req;
  try {
    // check file exists
    const existingFile = await File.findOne({ id: req.params.fileId, ownerId: user.id });
    if (!existingFile) {
      return res.json({ success: false, message: "File Does not Exist" });
    }
    await existingFile.delete();
    res.json({ success: true, message: "File Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};

module.exports.fileView = async (req, res) => {
  const { user } = req;
  try {
    // check file exists
    const existingFile = await File.findOne({ id: req.params.fileId, ownerId: user.id });
    if (!existingFile) {
      return res.json({ success: false, message: "File Does not Exist" });
    }
    res.json({ success: true, file: existingFile });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};

module.exports.fileSearch = async (req, res) => {
  const { user } = req;
  const path = req.query.path || '/';
  try {
    // check file exists
    const files = await File.findByPath(path, user);
    res.json({ success: true, files });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};
