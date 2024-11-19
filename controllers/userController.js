const User = require("../models/users"); // Adjust the path to your User model
const bcrypt = require("bcrypt");

// Create a new user
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log("controller user ", req.body);
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field from response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, "-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user", error });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user", error });
  }
};
exports.loginByEmail = async (req, res) => {
  console.log("login  ", req.body);
  User.findOne({ email: req.body.email })

    .then((dbModel) => {
      if (dbModel === null) {
        return res.json(false);
      } else {
        bcrypt
          .compare(req.body.password, dbModel.password)
          .then((result) => {
            if (result) {
              return res.json(dbModel);
            } else {
              return res.json({ message: "password dont match" });
            }
          })
          .catch((err) => {
            console.log("err ", err);
          });
      }
    })

    .catch((err) => res.status(422).json(err));
};
exports.findByEmail = async (req, res) => {
  console.log("controller find by email", req.body);
  User.findOne({ email: req.body.email })

    .then((dbModel) => {
      if (dbModel) {
        return res.json(dbModel);
      } else {
        return res.json({ message: "User Does Not Exist" });
      }
    })

    .catch((err) => res.status(422).json(err));
};
