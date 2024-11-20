const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, require: true },

    image: {
      type: String,
      require: true,
    },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
