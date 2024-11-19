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
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Your routes here
app.use(routes);
// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
