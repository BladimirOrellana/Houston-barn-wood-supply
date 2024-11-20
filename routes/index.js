const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./apis/index");
// API ROUTES

router.use("/api", apiRoutes);
// If no api routes are hit, send the react app
if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.resolve(__dirname, "../client/dist")));
  router.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

module.exports = router;
