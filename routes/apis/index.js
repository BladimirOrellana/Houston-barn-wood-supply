const router = require("express").Router();
const users = require("./userRoutes");
const products = require("./productRoutes");
const carts = require("./cartRoutes");
const orders = require("./orderRoutes");
const uploadRoutes = require("./upload");

// Add other API routes here
router.use("/upload", uploadRoutes);
router.use("/users", users);
router.use("/products", products);
router.use("/carts", carts);
router.use("/orders", orders);

module.exports = router;
