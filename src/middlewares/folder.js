const Folder = require('./../model/Folder');

const folder = async (req, res, next) => {
    let token = req.cookies.auth;
    const path = req.body.path || req.query.path || '/';
    try {
        const folder = await Folder.findByToken(path, token);
        req.folder = folder;
        next();
    } catch (error) {
        throw error;
    }
};

module.exports = { folder };