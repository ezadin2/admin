const mongoose = require('mongoose');

const brandCategorySchema = new mongoose.Schema({
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });

const BrandCategory = mongoose.model('BrandCategory', brandCategorySchema);
module.exports = BrandCategory;
