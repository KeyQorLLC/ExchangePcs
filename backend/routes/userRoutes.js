const express = require("express");
const router = express.Router();

const {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  registerAdmin,
} = require("../controllers/userController");
const { adminAuth } = require("../middlewares/authMiddleware");

router.route("/").get(getUsers).post(registerUser).put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/login").post(loginUser);
//router.route("/admin").post(registerAdmin);

module.exports = router;
