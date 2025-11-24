const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Brand image is required'],
        trim: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    productsCount: {
        type: Number,
        default: 0
    },
    // Only store category IDs
    brandCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { timestamps: true });

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
