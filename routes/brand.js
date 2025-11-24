const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');

// GET all brands
router.get('/', asyncHandler(async (req, res) => {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'Brands retrieved successfully', data: brands });
}));

// GET brand by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, message: 'Brand retrieved successfully', data: brand });
}));

// CREATE brand
router.post('/', asyncHandler(async (req, res) => {
    const { name, image, isFeatured, brandCategories } = req.body;
    if (!name || !image) {
        return res.status(400).json({ success: false, message: 'Name and image are required' });
    }

    const brand = new Brand({
        name,
        image,
        isFeatured: isFeatured || false,
        brandCategories: brandCategories || []
    });

    await brand.save();
    res.json({ success: true, message: 'Brand created successfully', data: brand });
}));

// UPDATE brand
router.put('/:id', asyncHandler(async (req, res) => {
    const { name, image, isFeatured, brandCategories } = req.body;
    const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        { name, image, isFeatured, brandCategories },
        { new: true }
    );

    if (!updatedBrand) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, message: 'Brand updated successfully', data: updatedBrand });
}));

// DELETE brand
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, message: 'Brand deleted successfully', data: deletedBrand });
}));

module.exports = router;
