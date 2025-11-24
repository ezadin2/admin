const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
    targetScreen: {
        type: String,
        required: [true, 'Target screen is required'],
        trim: true
    }
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
