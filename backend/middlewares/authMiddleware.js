const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const adminAuth = asyncHandler(async (req, res, next) => {
  let token;

  console.log(req.headers.cookie);
  next();
});

module.exports = { adminAuth };
