module.exports.logout = async (req, res) => {
  try {
    await req.user.deleteToken();
    return res.sendStatus(200);
  } catch (err) {
    return res.status(404).json({"message": err});
  }
};
