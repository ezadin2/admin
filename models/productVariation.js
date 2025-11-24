const mongoose = require('mongoose');

const productVariationSchema = new mongoose.Schema({
    sku: { type: String, default: '' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    salePrice: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    soldQuantity: { type: Number, default: 0 },
    attributeValues: { type: Map, of: String, default: {} }, // key-value for variation attributes
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { timestamps: true });

const ProductVariation = mongoose.model('ProductVariation', productVariationSchema);
module.exports = ProductVariation;
