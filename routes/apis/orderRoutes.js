const express = require("express");
const router = express.Router();
const orderController = require("./../../controllers/orderController");

// Order routes
router.post("/", orderController.createOrder); // Create order from cart
router.get("/:userId", orderController.getOrders); // Get user's orders

module.exports = router;
