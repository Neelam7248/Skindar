const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

// POST /api/create-admin
router.post("/", auth, async (req, res) => {
  try {
    const { name, email, password, phone ,userType} = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password || !phone||!userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // 3️⃣ Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4️⃣ Create new admin
    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      userType: "admin",
     
    });

    res.status(201).json({ message: "New admin created successfully", userType: newAdmin });

  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;
