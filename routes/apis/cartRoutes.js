const express = require("express");
const router = express.Router();
const cartController = require("./../../controllers/cartController");

// Cart routes
router.post("/add", cartController.addItemToCart); // Add item to cart
router.get("/:userId", cartController.getCart); // Get user's cart
router.delete("/remove", cartController.removeItemFromCart); // Remove item from cart

module.exports = router;