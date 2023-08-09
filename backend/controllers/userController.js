const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @desc   Get all users
 * @route  Get /api/user
 * @access PROTECTED - admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find().select({ password: 0, __v: 0 });
  res.status(200).json(user);
});

/**
 * @desc   Register user
 * @route  POST /api/user
 * @access PUBLIC
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User exists, Please login");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: "Basic",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

/**
 * @desc   Register admin
 * @route  POST /api/user/admin
 * @access PROTECTED - SUPERUSER
 */
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User exists, Please login");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: "Admin",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

/**
 * @desc   Login user
 * @route  POST /api/user/login
 * @access PUBLIC
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error(`Invalid credentials`);
  }
});

/**
 * @desc   Update user
 * @route  PUT /api/user
 * @access PROTECTED - admin or same user
 */
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please add all fields" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedInfo = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  const updatedUser = await User.findOneAndUpdate({ email }, updatedInfo, {
    new: true,
  });

  if (!updatedUser) {
    res.status(400);
    throw new Error(`User not found`);
  }

  res.status(201).json({
    _id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

/**
 * @desc   Delete user
 * @route  DELETE /api/user/:id
 * @access PROTECTED - ADMIN
 */
const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    res.status(400);
    throw new Error(`User not found`);
  }
  res.status(200).json(deletedUser);
});

/**
 * Generate JWT
 * @desc    Generate a json web token
 * @param   {string} id   The mongodb id of user
 * @param   {string} role The role of user
 * @returns The signed token
 */
const generateToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  registerAdmin,
};
