const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is required']
    },
    title: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0.0
    },
    image: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    variationId: {
        type: String,
        default: ''
    },
    brandName: {
        type: String
    },
    selectedVariation: {
        type: Map,
        of: String,
        default: {}
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // To associate cart items with a user
        required: [true, 'User ID is required']
    }
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
