const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

// Get profile
router.get('/', asyncHandler(async (req, res) => {
    // TODO: Fetch user profile from DB
    res.json({ success: true, message: 'Profile fetched', data: {} });
}));

// Update profile
router.put('/', asyncHandler(async (req, res) => {
    const profile = req.body;
    // TODO: Save profile to DB
    res.json({ success: true, message: 'Profile updated', data: profile });
}));

module.exports = router;
