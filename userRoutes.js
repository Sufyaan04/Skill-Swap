const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  getUserProfile,
  updateUserProfile,
  searchUserBySkill,
} = require("../controllers/userController");
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/search", protect, searchUserBySkill);

module.exports = router;