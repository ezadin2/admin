const express = require('express');
const router = express.Router();
const Banner = require('../models/banner');
const asyncHandler = require('express-async-handler');

// Get all banners
router.get('/', asyncHandler(async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        res.json({ success: true, message: 'Banners retrieved successfully', data: banners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Get a banner by ID
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).json({ success: false, message: 'Banner not found' });
        res.json({ success: true, message: 'Banner retrieved successfully', data: banner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Create a new banner
router.post('/', asyncHandler(async (req, res) => {
    const { imageUrl, active, targetScreen } = req.body;
    if (!imageUrl || !targetScreen) {
        return res.status(400).json({ success: false, message: 'Image URL and target screen are required' });
    }

    const banner = new Banner({ imageUrl, active, targetScreen });
    await banner.save();
    res.json({ success: true, message: 'Banner created successfully', data: banner });
}));

// Update a banner
router.put('/:id', asyncHandler(async (req, res) => {
    const { imageUrl, active, targetScreen } = req.body;
    const updatedBanner = await Banner.findByIdAndUpdate(
        req.params.id,
        { imageUrl, active, targetScreen },
        { new: true }
    );
    if (!updatedBanner) return res.status(404).json({ success: false, message: 'Banner not found' });
    res.json({ success: true, message: 'Banner updated successfully', data: updatedBanner });
}));

// Delete a banner
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
    if (!deletedBanner) return res.status(404).json({ success: false, message: 'Banner not found' });
    res.json({ success: true, message: 'Banner deleted successfully', data: deletedBanner });
}));

module.exports = router;
