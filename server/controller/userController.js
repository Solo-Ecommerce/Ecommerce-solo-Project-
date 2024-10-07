const { User } = require("../indexdatabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

// Get all users
const getAllusers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
};

// Get one user by ID
const getOneUser = async (req, res) => {
  try {
    const oneUser = await User.findByPk(req.params.id);
    res.status(200).send(oneUser);
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    await User.destroy({
      where: {
        id: userId,
      },
    });
    res.status(200).send("Deleted user with ID:" + userId);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting user item" });
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
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    // Check if the password meets the criteria
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^_\s]{6,}$/.test(
      password
    );

    // Check if the email is already used
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(200).send({ message: "Email is already used" });
    }

    // Validate the password criteria
    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ message: "Password doesn't meet the criteria" });
    }

    // Create the new user
    const newUser = await User.create({
      name,
      lastName,
      email,
      birthDate,
      adress,
      phoneNumber,
      role,
      password: await bcrypt.hash(password, 10),
    });

    // Generate JWT
    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        birthDate: newUser.birthDate,
        adress: newUser.adress,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
      secret
    );
    return res.status(201).send({ token, message: "Sign In successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error", error });
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).send({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        birthDate: user.birthDate,
        adress: user.adress,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      secret
    );
    return res.send({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error", error });
  }
};

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
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^_\s]{6,}$/.test(
      password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ message: "Password doesn't meet the criteria" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(200).send({ message: "Email is already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lastName,
      email,
      birthDate,
      adress,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .send({ message: "User added successfully", newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error", error });
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
