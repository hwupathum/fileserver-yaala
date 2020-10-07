module.exports.logout = async (req, res) => {
  try {
    await req.user.deleteToken();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err);
  }
};
