const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

// Dashboard data
router.get('/', asyncHandler(async (req, res) => {
    // TODO: Return dashboard stats like orders count, sales, users, etc.
    res.json({ success: true, message: 'Dashboard data fetched', data: {} });
}));

module.exports = router;
