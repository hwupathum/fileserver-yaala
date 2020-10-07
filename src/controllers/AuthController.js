const User = require('./../model/user');

module.exports.login = async (req, res) => {
  const token = req.cookies.auth;
  console.log(req.body);
  try {
    const user = await User.findByToken(token);

    if(user) {
      return res.status(400).json({
        message:"You are already logged in"
      });
    }
    // if not logged in already
    const existingUser = await User.findOne({ email: req.body.email}).exec();
    if(!existingUser) return res.status(200).json({isAuth: false, message : 'Auth failed ,email not found'});

    // compare password
    const isMatch = await existingUser.comparePassword(req.body.password);
    if(!isMatch) return res.json({ isAuth : false, message : "Password doesn't match"});

    const data = await existingUser.generateToken();
    res.cookie('auth',data.token).json({
      isAuth : true,
      id : data._id,
      email : data.email
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({message: error.message})
  }
};

module.exports.register = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    token: req.body.token
  });

  if(req.body.password !== req.body.password2)
    return res.status(400).json({message: "password not match"});

  try {
    const existingUser = await User.findOne({ email: user.email}).exec();
    if (existingUser) {
      res.status(400).json({message: "Email already exists"})
    }
    const data = await user.save();
    res.status(200).json({
      user: data
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({message: error.message})
  }
};
