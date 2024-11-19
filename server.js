const express = require("express");
const connectDB = require("./db/db");

const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Your routes here
app.use(routes);
// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Catch-all handler for any request that doesn't match
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
