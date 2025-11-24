const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  Id: { type: String },
  Name: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  Street: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  PostalCode: { type: String, required: true },
  Country: { type: String, required: true },
  SelectedAddress: { type: Boolean, default: true },
  DateTime: { type: Date, default: Date.now }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
