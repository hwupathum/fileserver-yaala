mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const SALT = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9 ]{2,12}$/, 'Please enter a valid name'],
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    trim: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
});

// pre functions to hash password
userSchema.pre('save', async function (next)  {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }

});

// compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// generate token
userSchema.methods.generateToken = async function() {
  this.token= jwt.sign(this._id.toHexString(), config.SECRET);
  return this.save();
};

// find by token
userSchema.statics.findByToken = async function (token) {
  if(!token) return token;
  const decode = await jwt.verify(token, config.SECRET);
  return this.findOne({ _id: decode, token: token });
};

//delete token
userSchema.methods.deleteToken = async function () {
  return this.update({ $unset: { token: 1 } });
};

module.exports = mongoose.model('Users', userSchema);
