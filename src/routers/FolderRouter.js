const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/", controller.folderController.folderCreate);
router.get("/", controller.folderController.folderView);
router.delete("/", controller.folderController.folderDelete);

module.exports = router;
