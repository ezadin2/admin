const mongoose = require('mongoose');

// --- Cart Item Subschema ---
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: { type: String, default: '' },
  price: { type: Number, default: 0 },
  image: { type: String },
  quantity: { type: Number, default: 1 },
  variationId: { type: String, default: '' },
  brandName: { type: String, default: '' },
  selectedVariation: { type: Map, of: String, default: {} }
}, { _id: false });

// --- Address Subschema ---
const addressSchema = new mongoose.Schema({
  Id: { type: String },
  Name: { type: String },
  PhoneNumber: { type: String },
  Street: { type: String },
  City: { type: String },
  State: { type: String },
  PostalCode: { type: String },
  Country: { type: String },
  SelectedAddress: { type: Boolean, default: true }
}, { _id: false });

// --- Main Order Schema ---
const orderSchema = new mongoose.Schema({
  id: { type: String }, // optional external id (if used in frontend)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  },
  totalAmount: { type: Number, required: true },
  shippingCost: { type: Number, default: 5.0 },
  taxCost: { type: Number, default: 15.0 },
  orderDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, default: 'CBE Birr' },
  billingAddress: addressSchema,
  shippingAddress: addressSchema,
  deliveryDate: { type: Date },
  billingAddressSameAsShipping: { type: Boolean, default: true },
  items: [cartItemSchema],
  address: addressSchema
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
