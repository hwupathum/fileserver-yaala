const User = require("../model/User")

module.exports.login = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email, password: req.body.password}).exec()
    if (!existingUser) {
      res.status(403).json({message: "Username or password is incorrect"})
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({message: error.message})
  }
  res.status(200).send()
}

module.exports.register = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const existingUser = await User.findOne({ email: req.body.email}).exec()
    if (existingUser) {
      res.status(403).json({message: "Email already exists"})
    }
    const data = await user.save()
  } catch (error) {
    console.log(error)
    res.status(404).json({message: error.message})
  }
  res.status(200).send()
}