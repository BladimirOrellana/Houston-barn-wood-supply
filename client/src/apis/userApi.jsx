import axios from "axios";

const userApi = {
  // Create a new user
  create: function (data) {
    console.log("Creating user with data:", data);
    return axios.post("/api/users", data);
  },

  // Find user by UID
  findByUid: function (uid) {
    console.log("Fetching user with UID:", uid);
    return axios.get(`/api/users/${uid}`);
  },

  // Get all users
  getAll: function () {
    console.log("Fetching all users");
    return axios.get("/api/users");
  },

  // Update a user by ID
  update: function (id, data) {
    console.log("Updating user with ID:", id, "and data:", data);
    return axios.put(`/api/users/${id}`, data);
  },

  // Delete a user by ID
  delete: function (id) {
    console.log("Deleting user with ID:", id);
    return axios.delete(`/api/users/${id}`);
  },
  loginByemail: function (data) {
    console.log("Login by email:", data);
    return axios.post(`/api/users/login`, data);
  },
  findByEmail: function (email) {
    console.log("find by email:", email);
    const data = {
      email,
    };
    return axios.post(`/api/users/email/`, data);
  },
};

export default userApi;
