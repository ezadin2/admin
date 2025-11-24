const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/product');

// Get all products
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find()
        .populate('brand')
        .populate('categoryIds')
        .sort({ createdAt: -1 });
    res.json({ success: true, message: 'Products retrieved successfully', data: products });
}));

// Get a product by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate('brand')
        .populate('categoryIds');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product retrieved successfully', data: product });
}));

// Create a new product
router.post('/', asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, message: 'Product created successfully', data: product });
}));

// Update a product
router.put('/:id', asyncHandler(async (req, res) => {
  try {
    console.log('Incoming update body:', req.body);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ success: false, message: 'Product not found' });

    res.json({ success: true, message: 'Product updated successfully', data: updatedProduct });
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}));


// Delete a product
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted successfully', data: deletedProduct });
}));

module.exports = router;
