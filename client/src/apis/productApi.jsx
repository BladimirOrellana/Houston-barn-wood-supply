import axios from "axios";

const productApi = {
  // Get all products
  getAll: function () {
    console.log("Fetching all products");
    return axios.get("/api/products");
  },

  // Get a product by ID
  getById: function (id) {
    console.log("Fetching product with ID:", id);
    return axios.get(`/api/products/${id}`);
  },

  // Create a new product
  create: function (data) {
    console.log("Creating product with data:", data);
    return axios.post("/api/products", data);
  },

  // Update a product by ID
  update: function (id, data) {
    console.log("Updating product with ID:", id, "and data:", data);
    return axios.put(`/api/products/${id}`, data);
  },

  // Delete a product by ID
  delete: function (id) {
    console.log("Deleting product with ID:", id);
    return axios.delete(`/api/products/${id}`);
  },
};

export default productApi;
