const express = require("express");

const router = express.Router();

exports.authController = require("./AuthController")
exports.userController = require("./UserController")