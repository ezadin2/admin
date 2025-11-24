const express = require('express');
const router = express.Router();
const BrandCategory = require('../models/brandCategory');
const asyncHandler = require('express-async-handler');

// GET all brand-category relationships
router.get('/', asyncHandler(async (req, res) => {
    const relations = await BrandCategory.find()
        .populate('brandId')
        .populate('categoryId')
        .sort({ createdAt: -1 });
    res.json({ success: true, message: 'Brand-Categories retrieved successfully', data: relations });
}));

// GET a single relation by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const relation = await BrandCategory.findById(req.params.id)
        .populate('brandId')
        .populate('categoryId');
    if (!relation) return res.status(404).json({ success: false, message: 'Relation not found' });
    res.json({ success: true, message: 'Relation retrieved successfully', data: relation });
}));

// CREATE a new relation
router.post('/', asyncHandler(async (req, res) => {
    const { brandId, categoryId } = req.body;
    if (!brandId || !categoryId) {
        return res.status(400).json({ success: false, message: 'Brand ID and Category ID are required' });
    }

    const relation = new BrandCategory({ brandId, categoryId });
    await relation.save();
    res.json({ success: true, message: 'Brand-Category relation created successfully', data: relation });
}));

// UPDATE a relation
router.put('/:id', asyncHandler(async (req, res) => {
    const { brandId, categoryId } = req.body;
    const updatedRelation = await BrandCategory.findByIdAndUpdate(
        req.params.id,
        { brandId, categoryId },
        { new: true }
    );

    if (!updatedRelation) return res.status(404).json({ success: false, message: 'Relation not found' });
    res.json({ success: true, message: 'Relation updated successfully', data: updatedRelation });
}));
// routes/brandCategories.js
router.get('/brand/:brandId', asyncHandler(async (req, res) => {
    const brandCategories = await BrandCategory.find({ brandId: req.params.brandId })
        .populate('categoryId')
        .sort({ createdAt: -1 });
    res.json({ success: true, message: 'Brand categories retrieved successfully', data: brandCategories });
}));

// DELETE a relation
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedRelation = await BrandCategory.findByIdAndDelete(req.params.id);
    if (!deletedRelation) return res.status(404).json({ success: false, message: 'Relation not found' });
    res.json({ success: true, message: 'Relation deleted successfully', data: deletedRelation });
}));

module.exports = router;
