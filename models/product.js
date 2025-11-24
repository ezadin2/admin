const mongoose = require('mongoose');
const productAttributeSchema = require('./productAttribute');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sku: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  price: { type: Number, required: true },
  salePrice: { type: Number, default: 0 },
  thumbnail: { type: String },
  images: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
  productType: { type: String, required: true },
  description: { type: String },
  soldQuantity: { type: Number, default: 0 },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  productAttributes: [productAttributeSchema],
  productVariations: [{ type: mongoose.Schema.Types.Mixed }], // Use Mixed for variations, or create a separate schema
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
