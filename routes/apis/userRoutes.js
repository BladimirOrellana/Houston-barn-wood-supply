const express = require("express");
const router = express.Router();
const userController = require("./../../controllers/userController"); // Adjust the path

// CRUD Routes
router.post("/", userController.createUser); // Create a user
router.get("/", userController.getUsers); // Get all users
router.get("/:id", userController.getUserById); // Get user by ID
router.put("/:id", userController.updateUser); // Update user by ID
router.delete("/:id", userController.deleteUser); // Delete user by ID
router.post("/login", userController.loginByEmail);
router.post("/email", userController.findByEmail);

module.exports = router;
