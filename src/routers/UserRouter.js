const express = require("express");
const router = express.Router();
const controller = require("../controllers")

router.post("/login", controller.userController.login)
router.post("/register", controller.userController.register)
router.post("/logout", controller.userController.logout)

module.exports = router;