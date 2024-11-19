import axios from "axios";

const orderApi = {
  // Create an order from cart
  createOrder: function (data) {
    return axios.post("/api/orders", data);
  },

  // Get all orders for a user
  getOrders: function (userId) {
    return axios.get(`/api/orders/${userId}`);
  },
};

export default orderApi;
