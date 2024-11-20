const express = require("express");
const router = express.Router();
const orderController = require("./../../controllers/orderController");

// Order routes
router.post("/", orderController.createOrder); // Create order from cart
router.get("/:userId", orderController.getOrders); // Get user's orders
router.get("/order/:orderId", orderController.getOrderDetails);
router.put("/order/:orderId", orderController.updateOrder);
router.get("/order/user/:userId", orderController.getOrdersUserId);
// Get all orders (Admin)
router.get("/", orderController.getAllOrders);

module.exports = router;
