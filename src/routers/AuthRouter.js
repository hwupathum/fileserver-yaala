const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/login", controller.authController.login);
router.post("/register", controller.authController.register);

module.exports = router;
