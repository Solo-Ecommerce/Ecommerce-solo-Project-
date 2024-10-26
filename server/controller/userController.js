const { User } = require("../indexdatabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

// Get all users
const getAllusers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: err.message });
  }
};

// Get one user by ID
const getOneUser = async (req, res) => {
  try {
    const oneUser = await User.findByPk(req.params.id);
    if (!oneUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(oneUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve user", error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("User ID:", userId);
    const deleted = await User.destroy({ where: { userId: userId } });

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Deleted user with ID: " + userId });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting user",
      error: error.message,
    });
  }
};

// Sign up a new user
const singnIn = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      birthDate,
      adress,
      phoneNumber,
      password,
      role,
    } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the password meets the criteria
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^_\s]{6,}$/.test(
      password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Password doesn't meet the criteria" });
    }

    // Check if the email is already used
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already used" });
    }

    // Create the new user
    const user = await User.create({
      name,
      lastName,
      email,
      birthDate,
      adress,
      phoneNumber,
      role,
      password: await bcrypt.hash(password, 10),
    });

    // Generate JWT this the parameter that we can include when we generate the token for the user
    const token = jwt.sign(
      {
        id: user.userId, // Use user.userId instead of newUser.userId
        name: user.name,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        adress: user.adress,
        birthDate: user.birthDate,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({ token, message: "Sign In successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.userId,
        name: user.name,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        adress: user.adress,
        birthDate: user.birthDate,
        role: user.role,
      },
      secret,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// Add a new user
const addUser = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      birthDate,
      adress,
      phoneNumber,
      password,
      role,
    } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^_\s]{6,}$/.test(
      password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Password doesn't meet the criteria" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      lastName,
      email,
      birthDate,
      adress,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      {
        id: user.userId,
        name: user.name,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        adress: user.adress,
        birthDate: user.birthDate,
        role: user.role,
      },
      secret,
      { expiresIn: "1h" }
    );

    return res
      .status(201)
      .json({ message: "User added successfully", user, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllusers,
  getOneUser,
  deleteUser,
  singnIn,
  loginUser,
  addUser,
};
