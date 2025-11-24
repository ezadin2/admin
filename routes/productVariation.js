const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const ProductVariation = require('../models/productVariation');

// Get all variations
router.get('/', asyncHandler(async (req, res) => {
    const variations = await ProductVariation.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'Product variations retrieved successfully', data: variations });
}));

// Get variation by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const variation = await ProductVariation.findById(req.params.id);
    if (!variation) return res.status(404).json({ success: false, message: 'Variation not found' });
    res.json({ success: true, message: 'Variation retrieved successfully', data: variation });
}));

// Create new variation
router.post('/', asyncHandler(async (req, res) => {
    const { sku, image, description, price, salePrice, stock, soldQuantity, attributeValues, productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: 'Product ID is required' });

    const variation = new ProductVariation({
        sku, image, description, price, salePrice, stock, soldQuantity, attributeValues, productId
    });

    await variation.save();
    res.json({ success: true, message: 'Product variation created successfully', data: variation });
}));

// Update variation
router.put('/:id', asyncHandler(async (req, res) => {
    const updatedVariation = await ProductVariation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVariation) return res.status(404).json({ success: false, message: 'Variation not found' });
    res.json({ success: true, message: 'Product variation updated successfully', data: updatedVariation });
}));

// Delete variation
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedVariation = await ProductVariation.findByIdAndDelete(req.params.id);
    if (!deletedVariation) return res.status(404).json({ success: false, message: 'Variation not found' });
    res.json({ success: true, message: 'Product variation deleted successfully', data: deletedVariation });
}));

module.exports = router;
