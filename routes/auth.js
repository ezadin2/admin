const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Login
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ Email: email });
    if (!user)
        return res.status(401).json({ success: false, message: "Invalid email" });

    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword)
        return res.status(401).json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
        { id: user._id.toString(), role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        success: true,
        message: "Login successful",
        token,
        data: {
            id: user._id,
            email: user.Email,
            role: user.Role
        }
    });
}));

// Logout (token removed client side)
router.post('/logout', asyncHandler(async (req, res) => {
    res.json({ success: true, message: "Logged out successfully" });
}));

module.exports = router;
