const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const ProductAttribute = require('../models/productAttribute');

// Get all product attributes
router.get('/', asyncHandler(async (req, res) => {
    const attributes = await ProductAttribute.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'Product attributes retrieved successfully', data: attributes });
}));

// Get a product attribute by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const attribute = await ProductAttribute.findById(req.params.id);
    if (!attribute) return res.status(404).json({ success: false, message: 'Product attribute not found' });
    res.json({ success: true, message: 'Product attribute retrieved successfully', data: attribute });
}));

// Create a new product attribute
router.post('/', asyncHandler(async (req, res) => {
    const { name, values } = req.body;
    if (!name || !values) {
        return res.status(400).json({ success: false, message: 'Name and values are required' });
    }

    const attribute = new ProductAttribute({ name, values });
    await attribute.save();
    res.json({ success: true, message: 'Product attribute created successfully', data: attribute });
}));

// Update a product attribute
router.put('/:id', asyncHandler(async (req, res) => {
    const { name, values } = req.body;
    const updatedAttribute = await ProductAttribute.findByIdAndUpdate(
        req.params.id,
        { name, values },
        { new: true }
    );
    if (!updatedAttribute) return res.status(404).json({ success: false, message: 'Product attribute not found' });
    res.json({ success: true, message: 'Product attribute updated successfully', data: updatedAttribute });
}));

// Delete a product attribute
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedAttribute = await ProductAttribute.findByIdAndDelete(req.params.id);
    if (!deletedAttribute) return res.status(404).json({ success: false, message: 'Product attribute not found' });
    res.json({ success: true, message: 'Product attribute deleted successfully', data: deletedAttribute });
}));

module.exports = router;
