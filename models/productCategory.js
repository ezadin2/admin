const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
module.exports = ProductCategory;
