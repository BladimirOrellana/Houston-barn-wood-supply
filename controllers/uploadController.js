const path = require("path");

// Upload file logic
exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = `/uploads/${req.file.filename}`; // Path to uploaded file

  res.status(200).json({
    message: "File uploaded successfully",
    filePath,
  });
};

// Serve uploaded files
exports.serveFile = (req, res) => {
  const filePath = path.join(__dirname, "../../uploads", req.params.filename);
  res.sendFile(filePath);
};
