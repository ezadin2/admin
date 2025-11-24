const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const ProductCategory = require('../models/productCategory');

// Get all product categories
router.get('/', asyncHandler(async (req, res) => {
    const categories = await ProductCategory.find()
        .populate('productId')
        .populate('categoryId')
        .sort({ createdAt: -1 });
    res.json({ success: true, message: 'Product categories retrieved successfully', data: categories });
}));

// Create a new product category
router.post('/', asyncHandler(async (req, res) => {
    const newCategory = new ProductCategory(req.body);
    await newCategory.save();
    res.json({ success: true, message: 'Product category created successfully', data: newCategory });
}));

// Delete a product category
router.delete('/:id', asyncHandler(async (req, res) => {
    const deleted = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Product category not found' });
    res.json({ success: true, message: 'Product category deleted successfully', data: deleted });
}));

module.exports = router;
