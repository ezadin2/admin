const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    folder: { type: String, required: true },
    fileName: { type: String, required: true },
    sizeBytes: { type: Number },
    fullPath: { type: String },
    contentType: { type: String },
    mediaCategory: { type: String, default: '' }
}, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
