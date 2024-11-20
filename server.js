const express = require("express");
const path = require("path");
const connectDB = require("./db/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// API Routes
app.use(routes);
// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
