const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const auth = require('../middleware/auth');
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
            { userId: newUser._id, userType: userType ,email: newUser.email},
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Send response (without password)
        res.status(201).json({
            message: "User created successfully",
            user: {
              userId: newUser._id,
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
      { userId: existingUser._id, email: existingUser.email ,userType: existingUser.userType},
      JWT_SECRET,
      { expiresIn: '2h' }
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

// for fetching profile 
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware se aya hua user id

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.get('/users', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
  return res.status(403).json({ message: "Access denied" });
}
    const users = await User.find({userType :"customer"  }).select("-password"); // sab users

    res.status(200).json({ users }); // object me wrap kiya
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.get("/users/search", auth,async (req, res) => {
  try {
    const query = req.query.query; // <-- this reads ?query=abc

    const customers = await User.find({
      userType:'customer',

      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({message:"search success",customers});
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
});
// PUT /api/admin/users/:id/soft-delete
router.put("/users/:id/soft-delete", auth, async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Customer soft-deleted successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.put("/users/:id/restore", auth, async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User restored successfully", user });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.put("/UPprofile", auth, async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { name, phone, address } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
