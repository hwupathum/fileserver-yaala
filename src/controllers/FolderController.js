const Folder = require('./../model/Folder');
const User = require('./../model/User');
const File = require('./../model/File');
const uuid = require('uuid');

module.exports.folderCreate = async (req, res) => {
  const { folder, user, body } = req;
  const path = body.path || '/';

  // check folder exists
  if (folder)
    return res.json({ success: false, message: "Folder Already Exists" });

  try {

    const newFolder = new Folder({
      id: uuid.v1(),
      path: path,
      ownerId: user.id
    });

    await newFolder.save();
    res.json({ success: true, message: "Folder Created Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};

module.exports.folderView = async (req, res) => {
  const { folder, query, user } = req;
  const path = query.path || '/';


  // check folder exists
  if (!folder)
    return res.json({ success: false, message: "Folder Does not Exists" });

  try {
    // find files inside folder
    const files = await File.findByPath(path, user);
    // find sub folders inside folder
    const subFolders = await Folder.findSubFolders(path, user);
    res.json({ success: true, files, folders: subFolders });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};

module.exports.folderDelete = async (req, res) => {
  const { folder, query, user } = req;
  const path = query.path || '/';

  if (path === "/")
    return res.json({ success: false, message: "Folder Cannot be Deleted" });
  // check folder exists
  if (!folder)
    return res.json({ success: false, message: "Folder Does not Exist" });

  try {
    // delete files inside folder
    await File.findByPathAndDelete(path, user);
    // delete sub folders inside folder
    await Folder.findSubFoldersAndDelete(path, user);
    res.json({ success: true, message: "Folder Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};
