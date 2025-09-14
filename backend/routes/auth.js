const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.put("/me/password", protect, changePassword);

module.exports = router;