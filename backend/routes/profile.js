const express = require("express");
const router = express.Router();
const User = require("../models/User"); // use your existing User model
const authMiddleware = require("../middleware/authMiddleware"); // your JWT auth

// GET logged-in user profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // exclude password
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update profile
router.put("/", authMiddleware, async (req, res) => {
  const { name, phone, address, profilePic } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, address, profilePic },
      { new: true }
    ).select("-password"); // return updated user without password

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
