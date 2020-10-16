const User = require('./../model/User');
const Folder = require('./../model/Folder');
const uuid = require('uuid');

module.exports.login = async (req, res) => {
  const { user, body } = req;
  // check for email exits
  if (!user)
    return res.json({ isAuth: false, message: 'Login failed ,email not found' });
  // compare password
  const isMatch = user.comparePassword(body.password);
  if (!isMatch)
    return res.json({ isAuth: false, message: "Password doesn't match" });

  try {
    const data = await user.generateToken();
    // send the cookie
    return res.cookie('auth', data.token).json({ isAuth: "true", message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};

module.exports.register = async (req, res) => {
  const { user, body } = req;
  // compare passwords
  if (body.password !== body.password2)
    return res.json({ isAuth: false, message: "password not match" });
  // check for email exits
  if (user)
    return res.json({ isAuth: false, message: "Email already exists" })
  const newUser = new User({
    id: uuid.v1(),
    name: body.name,
    email: body.email,
    password: body.password,
  });
  try {
    // register and login user
    const data = await newUser.generateToken();
    const baseFolder = new Folder({
      id: uuid.v1(),
      ownerId: data.id,
      path: '/'
    });
    await baseFolder.save();
    return res.cookie('auth', data.token).json({ isAuth: "true", message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: error.message })
  }
};
