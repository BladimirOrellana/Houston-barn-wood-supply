const Product = require("./../models/products");
const fs = require("fs");

// Create a new product
const path = require("path");

exports.createProduct = async (req, res) => {
  console.log("b ", req);
  try {
    const { name, description, price, stock, category, thumbnail } = req.body;

    // Construct the image URL using the uploaded file's path
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}` // Use the multer-provided filename
      : null;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      thumbnail: imageUrl,
      image: imageUrl, // Save the image URL
    });
    console.log(" image url ", imageUrl);
    product
      .save()
      .then((result) => {
        console.log("result ", result);
        res
          .status(201)
          .json({ message: "Product created successfully", product });
      })
      .catch((err) => {
        console.log("error ", err);
      });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product", error });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithImageURL = products.map((product) => ({
      ...product.toObject(),
      imageUrl: product.image
        ? `${req.protocol}://${req.get("host")}${product.image}`
        : null,
    }));
    res.status(200).json(productsWithImageURL);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add imageUrl dynamically
    const productWithImageURL = {
      ...product.toObject(),
      imageUrl: product.image
        ? `${req.protocol}://${req.get("host")}${product.image}`
        : null,
    };

    res.status(200).json(productWithImageURL);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product", error });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, stock, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, stock, category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

// Upload Product Image

exports.uploadProductImage = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.image.data = fs.readFileSync(req.file.path); // Read file as binary
    product.image.contentType = req.file.mimetype; // Save MIME type
    await product.save();

    res.status(200).json({
      message: "Product image uploaded successfully",
      productId: product._id,
    });
  } catch (error) {
    console.error("Error uploading product image:", error);
    res.status(500).json({ message: "Failed to upload product image" });
  }
};
exports.getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.image.data) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", product.image.contentType);
    res.send(product.image.data);
  } catch (error) {
    console.error("Error fetching product image:", error);
    res.status(500).json({ message: "Failed to fetch product image" });
  }
};
