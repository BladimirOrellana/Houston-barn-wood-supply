const express = require("express");
const router = express.Router();
const multer = require("multer");

const productController = require("./../../controllers/productController");
// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Specify upload folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
// CRUD Routes
router.post("/", upload.single("image"), productController.createProduct); // Create a product
router.get("/", productController.getProducts); // Get all products
router.get("/:id", productController.getProductById); // Get product by ID
router.put("/:id", productController.updateProduct); // Update product by ID
router.delete("/:id", productController.deleteProduct); // Delete product by ID
// Route to fetch the product image
router.get("/:id/image", productController.getProductImage);
module.exports = router;
