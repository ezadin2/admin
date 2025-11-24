const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Address = require('../models/address');

const asyncHandler = require('express-async-handler');

// ✅ GET all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.find().sort({ CreatedAt: -1 });
  res.json({ success: true, message: 'Users retrieved successfully', data: users });
}));
router.get('/customerDetails', async (req, res) => {
  try {
    const userId = req.query.customerId;
    const user = await User.findById(userId).populate('orders').populate('addresses');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User retrieved successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});
// GET user addresses
router.get('/:id/addresses', asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId).populate('addresses');

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({
    success: true,
    message: 'Addresses retrieved successfully',
    data: user.addresses || []
  });
}));

// ✅ GET single user by ID (with orders + addresses)
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('orders')
    .populate('addresses');

  if (!user)
    return res.status(404).json({ success: false, message: 'User not found' });

  res.json({ success: true, message: 'User retrieved successfully', data: user });
}));

// ✅ CREATE new user
router.post('/', asyncHandler(async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ success: true, message: 'User created successfully', data: newUser });
}));

// ✅ UPDATE user
router.put('/:id', asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body, UpdatedAt: new Date() },
    { new: true }
  );

  if (!updatedUser)
    return res.status(404).json({ success: false, message: 'User not found' });

  res.json({ success: true, message: 'User updated successfully', data: updatedUser });
}));

// ✅ DELETE user
router.delete('/:id', asyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser)
    return res.status(404).json({ success: false, message: 'User not found' });

  res.json({ success: true, message: 'User deleted successfully', data: deletedUser });
}));




module.exports = router;
