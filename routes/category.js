const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

// ----- GET ALL CATEGORIES -----
router.get('/', asyncHandler(async (req, res) => {
    const categories = await Category.find().populate('parentId').sort({ createdAt: -1 });
    res.json({ success: true, message: 'Categories retrieved successfully', data: categories });
}));

// ----- GET CATEGORY BY ID -----
router.get('/:id', asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id).populate('parentId');
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category retrieved successfully', data: category });
}));

// ----- CREATE NEW CATEGORY -----
router.post('/', asyncHandler(async (req, res) => {
    const { name, image, parentId, isFeatured } = req.body;
    if (!name || !image) return res.status(400).json({ success: false, message: 'Name and image are required' });

    const category = new Category({
        name,
        image,
        parentId: parentId || null,
        isFeatured: isFeatured || false
    });

    await category.save();
    res.json({ success: true, message: 'Category created successfully', data: category });
}));

// ----- UPDATE CATEGORY -----
router.put('/:id', asyncHandler(async (req, res) => {
    const { name, image, parentId, isFeatured } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name, image, parentId: parentId || null, isFeatured },
        { new: true }
    );

    if (!updatedCategory) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category updated successfully', data: updatedCategory });
}));

// ----- DELETE CATEGORY -----
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category deleted successfully', data: deletedCategory });
}));

module.exports = router;
