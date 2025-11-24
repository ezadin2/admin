const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Address = require('../models/address');

// Get all addresses
router.get('/', asyncHandler(async (req, res) => {
    const addresses = await Address.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'Addresses retrieved successfully', data: addresses });
}));

// Get address by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    res.json({ success: true, message: 'Address retrieved successfully', data: address });
}));

// Create a new address
router.post('/', asyncHandler(async (req, res) => {
    const { name, phoneNumber, street, city, state, postcode, country, latitude, longitude, selectedAddress } = req.body;

    if (!name || !phoneNumber || !street || !city || !state || !postcode || !country) {
        return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const address = new Address({ name, phoneNumber, street, city, state, postcode, country, latitude, longitude, selectedAddress });
    await address.save();
    res.json({ success: true, message: 'Address created successfully', data: address });
}));

// Update an address
router.put('/:id', asyncHandler(async (req, res) => {
    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAddress) return res.status(404).json({ success: false, message: 'Address not found' });
    res.json({ success: true, message: 'Address updated successfully', data: updatedAddress });
}));

// Delete an address
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress) return res.status(404).json({ success: false, message: 'Address not found' });
    res.json({ success: true, message: 'Address deleted successfully', data: deletedAddress });
}));

module.exports = router;
