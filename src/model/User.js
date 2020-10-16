const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const SALT = 10;

const userSchema = require("../schema/UserSchema");

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
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// generate token
userSchema.methods.generateToken = async function() {
  this.token = jwt.sign(this.id, config.SECRET);
  return this.save();
};

// find by token
userSchema.statics.findByToken = async function (token) {
  if(!token) return token;
  const decode = await jwt.verify(token, config.SECRET);
  return this.findOne({ id: decode, token: token });
};

//delete token
userSchema.methods.deleteToken = async function () {
  return this.updateOne({ $unset: { token: 1 } });
};

module.exports = mongoose.model('Users', userSchema);
