const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/", controller.fileController.fileUpload);
router.get("/", controller.fileController.fileSearch);
router.get("/:fileId", controller.fileController.fileView);
router.delete("/:fileId", controller.fileController.fileDelete);

module.exports = router;
