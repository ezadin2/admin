const mongoose = require('mongoose');

const productAttributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  values: {
    type: [String],
    default: []
  }
}, { _id: false }); // Embed in Product, no separate _id

module.exports = productAttributeSchema;
