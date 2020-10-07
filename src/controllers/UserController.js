exports.login = (req, res) => {
  res.status(200).send(req.body)
}

exports.register = (req, res) => {
  res.send(200, "my own business web page")
}

exports.logout = (req, res) => {
  res.send("my own business web page")
}