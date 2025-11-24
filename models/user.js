const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  FirstName: { type: String, default: '' },
  LastName: { type: String, default: '' },
  UserName: { type: String, default: '' },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  PhoneNumber: { type: String, default: '' },
  ProfilePicture: { type: String, default: '' },
  Role: { type: String, enum: ['user', 'admin', 'delivery'], default: 'user' },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }]
});

// Virtual full name
userSchema.virtual('fullName').get(function () {
  return `${this.FirstName} ${this.LastName}`;
});

// Pre-save hook
userSchema.pre('save', async function(next) {
  this.UpdatedAt = new Date();

  if (!this.UserName || this.UserName.trim() === '') {
    const base = (this.FirstName + this.LastName).toLowerCase().replace(/\s+/g, '');
    this.UserName = base;
  }

  if (this.isModified('Password')) {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
  }

  next();
});

// FIX: prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
