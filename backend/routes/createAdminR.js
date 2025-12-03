const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
router.post("/", auth, async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check duplicate
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await User.create({
      name,
      email,
      password,
      phone,
      userType: "admin",
      role: "admin"
    });

    res.status(201).json({ message: "New admin created", admin: newAdmin });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;
