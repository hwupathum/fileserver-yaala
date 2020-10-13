module.exports.logout = async (req, res) => {
  try {
    await req.user.deleteToken();
    return res.cookie('auth', '').sendStatus(200);
  } catch (err) {
    return res.status(403).json({"message": err});
  }
};
