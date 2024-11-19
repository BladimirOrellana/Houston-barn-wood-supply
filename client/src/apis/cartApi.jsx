import axios from "axios";

const cartApi = {
  // Add item to cart
  addItem: function (data) {
    return axios.post("/api/carts/add", data);
  },

  // Get user's cart
  getCart: function (userId) {
    return axios.get(`/api/carts/${userId}`);
  },

  // Remove item from cart
  removeItem: function (data) {
    return axios.delete("/api/carts/remove", { data });
  },
};

export default cartApi;
