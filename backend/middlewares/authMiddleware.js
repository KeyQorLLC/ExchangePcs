const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const adminAuth = asyncHandler(async (req, res, next) => {
  const decoded = jwt.verify(req.headers.keyqorkey, process.env.JWT_SECRET);
  console.log(decoded);
  if (decoded.role == "Admin") {
    next();
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
});

module.exports = { adminAuth };
