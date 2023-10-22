const express = require("express");
const router = express.Router();

const {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
router.route("/").get(getUsers).post(registerUser).put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/login").post(loginUser);

module.exports = router;
