const express = require("express");
const router = express.Router();
const upload = require("./multerConfig");
const { uploadFile, serveFile } = require("../../controllers/uploadController");

// Route for file uploads
router.post("/", upload.single("image"), uploadFile);

// Route to serve uploaded files
router.get("/:filename", serveFile);

module.exports = router;
