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

// Serve static files from the Vite `dist` folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  // Catch-all handler for React Router
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}
// API Routes
app.use(routes);
// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
