const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const asyncHandler = require('express-async-handler');

// GET /settings
router.get('/', asyncHandler(async (req, res) => {
    let settings = await Settings.findOne();
    if (!settings) {
        settings = new Settings();
        await settings.save();
    }
    res.json({ success: true, message: 'Settings retrieved successfully', data: settings });
}));


// Create settings
router.post('/', asyncHandler(async (req, res) => {
    const { taxRate, shippingCost, freeShippingThreshold, appName, appLogo } = req.body;
    const settings = new Settings({ taxRate, shippingCost, freeShippingThreshold, appName, appLogo });
    await settings.save();
    res.json({ success: true, message: 'Settings created successfully', data: settings });
}));

// Update settings by ID
router.put('/:id', asyncHandler(async (req, res) => {
    const { taxRate, shippingCost, freeShippingThreshold, appName, appLogo } = req.body;
    const updatedSettings = await Settings.findByIdAndUpdate(
        req.params.id,
        { taxRate, shippingCost, freeShippingThreshold, appName, appLogo, updatedAt: new Date() },
        { new: true }
    );
    if (!updatedSettings) return res.status(404).json({ success: false, message: 'Settings not found' });
    res.json({ success: true, message: 'Settings updated successfully', data: updatedSettings });
}));

// Delete settings by ID
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedSettings = await Settings.findByIdAndDelete(req.params.id);
    if (!deletedSettings) return res.status(404).json({ success: false, message: 'Settings not found' });
    res.json({ success: true, message: 'Settings deleted successfully', data: deletedSettings });
}));

module.exports = router;
