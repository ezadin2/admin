const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    taxRate: { type: Number, default: 0.0 },
    shippingCost: { type: Number, default: 0.0 },
    freeShippingThreshold: { type: Number, default: 0.0 },
    appName: { type: String, default: '' },
    appLogo: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);
