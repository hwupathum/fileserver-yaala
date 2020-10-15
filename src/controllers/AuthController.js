const User = require('./../model/User');
const Folder = require('./../model/Folder');
const uuid = require('uuid');

module.exports.login = async (req, res) => {
  const token = req.cookies.auth;
  try {
    const user = await User.findByToken(token);

    if(user) {
      return res.json({
        isAuth: true,
        message:"You are already logged in"
      });
    }
    // if not logged in already
    const existingUser = await User.findOne({ email: req.body.email}).exec();
    if(!existingUser) return res.json({isAuth: false, message : 'Login failed ,email not found'});

    // compare password
    const isMatch = await existingUser.comparePassword(req.body.password);
    if(!isMatch) return res.json({isAuth: false, message : "Password doesn't match"});

    const data = await existingUser.generateToken();
    // send the cookie
    return res.cookie('auth',data.token).json({ isAuth: "true", message: "success"});
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};

module.exports.register = async (req, res) => {
  const user = new User({
    id: uuid.v1(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    token: req.body.token
  });

  // compare passwords
  if(req.body.password !== req.body.password2)
    return res.json({isAuth: false, message: "password not match"});

  try {
    // check for email exits
    const existingUser = await User.findOne({ email: user.email}).exec();
    if (existingUser) {
      return res.json({isAuth: false, message: "Email already exists"})
    }
    // register and login user
    const data = await user.generateToken();
    const baseFolder = new Folder({
      id: uuid.v1(),
      ownerId: data.id
    });
    await baseFolder.save();
    return res.cookie('auth',data.token).json({ isAuth: "true", message: "success"});
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: error.message})
  }
};
