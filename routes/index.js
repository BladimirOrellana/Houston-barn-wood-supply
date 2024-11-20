const express = require("express"); // Import express
const path = require("path");
const router = express.Router(); // Use express.Router() correctly
const apiRoutes = require("./apis/index");

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.resolve(__dirname, "../client/dist")));
}

// API Routes
router.use("/api", apiRoutes);

// Fallback to React App for other routes
if (process.env.NODE_ENV === "production") {
  router.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

module.exports = router;
