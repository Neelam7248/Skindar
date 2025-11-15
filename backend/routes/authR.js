const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    try {
        const { name, email, userType, password, phone, address } = req.body;

        // Validate required fields
        if (!name  || !email || !password || !phone || !address || !userType) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address
,userType            

        });

        await newUser.save();

        // Generate JWT (include userType from form)
        const token = jwt.sign(
            { userId: newUser._id, userType: userType },
            JWT_SECRET,
            { expiresIn: '30m' }
        );

        // Send response (without password)
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address,
                userType:newUser.userType
            },
            token
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Wrong email id" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );

    const user = {
      userId: existingUser._id,
      email: existingUser.email,
      userType: existingUser.userType,
    };

    res.status(200).json({ message: "Signin successful", token, user });
  } catch (err) {
    console.error("Signin failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;
