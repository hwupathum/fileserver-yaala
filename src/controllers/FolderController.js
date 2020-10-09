const Folder = require('./../model/Folder');
const User = require('./../model/User');
const File = require('./../model/File');

module.exports.folderCreate = async (req, res) => {
  const token = req.cookies.auth;
  try {
    // check user exits
    const existingUser = await User.findByToken(token);
    if(!existingUser) {
      return res.json({success: false, message: "User Does not Exist"});
    }

    const folder = new Folder({
      path: req.body.path,
      ownerId: existingUser.id
    });

    // check folder exists
    const existingFolder = await Folder.findOne({ownerId: folder.ownerId, path: folder.path});
    if(existingFolder) {
      return res.json({success: false, message: "Folder Already Exists"});
    }

    await folder.save();
    res.json({success: true, message: "Folder Created Successfully"});
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};

module.exports.folderView = async (req, res) => {
  const token = req.cookies.auth;
  try {
    // check folder exists
    const existingFolder = await Folder.findByToken(req.query.path, token);
    if(!existingFolder) {
      return res.json({success: false, message: "Folder Does not Exists"});
    }
    // find files inside folder
    const files = await File.findByPathAndToken(req.query.path, token);
    // find sub folders inside folder
    const subFolders = await Folder.findSubFoldersByToken(req.query.path, token);
    res.json({success: true, files, subFolders });
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};

module.exports.folderDelete = async (req, res) => {
  const token = req.cookies.auth;
  try {
    if(req.query.path === "/") {
      return res.json({success: false, message: "Folder Cannot be Deleted"});
    }
    // check folder exists
    const existingFolder = await Folder.findByToken(req.query.path, token);
    if(!existingFolder) {
      return res.json({success: false, message: "Folder Does not Exist"});
    }
    // delete files inside folder
    await File.findByPathAndTokenAndDelete(req.query.path, token);
    // delete sub folders inside folder
    await Folder.findSubFoldersByTokenAndDelete(req.query.path, token);
    res.json({success: true, message: "Folder Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};
